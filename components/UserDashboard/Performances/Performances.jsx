import axios from "axios";
import React, { useEffect, useState } from "react";
import LineProgressWidget from "../Cards/LineProgressWidget";
import Listening from "./Listening";
import Mocktest from "./Mocktest";
import Reading from "./Reading";
import Speaking from "./Speaking";
import Writing from "./Writing";

const Performances = () => {
  const [allTimePerformances, setAllTimePerformances] = useState([]);
  const [data, setData] = useState();

  // convert data to display
  const convertData = (data) => {
    const newData = [];
    const colors = ["#F44141", "#FF8412", "#949494", "#F2B277", "#4399FF"];
    if (data) {
      for (const [key, item] of Object.entries(data)) {
        const title = `${key.charAt(0).toUpperCase()}${key
          .slice(1)
          .replace(/_/g, " ")}`;
        const value = `${item.practices}/${item.total}`;
        const percentage = `${item.percentage}%`;
        const color = colors[Math.floor(Math.random() * colors.length)];
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

  // get data from server
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/progress");
      setData(data);
      setAllTimePerformances(convertData(data?.all_time));
    };
    getData();
  }, []);

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
