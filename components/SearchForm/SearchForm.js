export default function SearchForm(props) {
  const searchApiRequest = async event => {
    event.preventDefault();

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(event.target.name.value)}`);
    const searchResults = await res.json();

    props.onSearch(searchResults);
  }

  if (props.searchResults === null) {
    return (
      <form onSubmit={searchApiRequest} className="w-full max-w-md mx-auto">
        <div className="mx-auto flex items-center justify-center">
          <label htmlFor="name" className="">TV Show Name</label>
          <input id="name" type="text" className="grow ml-2 rounded-md" required />
        </div>
        <button type="submit" className="block rounded-md mx-auto py-2 px-4 mt-4 uppercase font-bold bg-slate-700 hover:bg-slate-900 focus:bg-slate-900 active:bg-slate-700 transition-color duration-150 text-white">Search</button>
      </form>
    )
  }
  return null;
}
