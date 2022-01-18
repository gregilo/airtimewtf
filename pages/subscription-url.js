import { useEffect, useState } from 'react';
import Head from 'next/head';
import InteriorLayout from '../components/_layouts/InteriorLayout';
import ShowCardGrid from '../components/ShowCardGrid/ShowCardGrid';
import Loader from '../components/Loader/Loader';
import { Promise } from 'es6-promise';

export default function SubscriptionUrl(props) {
  const [shows, setShows] = useState([]);
  const [showsLoading, setShowsLoading] = useState(true);

  useEffect(() => {
    const showRequests = [];
    for (const show of props.trackedShows) {
      showRequests.push(
        fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(show)}`).then((res) => res.json())
      );
    }
    Promise.all(showRequests)
      .then(res => setShows(res.map(show => ({ show }))))
      .then(setShowsLoading(false));
  }, [props.trackedShows]);

  if (!props.trackedShows.length) {
    return (
      <div>
        <p className="text-center">You&rsquo;re currently not tracking any shows. Use the search above to start tracking shows.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center mb-10">
        <label htmlFor="subscriptionUrl" className="mr-4">Subscription URL:</label>
        <input type="text" id="subscriptionUrl" className="font-mono grow" readOnly={true} value={`https://airtime.wtf/api/schedule/${props.scheduleId}/subscription`} />
      </div>
      {showsLoading ?
        <div className="text-center"><Loader />Loading tracked shows...</div> :
        <ShowCardGrid shows={shows} trackedShows={props.trackedShows} addToTrackedShows={props.addToTrackedShows} removeTrackedShow={props.removeTrackedShow} />}
    </div>
  );
}

SubscriptionUrl.getLayout = function getLayout(page, trackedShows) {
  return (
    <InteriorLayout trackedShows={trackedShows} hideScheduleBar={true}>
      <Head>
        <title>airtime.wtf - Subscription URL</title>
      </Head>
      {page}
    </InteriorLayout>
  );
};
