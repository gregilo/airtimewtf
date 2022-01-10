import Image from "next/image";

export default function SearchResultsGrid({ results }) {
  console.log(results);
  const resultsListItems = results.map((result, resultNum) => (
    <li key={resultNum}>
      <Image src={result.show.image.medium} alt={`Cover image for ${result.show.name}`} width="210" height="295" />
      <h3>{result.show.name}</h3>
      <h4>{result.show.network.name}</h4>
      {result.show.genres.map((genre, genreNum) => <p key={genreNum}>{genre}</p>)}
    </li>
  ));

  return <ul>{resultsListItems}</ul>;

}
