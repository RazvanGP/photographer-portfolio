import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { Context } from "../context/context";
import { useContext } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import DiaphragmAnimation from "./diaphragmAnimation";

const Layout = ({ children }) => {
  const { shutterEffect } = useContext(Context);
  const { asPath } = useRouter();

  const variants = {
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
        // delay: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Arizonia&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        {shutterEffect && <DiaphragmAnimation />}

        <AnimatePresence initial={false}>
          <motion.div
            key={asPath}
            variants={variants}
            animate="in"
            initial="out"
            exit="out"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
