import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document Component
 * Used to augment the application's <html> and <body> tags
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload LCP image for immediate discovery */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fmyself.webp&w=640&q=75"
          imageSrcSet="/_next/image?url=%2Fmyself.webp&w=640&q=75 1x, /_next/image?url=%2Fmyself.webp&w=828&q=75 2x"
          fetchPriority="high"
        />
        
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
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags for performance */}
        <meta name="theme-color" content="#9da284" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
