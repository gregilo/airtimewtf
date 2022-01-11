import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/layout';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchResultsGrid from '../components/SearchResultsGrid/SearchResultsGrid';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <Layout>
      <Head>
        <title>airtime.wtf - When does it air?</title>
      </Head>
      <h1>airtime.wtf</h1>
      <p>airtime.wtf is a tool for creating a custom ics calendar to track when specific TV shows air.</p>
      <SearchForm searchResults={searchResults} onSearch={setSearchResults} />
      <SearchResultsGrid searchResults={searchResults} />
    </Layout>
  )
}
