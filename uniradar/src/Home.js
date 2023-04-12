import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/services";
import Trusted from "./components/trusted";

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
