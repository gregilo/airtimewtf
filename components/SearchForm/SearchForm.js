import React, { useState } from 'react';
import SearchResultsGrid from '../SearchResultsGrid/SearchResultsGrid';

export default function SearchForm() {
  const [searchResults, setSearchResults] = useState(null);

  const searchApiRequest = async event => {
    event.preventDefault();

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(event.target.name.value)}`);
    const searchResults = await res.json();

    setSearchResults(searchResults);
  }

  if (searchResults === null) {
    return (
      <form onSubmit={searchApiRequest}>
        <label htmlFor="name">TV Show Name</label>
        <input id="name" type="text" required />
        <button type="submit">Search</button>
      </form>
    )
  } else {
    return <SearchResultsGrid results={searchResults} />;
  }
}
