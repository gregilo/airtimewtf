import Link from 'next/link';
import { useRouter } from 'next/router';
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
              <h1 className="font-serif text-3xl font-bold">airtime.wtf</h1>
            </a>
          </Link>
        </div>
        <div className="w-1/2 text-right">
          <form onSubmit={submitSearch}>
            <label htmlFor="name" className="sr-only">Search by TV Show Name</label>
            <input type="text" name="keys" id="name" placeholder="TV Show Name" className="rounded-md" />
            <button className="ml-2 rounded-md mx-auto py-2 px-6 uppercase font-bold bg-slate-700 hover:bg-slate-900 focus:bg-slate-900 active:bg-slate-700 transition-color duration-150 text-white">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
