import axios from "axios";
import React, { useEffect, useState } from "react";
import LineProgressWidget from "../Cards/LineProgressWidget";
import Listening from "./Listening";
import Mocktest from "./Mocktest";
import Reading from "./Reading";
import Speaking from "./Speaking";
import Writing from "./Writing";

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
  const [allTimePerformances, setAllTimePerformances] = useState([]);
  console.log(allTimePerformances, "allTimePerformances");
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/progress");
      setData(data);
      setAllTimePerformances(convertData());
    };
    getData();
  }, []);
  const convertData = () => {
    const newData = [];
    for (const key in data?.all_time) {
      console.log(key, data?.all_time);
      if (data?.all_time.hasOwnProperty(key)) {
        const item = data?.all_time[key];
        const title = `${key.charAt(0).toUpperCase()}${key
          .slice(1)
          .replace(/_/g, " ")}`;
        const value = `${item.practices}/${item.total}`;
        const percentage = `${item.percentage}%`;
        const color = "#4399FF";
        newData.push({ title, value, percentage, color });
      }
    }
    newData.push({
      title: "Mock Test Questions",
      value: "0/0",
      percentage: "0%",
      color: "#F44141",
    });
    return newData;
  };
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
          {data?.speaking && <Speaking data={data?.speaking} />}
          <hr />
          {/* Reading */}
          {data?.reading && <Reading data={data?.reading} />}
          <hr />
          {/* Listening */}
          {data?.listening && <Listening data={data?.listening} />}
          <hr />
          {/* double */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            {/* Writing  */}
            {data?.writing && <Writing data={data?.writing} />}
            {/* Mocktest */}
            <Mocktest />
          </div>
        </div>
      </div>
    </>
  );
};

export default Performances;
