import { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [trackedShows, setTrackedShows] = useState(null);
  const addTrackedShow = (showId) => setTrackedShows([...trackedShows, showId]);
  const removeTrackedShow = (showId) => setTrackedShows(trackedShows.filter(function(show) { return show !== showId; }));

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (trackedShows === null) {
      if (localStorage.getItem('trackedShows')) {
        setTrackedShows(JSON.parse(localStorage.getItem('trackedShows')));
      } else {
        setTrackedShows([]);
      }
    }
    localStorage.setItem('trackedShows', JSON.stringify(trackedShows));
  }, [trackedShows]);

  return getLayout(<Component {...pageProps} trackedShows={trackedShows} addTrackedShow={addTrackedShow} removeTrackedShow={removeTrackedShow} />, trackedShows);
}

export default MyApp;
