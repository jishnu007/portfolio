import "../styles/globals.scss";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

/**
 * Main App Component
 * Wraps all pages with Layout component
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
