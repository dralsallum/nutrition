import React, { useEffect } from "react";
import { Between, Footer, Health, Monitor, NavGlass } from "../components";

const Care = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavGlass />
      <Health />
      <Monitor />
      <Between />
      <Footer />
    </>
  );
};

export default Care;
