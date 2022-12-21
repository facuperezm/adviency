import "../styles/globals.css";
import { Mountains_of_Christmas } from "@next/font/google";
import Head from "next/head";

const mountains = Mountains_of_Christmas({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mountains",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Christmas List</title>
      </Head>
      <main className={`${mountains.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
