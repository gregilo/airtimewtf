import ShowCard from '../ShowCard/ShowCard';

export default function ShowCardGrid(props) {
  if (!props.shows || props.shows === null) {
    return null;
  }

  const resultsListItems = props.shows.map((result, showNum) => {
    return <ShowCard key={showNum} result={result} trackedShows={props.trackedShows} addTrackedShow={props.addTrackedShow} removeTrackedShow={props.removeTrackedShow} />;
  });

  return <ul className="grid col-auto sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6 xl:gap-7">{resultsListItems}</ul>;
}
