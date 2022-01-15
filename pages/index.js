import Head from 'next/head';
import { useState } from 'react';
import HomeLayout from '../components/_layouts/HomeLayout';
import HomeSearchForm from '../components/HomeSearchForm/HomeSearchForm';
import { useRouter } from 'next/router';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const router = useRouter();

  return <HomeSearchForm searchResults={searchResults} onSearch={setSearchResults} router={router} />;
}

Home.getLayout = function getLayout(page, trackedShows) {
  return (
    <HomeLayout trackedShows={trackedShows}>
      <Head>
        <title>airtime.wtf</title>
      </Head>
      {page}
    </HomeLayout>
  );
};
