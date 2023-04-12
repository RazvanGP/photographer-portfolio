import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute top-0 z-10 w-full nav-container font-primary font-bold text-sm text-white uppercase ">
      <ul className="flex justify-evenly py-16 bg-gray-950 ">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:underline">
          <Link href="/yourEvent">Your event</Link>
        </li>
        <li className="hover:underline">
          <Link href="/yourEvent">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
