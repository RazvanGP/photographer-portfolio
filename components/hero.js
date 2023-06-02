import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative bg-hero bg-no-repeat bg-cover bg-right md:bg-center w-full h-screen font-hero md:text-[150px] lg:text-[200px] xl:text-[300px] text-6xl overflow-hidden">
      <motion.h1
        className="absolute top-1/4 md:top-[5%] right-0 opacity-30"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        Anamaria
      </motion.h1>
      <motion.h1
        className="absolute bottom-2/4 md:bottom-[35%] opacity-30"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        Photography
      </motion.h1>
    </div>
  );
};

export default Hero;
