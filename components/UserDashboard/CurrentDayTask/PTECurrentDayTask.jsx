import React from "react";
import TodayTaskCard from "../Cards/TodayTaskCard";

import { HiOutlineMicrophone } from "react-icons/hi2";
import {
  PiBookOpen,
  PiHeadphonesThin,
  PiPencilSimpleLineThin,
} from "react-icons/pi";

const taskCard = [
  {
    name: "speaking",
    bgcolor: "#FF8412",
    icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
  },
  {
    name: "Writing",
    bgcolor: "#F2B277",
    icon: <PiPencilSimpleLineThin className="w-[48px] h-[48px]" />,
  },
  {
    name: "reading",
    bgcolor: "#4399FF",
    icon: <PiBookOpen className="w-[48px] h-[48px]" />,
  },
  {
    name: "listening",
    bgcolor: "#949494",
    icon: <PiHeadphonesThin className="w-[48px] h-[48px]" />,
  },
];

export default function PTECurrentDayTask() {
  return (
    <div className="w-full flex flex-col text-[#616161] border border-[#F2B277] p-[15px] rounded-[10px] bg-[#FFF4EB]">
      <h3 className="font-medium text-[21px] text-center mb-2.5">
        Today's Task
      </h3>
      <div className="bg-white rounded-[10px] h-full p-[15px]">
        {/* Task lists */}
        <div className="flex flex-col gap-2 justify-center text-[16px] mt-2 mb-4">
          <div className="flex items-center gap-2 capitalize">
            <span className="h-3 w-3 rounded-full border " />
            <p>give summarize written text 5 times</p>
          </div>
          <div className="flex items-center gap-2 capitalize">
            <span className="h-3 w-3 rounded-full border " />
            <p>Give Write Essay 2 Times</p>
          </div>
          <div className="flex items-center gap-2 capitalize">
            <span className="h-3 w-3 rounded-full border bg-[#CF8800]" />
            <p className="line-through text-[#949494]">Score Target 75 Today</p>
          </div>
        </div>
        {/* Cards */}
        <div className="flex gap-2.5 text-white justify-between">
          {taskCard.map((card) => (
            <TodayTaskCard key={card.name} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
