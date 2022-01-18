import { useEffect, useState } from 'react';
import Head from 'next/head';
import InteriorLayout from '../components/_layouts/InteriorLayout';
import ShowCardGrid from '../components/ShowCardGrid/ShowCardGrid';
import Loader from '../components/Loader/Loader';
import ClipboardIcon from '../components/ClipboardIcon/ClipboardIcon';
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

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text);
  }

  if (!props.trackedShows.length) {
    return (
      <div>
        <p className="text-center">You&rsquo;re currently not tracking any shows. Use the search above to start tracking shows.</p>
      </div>
    );
  }
  const subscriptionUrl = `https://airtime.wtf/api/schedule/${props.scheduleId}/subscription`;

  return (
    <div>
      <div className="flex flex-row items-center mb-10 relative">
        <label htmlFor="subscriptionUrl" className="mr-4">Subscription URL:</label>
        <input type="text" id="subscriptionUrl" className="font-mono grow px-4 py-3 border-slate-500" readOnly={true} value={subscriptionUrl} onFocus={(e) => e.target.select()} />
        <button title="Copy calendar subscription URL to clipboard" onClick={() => copyTextToClipboard(subscriptionUrl)} className="absolute top-0 right-0 p-3 hover:bg-slate-800 focus:bg-slate-800 active:bg-slate-800 hover:text-white focus:text-white active:text-white transition-colors">
          <span className="sr-only">Copy calendar subscription URL to clipboard</span>
          <ClipboardIcon />
        </button>
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
