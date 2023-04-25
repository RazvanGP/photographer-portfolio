const Hero = () => {
  return (
    <div className="relative bg-hero bg-no-repeat bg-cover bg-center w-full h-screen font-hero md:text-[20rem] text-8xl overflow-hidden ">
      <h1
        className="absolute top-1/4 md:top-[10%] right-0 opacity-30"
        initial={{ x: -100 }}
        animate={{ x: 100 }}
      >
        Anamaria
      </h1>
      <h1 className="absolute bottom-2/4 md:bottom-[30%] opacity-30">
        Photography
      </h1>
    </div>
  );
};

export default Hero;
