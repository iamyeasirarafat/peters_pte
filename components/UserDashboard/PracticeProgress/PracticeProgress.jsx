import BarChartPTE from "./BarChartPTE";
import TodayTaskCard from "../Cards/TodayTaskCard";
import { HiOutlineMicrophone } from "react-icons/hi2";
import {
  PiBookOpen,
  PiHeadphonesThin,
  PiPencilSimpleLineThin,
} from "react-icons/pi";
import { Tab } from "../../../pages/app";
import ListeningProgressTracker from "./SingleProgressTracker";
import Speaking from "../Performances/Speaking";
import { useState } from "react";

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

const practiceTimeData = {
  speakingPerformances: [
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
  ],
  writingPerformances: [
    {
      title: "Highlight Incorrect Words",
      time: "06:12",
    },
    {
      title: "Select Missing Word",
      time: "06:12",
    },
  ],
  readingPerformances: [
    {
      title: "Write from Dictation",
      time: "06:12",
    },
  ],
  listeningPerformances: [
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
  ],
  mocktest: [
    {
      title: "Full Mocktest",
      time: "06:12",
    },
    {
      title: "Speaking Mocktest",
      time: "06:12",
    },
    {
      title: "Reading Mocktest",
      time: "06:12",
    },
    {
      title: "Writing Mocktest",
      time: "06:12",
    },
    {
      title: "Listening Mocktest",
      time: "06:12",
    },
  ],
};

export default function PracticeProgress() {
  const [performanceTab, setPerformanceTab] = useState("all");
  return (
    <div className="flex flex-col">
      <BarChartPTE />
      <div className="flex flex-col gap-1 bg-secondary p-[15px] ">
        <div className="flex items-center justify-between">
          <div className="w-[90%]" />
          <div className="w-full flex items-center justify-between">
            <p className="text-center my-3 text-[21px] text-[#949494] font-medium">
              Time Spent
            </p>
            <Tab setPerformanceTab={setPerformanceTab} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-around items-center bg-white text-white p-3 rounded-lg">
          {taskCard.map((task) => (
            <TodayTaskCard key={task.name} data={task} />
          ))}
        </div>
      </div>
      <div className="bg-secondary space-y-2 p-[15px] rounded-b-lg">
        {/* Performances reading */}
        {(performanceTab === "all" || performanceTab === "reading") && (
          <ListeningProgressTracker
            type="Reading"
            data={practiceTimeData?.speakingPerformances}
          />
        )}

        {/* Performances writing */}
        {(performanceTab === "writing" || performanceTab === "all") && (
          <ListeningProgressTracker
            type="Writing"
            data={practiceTimeData?.writingPerformances}
          />
        )}

        {/* Performances speaking */}
        {(performanceTab === "speaking" || performanceTab === "all") && (
          <ListeningProgressTracker
            type="Speaking"
            data={practiceTimeData?.speakingPerformances}
          />
        )}

        {/* Performances listening */}
        {(performanceTab === "listening" || performanceTab === "all") && (
          <ListeningProgressTracker
            type="Listening"
            data={practiceTimeData?.listeningPerformances}
          />
        )}

        {/* Performances mocktest */}
        {(performanceTab === "mocktest" || performanceTab === "all") && (
          <ListeningProgressTracker
            type="Mocktest"
            data={practiceTimeData?.mocktest}
          />
        )}
      </div>
    </div>
  );
}
