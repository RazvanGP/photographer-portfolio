import Link from "next/link";
import { Context } from "../context/context";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

const MobileNavigation = () => {
  const { setShutterEffect, menuOpen, setMenuOpen } = useContext(Context);

  const handleOnClick = () => {
    setShutterEffect(true);
    setTimeout(() => {
      setShutterEffect(false);
    }, 1000);
    setMenuOpen(false);
  };

  return (
    <div className="absolute h-screen w-screen bg-opacity-90 bg-stone-900  p-5 ">
      <ul className="flex flex-col gap-10 items-center justify-center h-full">
        <li className="absolute top-0 text-slate-200 border-2 p-2 rounded-lg">
          <AiOutlineClose onClick={() => setMenuOpen(false)} />
        </li>
        <li>
          <Link href="/" onClick={handleOnClick}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={handleOnClick}>
            About
          </Link>
        </li>
        <li>
          <Link href="/events/yourEvent" onClick={handleOnClick}>
            Your event
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={handleOnClick}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigation;
