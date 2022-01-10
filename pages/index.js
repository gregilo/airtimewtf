import Head from 'next/head';
import Layout from '../components/layout';
import SearchForm from '../components/SearchForm/SearchForm';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>airtime.wtf - When does it air?</title>
      </Head>
      <h1>airtime.wtf</h1>
      <p>airtime.wtf is a tool for creating a custom ics calendar to track when specific TV shows air.</p>
      <SearchForm />
    </Layout>
  )
}
