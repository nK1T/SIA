import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import MidSection from "../components/MidSection/MidSection";
import FaqSection from "../components/FaqSection/FaqSection";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SIA";
  }, []);

  return (
    <div>
      <HeroSection />
      <MidSection />
      <FaqSection />
      <CountdownTimer targetDate="2024-06-12T00:00:00"/>
    </div>
  );
};

export default Home;
