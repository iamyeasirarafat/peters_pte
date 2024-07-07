import React from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";
const MocktestPerformances = [
  {
    title: "Full Mock test",
    value: "5/112",
    percentage: "30",
    strokeColor: "#F44141",
    trailColor: "#949494",
  },
  {
    title: "Sectional Mock test",
    value: "5/112",
    percentage: "30",
    strokeColor: "#F44141",
    trailColor: "#949494",
  },
];
const Mocktest = () => {
  return (
    <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
      <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
        Mocktest
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {MocktestPerformances?.map((Mocktest, index) => (
          <CircularProgressWidget key={index} data={Mocktest} />
        ))}
      </div>
    </div>
  );
};

export default Mocktest;
