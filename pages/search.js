import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ShowCardGrid from '../components/ShowCardGrid/ShowCardGrid';
import InteriorLayout from '../components/_layouts/InteriorLayout';
import Loader from '../components/Loader/Loader';

export default function Search(props) {
  const [isLoading, setLoading] = useState(true);
  const [shows, setShows] = useState(null);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    setLoading(true);
    if (!router.isReady) {
      return;
    }

    if (query && !query.keys) {
      setLoading(false);
    } else {
      fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query.keys)}`)
        .then(res => res.json())
        .then(data => setShows(data))
        .finally(() => setLoading(false));
    }
  }, [router, query]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />Loading...
      </div>
    );
  }

  if (query.keys && (shows !== null && shows.length)) {
    return <ShowCardGrid shows={shows} trackedShows={props.trackedShows} addTrackedShow={props.addTrackedShow} removeTrackedShow={props.removeTrackedShow} />;
  }

  return <p>No results found. Please try again.</p>;
}

Search.getLayout = function getLayout(page, trackedShows) {
  return (
    <InteriorLayout trackedShows={trackedShows}>
      <Head>
        <title>airtime.wtf - Search Results</title>
      </Head>
      {page}
    </InteriorLayout>
  );
};
