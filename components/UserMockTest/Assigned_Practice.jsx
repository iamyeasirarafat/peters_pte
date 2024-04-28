import React from "react";
import ScoredText from "../Components/Scored_test.jsx";

export default function Assigned_Practice() {
  const data = [
    {
      name: "A",
      total_ques: 63,
      time: 124,
    },
    {
      name: "B",
      total_ques: 62,
      time: 124,
    },
    {
      name: "C",
      total_ques: 62,
      time: 124,
    },
    {
      name: "D",
      total_ques: 63,
      time: 124,
    },
  ];
  return (
    <div className="mx-5 flex flex-col justify-start">
      <p className="text-3xl my-5 text-zinc-600 font-light mx-auto">
        Assigned Practice
      </p>
      {data.map((single_data, i) => {
        return <ScoredText key={i} single_data={single_data} />;
      })}
    </div>
  );
}
