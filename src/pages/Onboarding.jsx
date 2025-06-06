import React, { useEffect } from "react";
import { Road } from "../components";

const Onboarding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Road />
    </>
  );
};

export default Onboarding;
