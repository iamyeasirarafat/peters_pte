import React from "react";

const LineProgressBar = ({ bgColor, lineColor, parentage }) => {
  console.log(`w-[${parentage}%]`);
  return (
    <div className={`h-[45px] w-full rounded-3xl bg-${bgColor} relative`}>
      <div
        className={`w-[${parentage}%] h-full bg-${lineColor} rounded-3xl absolute top-0 left-0`}
      ></div>
    </div>
  );
};

export default LineProgressBar;
