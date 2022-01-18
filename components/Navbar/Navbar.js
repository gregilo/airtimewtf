import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchIcon from '../SearchIcon/SearchIcon';
import SmallTVLogo from '../SmallTVLogo/SmallTVLogo';

export default function Navbar() {
  const router = useRouter();
  const submitSearch = event => {
    event.preventDefault();
    const keyword = event.target.name.value;
    router.push(`/search?keys=${encodeURIComponent(keyword)}`);
  };

  return (
    <nav className="py-2 mb-8 shadow-md">
      <div className="container flex flex-row items-center">
        <div className="w-1/2">
          <Link href="/">
            <a className="flex flex-row justify-start items-center">
              <SmallTVLogo />
              <h1 className="font-serif text-2xl md:text-3xl font-bold">airtime.wtf</h1>
            </a>
          </Link>
        </div>
        <div className="w-1/2 text-right">
          <form onSubmit={submitSearch} className="relative">
            <label htmlFor="name" className="sr-only">Search by TV Show Name</label>
            <input type="text" name="keys" id="name" placeholder="TV Show Name" className="pr-16 border-slate-500 rounded-md w-full max-w-md" required />
            <button className="absolute top-0 right-0 rounded-r-md border border-l-0 border-slate-500 py-2 px-4 uppercase font-bold bg-white text-slate-700 hover:text-white focus:text-white active:text-white hover:bg-slate-900 focus:bg-slate-900 active:bg-slate-700 transition-color duration-150 text-white">
              <span className="sr-only">Search</span>
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
