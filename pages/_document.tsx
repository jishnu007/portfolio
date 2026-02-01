import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document Component
 * Used to augment the application's <html> and <body> tags
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical fonts for faster rendering */}
        <link
          rel="preload"
          href="/fonts/montserrat-v31-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-v31-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Antro_Vectra.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
