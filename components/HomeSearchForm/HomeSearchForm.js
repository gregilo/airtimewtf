import LargeTVLogo from '../LargeTVLogo/LargeTVLogo';
import SearchIcon from '../SearchIcon/SearchIcon';

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
          <div className="mx-auto w-full relative">
            <label htmlFor="name" className="sr-only">TV Show Name</label>
            <input id="name" type="text" className="grow border-slate-500 pr-16 rounded-md w-full" placeholder="TV Show Name" required />
            <button type="submit" className="absolute rounded-r-md py-2 px-4 top-0 right-0 border border-slate-500 uppercase font-bold bg-white text-slate-800 hover:text-white focus:text-white active:text-white hover:bg-slate-900 focus:bg-slate-900 active:bg-slate-700 transition-color duration-150 text-white">
              <span className="sr-only">Search</span>
              <SearchIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
