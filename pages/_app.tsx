import "../styles/globals.scss";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect } from "react";

/**
 * Main App Component
 * Wraps all pages with Layout component
 */
function MyApp({ Component, pageProps }: AppProps) {
  // Fix viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set on mount
    setVH();

    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
