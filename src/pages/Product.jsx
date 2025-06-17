import React, { useEffect } from "react";
import { Body } from "../components";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Body />
    </>
  );
};

export default Product;
