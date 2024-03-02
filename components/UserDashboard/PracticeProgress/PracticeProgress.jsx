import BarChartPTE from "./BarChartPTE";
import TodayTaskCard from "../Cards/TodayTaskCard";
import { HiOutlineMicrophone } from "react-icons/hi2";
import SingleProgressTracker from "./SingleProgressTracker";
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
    time: "25:23",
  },
  {
    name: "Writing",
    bgcolor: "#F2B277",
    icon: <PiPencilSimpleLineThin className="w-[48px] h-[48px]" />,
    time: "01:25",
  },
  {
    name: "reading",
    bgcolor: "#4399FF",
    icon: <PiBookOpen className="w-[48px] h-[48px]" />,
    time: "00:00",
  },
  {
    name: "listening",
    bgcolor: "#949494",
    icon: <PiHeadphonesThin className="w-[48px] h-[48px]" />,
    time: "50:00",
  },
];

export default function PracticeProgress() {
  return (
    <div className="flex flex-col">
      <BarChartPTE />
      <div className="flex flex-col gap-1 bg-[#FFF4EB] p-[15px] rounded-lg border border-[#FF8412]">
        <p className="text-center my-3 text-[21px] text-[#949494] font-medium">
          Time Spent
        </p>
        <div className="flex gap-4 justify-around items-center bg-white text-white p-3 rounded-lg">
          {taskCard.map((task) => (
            <TodayTaskCard key={task.name} data={task} />
          ))}
        </div>
      </div>
      <div className="flex justify-center border border-[#FF8412] rounded-lg bg-[#FFF4EB] p-[15px]">
        <SingleProgressTracker />
      </div>
    </div>
  );
}
