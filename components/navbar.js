import Link from "next/link";
import { Context } from "../context/context";
import { useContext } from "react";

import { motion } from "framer-motion";

const Navbar = () => {
  const { setShutterEffect } = useContext(Context);

  const handleOnClick = () => {
    setShutterEffect(true);
    setTimeout(() => {
      setShutterEffect(false);
    }, 1000);
  };

  return (
    <div className="absolute top-0 z-10 w-full nav-container font-primary font-bold text-sm text-white uppercase ">
      <ul className="flex justify-evenly py-16 bg-gray-950 ">
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/" onClick={handleOnClick}>
            Home
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/about" onClick={handleOnClick}>
            About
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/yourEvent" onClick={handleOnClick}>
            Your event
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/yourEvent" onClick={handleOnClick}>
            Contact
          </Link>
        </motion.li>
      </ul>
    </div>
  );
};

export default Navbar;
