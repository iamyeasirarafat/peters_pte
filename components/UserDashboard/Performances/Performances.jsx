import React from "react";
import LineProgressWidget from "../Cards/LineProgressWidget";
import Speaking from "./Speaking";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Mocktest from "./Mocktest";

const allTimePerformances = [
  {
    title: "Mock Test Questions",
    value: "52/475",
    percentage: "60%",
    color: "#F44141",
  },
  {
    title: "Speaking Questions",
    value: "1998/3775",
    percentage: "60%",
    color: "#FF8412",
  },
  {
    title: "Listening Questions",
    value: "2258/4758",
    percentage: "60%",
    color: "#949494",
  },
  {
    title: "Writing Questions",
    value: "858/3756",
    percentage: "60%",
    color: "#F2B277",
  },
  {
    title: "Reading Questions",
    value: "2548/1325",
    percentage: "60%",
    color: "#4399FF",
  },
];

const Performances = () => {
  return (
    <>
      <div>
        <div className="w-full flex flex-col text-[#616161] border border-[#F2B277] p-[15px] rounded-[10px] bg-[#FFF4EB]">
          <h3 className="font-medium text-[21px] text-center mb-2.5">
            All Time Progress
          </h3>
          <div className="bg-white rounded-[10px] h-full p-[15px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {/* cards  */}
            {allTimePerformances.map((performance, index) => (
              <LineProgressWidget key={index} data={performance} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 text-[#616161] border border-[#F2B277] p-[15px] rounded-[10px] bg-[#FFF4EB]">
          {/* Speaking */}
          <Speaking />
          <hr />
          {/* Reading */}
          <Reading />
          <hr />
          {/* Listening */}
          <Listening />
          <hr />
          {/* double */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            {/* Writing  */}
            <Writing />
            {/* Mocktest */}
            <Mocktest />
          </div>
        </div>
      </div>
    </>
  );
};

export default Performances;
