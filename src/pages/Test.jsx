import React, { useEffect } from "react";
import { Main, NavTech, Quiz } from "../components";

const Test = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Quiz />
    </>
  );
};

export default Test;
