import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute top-0 w-full nav-container font-primary font-bold text-2xl text-white">
      <ul className="flex justify-evenly py-16 bg-gray-950 ">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/yourEvent">Your event</Link>
        </li>
        <li>
          <Link href="/yourEvent">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
