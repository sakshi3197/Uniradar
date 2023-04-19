import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/services";
const Home = () => {
  const data = {
    name: "UNIRADAR",
  };

  return (
  <><HeroSection myData={data} />
  <Services />
  </>
  );
};

export default Home;
