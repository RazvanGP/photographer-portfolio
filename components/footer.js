import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bottom-0 w-full flex flex-col justify-center items-center text-3xl bg-gray-950 text-slate-400 py-4 z-10">
      <div className="socials flex justify-around py-5 w-20">
        <FaFacebook className="hover:text-stone-700 hover:cursor-pointer transition ease-in-out duration-300" />
        <FaInstagram className="hover:text-stone-700 hover:cursor-pointer transition ease-in-out duration-300" />
      </div>
      <p className="text-sm">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/RazvanGP"
          className="hover:text-stone-700 hover:cursor-pointer transition ease-in-out duration-300"
        >
          RazvanGP
        </a>
      </p>
    </div>
  );
};

export default Footer;
