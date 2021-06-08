import Head from "next/head";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import Results from "../components/Results/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <meta name="description" content="Top Trending Movies " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
      <main>
        <Results results={results} />
        <div className="container flex justify-center mt-5 mb-5 mx-auto">
          <p className="text-gray-300">&copy;2021 Made by Shariar</p>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  )
    .then((response) => response.json())
    .catch((err) => console.log(err.message));

  return {
    props: {
      results: request.results,
    },
  };
}
