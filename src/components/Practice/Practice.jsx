import axios from "axios";
import { useState } from "react";

const Practice = () => {
  const nums = [1, 2, 3];

  for (let i = 0; i < nums.length; i++) {
    nums[i] += i;
  }
  return (
    <div>
      {nums.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

export default Practice;
