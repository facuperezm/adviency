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
        <title>Adviency 2022 - Facundo Perez Montalvo</title>
        <meta
          name="description"
          content="Adviency es un reto diario creado por Goncy Pozzo. Practicamos haciendo la misma aplicación 24 veces!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${mountains.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
