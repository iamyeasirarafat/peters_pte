import React, { useEffect, useState } from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";
import axios from "axios";

// const mocktestPerformances = [
//   {
//     title: "Full Mock test",
//     value: "5/112",
//     percentage: "30",
//     strokeColor: "#F44141",
//     trailColor: "#949494",
//   },
//   {
//     title: "Sectional Mock test",
//     value: "5/112",
//     percentage: "30",
//     strokeColor: "#F44141",
//     trailColor: "#949494",
//   },
// ];

const Mocktest = () => {
  const [mocktestPerformances, setMocktestPerformances] = useState([]);

  useEffect(() => {
    axios("/mocktest_performance").then(({ data }) => {
      const structuredData = [];
      Object.keys(data).forEach((item) => {
        const dd = {
          title: item.replace("_", " "),
          value: `${data[item]?.total_practiced}/${data[item]?.total_mocktest}`,
          percentage: data[item]?.percentage,
          strokeColor: "#F44141",
          trailColor: "#949494",
        };
        structuredData.push(dd);
      });
      setMocktestPerformances(structuredData);
    });
  }, []);

  return (
    <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
      <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
        Mocktest
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {mocktestPerformances?.map((Mocktest, index) => (
          <CircularProgressWidget key={index} data={Mocktest} />
        ))}
      </div>
    </div>
  );
};

export default Mocktest;
