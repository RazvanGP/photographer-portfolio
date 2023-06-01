import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative bg-hero bg-no-repeat bg-cover bg-right md:bg-center w-full h-screen font-hero md:text-[20rem] text-8xl overflow-hidden">
      <motion.h1
        className="absolute top-1/4 md:top-[10%] right-0 opacity-30"
        initial={false}
        animate={{ x: 100 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        Anamaria
      </motion.h1>
      <h1 className="absolute bottom-2/4 md:bottom-[30%] opacity-30">
        Photography
      </h1>
    </div>
  );
};

export default Hero;
