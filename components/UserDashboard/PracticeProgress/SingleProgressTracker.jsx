import React from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";

const ListeningPerformances = [
  {
    title: "Highlight Correct Summary",
    time: "06:12",
  },
  {
    title: "Multiple Choice, Multiple Answers",
    time: "06:12",
  },
  {
    title: "Summarize Spoken Text",
    time: "06:12",
  },
  {
    title: "Multiple Choice,  Answers",
    time: "06:12",
  },
  {
    title: "Fill in the Blanks",
    time: "06:12",
  },
  {
    title: "Highlight Incorrect Words",
    time: "06:12",
  },
  {
    title: "Select Missing Word",
    time: "06:12",
  },
  {
    title: "Write from Dictation",
    time: "06:12",
  },
];

export default function SingleProgressTracker() {
  return (
    <div className="bg-white rounded-[10px] h-full">
      {/* cards  */}
      <h3 className="font-medium text-[21px] text-[#949494] text-center my-2.5">
        Listening
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-2.5 px-3">
        {/* card 1  */}
        {ListeningPerformances?.map((listening, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 px-3 w-auto min-h-[74px] gap-2 capitalize border border-[#F2B277] rounded-[10px]`}
          >
            <p
              className={`text-[#949494] leading-[16px] text-[15px] font-normal`}
            >
              {listening.title}
            </p>
            <p className="text-[24px] font-semibold text-[#949494]">
              {listening.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
