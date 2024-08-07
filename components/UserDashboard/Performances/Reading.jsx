import React, { useEffect, useState } from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";

function Reading({ data }) {
  const [readingPerformances, setReadingPerformances] = useState([]);
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
        const strokeColor = "#3EC70B";
        const trailColor = "#949494";
        newData.push({ title, value, percentage, strokeColor, trailColor });
      }
    }
    return newData;
  };
  useEffect(() => {
    if (data) {
      const newData = convertData();
      setReadingPerformances(newData);
    }
  }, [data]);
  return (
    <div className="bg-white rounded-[10px] h-full p-[15px] ">
      {/* cards  */}
      <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
        Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {/* card 1  */}
        {readingPerformances?.map((reading, index) => (
          <CircularProgressWidget key={index} data={reading} />
        ))}
      </div>
    </div>
  );
}

export default Reading;
