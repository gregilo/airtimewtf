import LargeTVLogo from '../LargeTVLogo/LargeTVLogo';

export default function HomeSearchForm(props) {
  const submitSearch = event => {
    event.preventDefault();
    const keyword = event.target.name.value;
    props.router.push(`/search?keys=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="h-full flex flex-col justify-center container mx-auto">
      <div className="flex flex-col">
        <LargeTVLogo />
        <h1 className="text-center text-4xl font-bold font-serif mb-2">airtime.wtf</h1>
        <h2 className="text-center text-xl mb-8">airtime.wtf is a tool for creating a custom ics calendar to track when specific TV shows air.</h2>
        <form onSubmit={submitSearch} className="w-full max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center">
            <label htmlFor="name" className="">TV Show Name</label>
            <input id="name" type="text" className="grow ml-2 rounded-md" required />
          </div>
          <button type="submit" className="block rounded-md mx-auto py-2 px-6 mt-4 uppercase font-bold bg-slate-700 hover:bg-slate-900 focus:bg-slate-900 active:bg-slate-700 transition-color duration-150 text-white">Search</button>
        </form>
      </div>
    </div>
  );
}
