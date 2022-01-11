import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/layout';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchResultsGrid from '../components/SearchResultsGrid/SearchResultsGrid';
import LargeTVLogo from '../components/LargeTVLogo/LargeTVLogo';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [trackedShows, setTrackedShows] = useState([]);

  const addToTrackedShows = (showId) => {
    setTrackedShows([...trackedShows, showId]);
  }

  return (
    <Layout>
      <Head>
        <title>airtime.wtf - When does it air?</title>
      </Head>
      {searchResults === null && <div className="flex flex-col">
        <LargeTVLogo />
        <h1 className="text-center text-4xl font-bold font-serif mb-2">airtime.wtf</h1>
        <h2 className="text-center text-xl mb-8">airtime.wtf is a tool for creating a custom ics calendar to track when specific TV shows air.</h2>
        <SearchForm searchResults={searchResults} onSearch={setSearchResults} />
      </div>}
      <SearchResultsGrid searchResults={searchResults} trackedShows={trackedShows} addToTrackedShows={addToTrackedShows} />
    </Layout>
  )
}
