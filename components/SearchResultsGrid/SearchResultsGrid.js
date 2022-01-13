import ShowCard from '../ShowCard/ShowCard';

export default function SearchResultsGrid(props) {
  if (props.searchResults === null) {
    return null;
  }

  const resultsListItems = props.searchResults.map((result, showNum) => {
    let isTracked = false;
    if (props.trackedShows.indexOf(result.show.id) > -1) {
      isTracked = true;
    }

    return <ShowCard key={showNum} isTracked={isTracked} result={result} />;
  });

  return <ul className="grid col-auto sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6 xl:gap-7">{resultsListItems}</ul>;
}
