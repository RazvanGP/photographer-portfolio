import styles from "../styles/about.module.css";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Bad_Script } from "next/font/google";
const badScript = Bad_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const About = () => {
  return (
    <div className="w-full bg-zinc-800 flex flex-col-reverse lg:flex-row items-center justify-evenly py-10">
      <div
        className={`p-5 md:p-10 lg:w-1/2 text-stone-300 flex flex-col gap-5 md:text-2xl ${badScript.className}`}
      >
        <FaQuoteLeft size={50} />
        <p>
          Buna! Sunt Anamaria, sunt pasionata de arta fotografiei si ma bucur sa
          te intampin pe site-ul meu. Pentru mine, fotografia este mai mult
          decat o simpla apasare de butoane, este o forma de expresie, o
          modalitate de a captura emotii si de a impartasi povesti prin
          intermediul imaginilor.
          <br />
          <br />
          Am descoperit pasiunea mea pentru fotografie in urma cu cativa ani si
          de atunci, aceasta a devenit un mod de viata pentru mine. Imi place sa
          explorez diferite teme si subiecte, de la peisaje impresionante pana
          la portrete pline de viata. Fiecare moment capturat reprezinta o noua
          oportunitate de a crea ceva unic si de a aduce in prim-plan frumusetea
          din jurul nostru.
          <br />
          <br />
          Pe acest site, iti ofer o privire asupra lucrarilor mele si iti invit
          sufletul sa calatoreasca prin imaginile capturate. Imi doresc sa te
          inspir si sa te conectez cu emotiile si frumusetea pe care le pot
          surprinde prin intermediul fotografiilor mele. Fie ca este vorba de un
          eveniment special, o sedinta foto sau o colaborare creativa, sunt aici
          sa pun in valoare povestea ta si sa o transform in imagini de neuitat.
          <br />
          <br />
          Cu drag,
          <br />
          Anamaria
        </p>
        <FaQuoteRight className="self-end" size={50} />
      </div>
      <Image
        src="/about-photo.jpeg"
        width={500}
        height={500}
        alt="picture of the author"
        className="w-[150px] rounded-tl-full rounded-br-full md:w-[450px]"
      />
    </div>
  );
};

export default About;
