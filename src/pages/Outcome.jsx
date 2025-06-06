import React, { useEffect, useState } from "react";
import { Checkout, Footer, NavTech } from "../components";

const Outcome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Checkout />
      <Footer />
    </>
  );
};

export default Outcome;
