import React, { useEffect, useState } from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";

const Writing = ({ data }) => {
  const [writingPerformances, setWritingPerformances] = useState([]);
  const convertData = () => {
    const newData = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item = data[key];
        const title = `${key.charAt(0).toUpperCase()}${key
          .slice(1)
          .replace(/_/g, " ")}`;
        const value = `${item.practices}/${item.total}`;
        const percentage = `${item.percentage}`;
        const strokeColor = "#2D46B9";
        const trailColor = "#949494";
        newData.push({ title, value, percentage, strokeColor, trailColor });
      }
    }
    return newData;
  };
  useEffect(() => {
    if (data) {
      const newData = convertData();
      setWritingPerformances(newData);
    }
  }, [data]);
  return (
    <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
      <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
        Writing
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {writingPerformances?.map((Writing, index) => (
          <CircularProgressWidget key={index} data={Writing} />
        ))}
      </div>
    </div>
  );
};

export default Writing;
