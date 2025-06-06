import React, { useEffect } from "react";
import { Very, Footer, NavTech, Phone, Article } from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Very />
      <Article />
      <Phone />
      <Footer />
    </>
  );
};

export default Home;
