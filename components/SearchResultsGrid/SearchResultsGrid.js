import Image from "next/image";
import { useEffect } from "react/cjs/react.development";
import TrackButton from "../TrackButton/TrackButton";

export default function SearchResultsGrid(props) {
  if (props.searchResults === null) {
    return null;
  }

  const resultsListItems = props.searchResults.map((result, showNum) => {
    let isTracked = false;
    if (props.trackedShows.indexOf(result.show.id) > -1) {
      isTracked = true;
    }

    return (<li key={showNum}>
      <Image src={result.show.image.medium} alt={`Cover image for ${result.show.name}`} width="210" height="295" />
      <h3>{result.show.name}</h3>
      {result.show?.network?.name && <h4>{result.show.network.name}</h4>}
      {result.show.genres.map((genre, genreNum) => <p key={genreNum}>{genre}</p>)}
      <TrackButton isTracked={isTracked} addToTrackedShows={props.addToTrackedShows} showId={result.show.id} />
    </li>);
  });

  return <ul>{resultsListItems}</ul>;
}
