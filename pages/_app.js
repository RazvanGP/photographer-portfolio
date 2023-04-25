import "../styles/globals.css";
import Layout from "../components/layout";
import Provider from "../context/context";
import { useEffect } from "react";
import userbase from "userbase-js";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID });
  }, []);

  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
