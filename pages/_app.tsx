import "../styles/globals.scss";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      // startEvent: "",
      // once: false,
    });
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return <Layout>{isClient ? <Component {...pageProps} /> : ""}</Layout>;
}

export default MyApp;
