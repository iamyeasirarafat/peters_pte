import React, { useEffect, useState } from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";
const ListeningPerformances = [
  {
    title: "Highlight Correct Summary",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Multiple Choice, Multiple Answers",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Summarize Spoken Text",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Multiple Choice,  Answers",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Fill in the Blanks",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Highlight Incorrect Words",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Select Missing Word",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
  {
    title: "Write from Dictation",
    value: "5/112",
    percentage: "30",
    strokeColor: "#949494",
    trailColor: "#F4D1B1",
  },
];
function Listening({ data }) {
  const [listeningPerformances, setListeningPerformances] = useState();
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
        const strokeColor = "#00B4D8";
        const trailColor = "#949494";
        newData.push({ title, value, percentage, strokeColor, trailColor });
      }
    }
    return newData;
  };
  useEffect(() => {
    if (data) {
      const newData = convertData();
      setListeningPerformances(newData);
    }
  }, [data]);
  return (
    <div className="bg-white rounded-[10px] h-full p-[15px] ">
      {/* cards  */}
      <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
        Listening
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center gap-2">
        {/* card 1  */}
        {listeningPerformances?.map((Listening, index) => (
          <CircularProgressWidget key={index} data={Listening} />
        ))}
      </div>
    </div>
  );
}

export default Listening;
