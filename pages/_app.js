import { useEffect, useRef, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [trackedShows, setTrackedShows] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const addTrackedShow = (showId) => setTrackedShows([...trackedShows, showId]);
  const removeTrackedShow = (showId) => setTrackedShows(trackedShows.filter(function(show) { return show !== showId; }));
  const trackedShowsInit = useRef(false);

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const storedScheduleId = localStorage.getItem('scheduleId');
    if (storedScheduleId) {
      setScheduleId(storedScheduleId);
      fetch(`/api/schedule/${storedScheduleId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            return setTrackedShows(res.data.trackedShows);
          }
          return setTrackedShows([]);
        });
    }
  }, []);

  useEffect(() => {
    // Wait for trackedShows to have an actual value
    if (trackedShows === null) {
      return;
    }

    // Skip request for the initialization of trackedShows
    if (!trackedShowsInit.current) {
      trackedShowsInit.current = true;
      return;
    }

    // if scheduleId not in local storage, create new
    const storedScheduleId = localStorage.getItem('scheduleId');
    if (!storedScheduleId) {
      return fetch('/api/schedule', {
          method: 'POST',
          body: JSON.stringify(trackedShows),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            localStorage.setItem('scheduleId', res.data.scheduleId);
          }
        });
    }
    return fetch(`/api/schedule/${storedScheduleId}`, {
        method: 'PUT',
        body: JSON.stringify(trackedShows),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          // Show error notification
        }
      });
  }, [trackedShows]);

  return getLayout(<Component {...pageProps} trackedShows={trackedShows} addTrackedShow={addTrackedShow} removeTrackedShow={removeTrackedShow} />, trackedShows);
}

export default MyApp;
