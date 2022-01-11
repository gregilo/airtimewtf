export default function SearchForm(props) {
  const searchApiRequest = async event => {
    event.preventDefault();

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(event.target.name.value)}`);
    const searchResults = await res.json();

    props.onSearch(searchResults);
  }

  if (props.searchResults === null) {
    return (
      <form onSubmit={searchApiRequest}>
        <label htmlFor="name">TV Show Name</label>
        <input id="name" type="text" required />
        <button type="submit">Search</button>
      </form>
    )
  }
  return null;
}
