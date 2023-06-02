import Link from "next/link";
import { Context } from "../context/context";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNavigation from "./mobileNavigation";

import { motion } from "framer-motion";

const Navbar = () => {
  const { setShutterEffect, menuOpen, setMenuOpen } = useContext(Context);

  const handleOnClick = () => {
    setShutterEffect(true);
    setTimeout(() => {
      setShutterEffect(false);
    }, 1000);
  };

  return (
    <div className="w-full nav-container font-primary font-bold text-xl text-slate-200 uppercase ">
      <ul className="flex justify-evenly py-16 bg-gray-950 ">
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:block hover:text-stone-700 tranistion duration-300"
        >
          <Link href="/" onClick={handleOnClick}>
            Home
          </Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:block hover:text-stone-700 tranistion duration-300"
        >
          <Link href="/about" onClick={handleOnClick}>
            About
          </Link>
        </motion.li>
        <li
          className="block sm:hidden border-2 p-2 rounded-lg"
          onClick={() => {
            setMenuOpen(!menuOpen);
            console.log(menuOpen);
          }}
        >
          <AiOutlineMenu />
        </li>
        {menuOpen ? <MobileNavigation /> : null}
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:block hover:text-stone-700 tranistion duration-300"
        >
          <Link href="/events/yourEvent" onClick={handleOnClick}>
            Your event
          </Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:block hover:text-stone-700 tranistion duration-300"
        >
          <Link href="/contact" onClick={handleOnClick}>
            Contact
          </Link>
        </motion.li>
      </ul>
    </div>
  );
};

export default Navbar;
