import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineMicrophone } from "react-icons/hi2";
import {
  PiBookOpen,
  PiHeadphonesThin,
  PiPencilSimpleLineThin,
} from "react-icons/pi";
import { Tab } from "../../../pages/app";
import TodayTaskCard from "../Cards/TodayTaskCard";
import BarChartPTE from "./BarChartPTE";
import ListeningProgressTracker from "./SingleProgressTracker";





export default function PracticeProgress() {
  const [performanceTab, setPerformanceTab] = useState("all");
  const [practiceTime, setPracticeTime] = useState({})
  console.log("practiceTime", practiceTime)
  // Over all time Data 
  const overall = [
    {
      name: "speaking",
      bgcolor: "#FF8412",
      icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
      time: practiceTime?.overall?.speaking?.toString()?.includes('.') ? practiceTime?.overall?.speaking?.toString()?.replace('.', ':') : `${practiceTime?.overall?.speaking}:00`,
    },
    {
      name: "Writing",
      bgcolor: "#F2B277",
      icon: <PiPencilSimpleLineThin className="w-[48px] h-[48px]" />,
      time: practiceTime?.overall?.writing?.toString()?.includes('.') ? practiceTime?.overall?.writing?.toString()?.replace('.', ':') : `${practiceTime?.overall?.writing}:00`,
    },
    {
      name: "reading",
      bgcolor: "#4399FF",
      icon: <PiBookOpen className="w-[48px] h-[48px]" />,
      time: practiceTime?.overall?.reading?.toString()?.includes('.') ? practiceTime?.overall?.reading?.toString()?.replace('.', ':') : `${practiceTime?.overall?.reading}:00`,
    },
    {
      name: "listening",
      bgcolor: "#949494",
      icon: <PiHeadphonesThin className="w-[48px] h-[48px]" />,
      time: practiceTime?.overall?.listening?.toString()?.includes('.') ? practiceTime?.overall?.listening?.toString()?.replace('.', ':') : `${practiceTime?.overall?.listening}:00`,
    },
  ];


  // all time Data 
  const practiceTimeData = {
    speakingPerformances: [
      {
        title: "Read Aloud",
        time: practiceTime?.speaking?.read_aloud?.toString()?.includes('.') ? practiceTime?.speaking?.read_aloud?.toString()?.replace('.', ':') : `${practiceTime?.speaking?.read_aloud}:00`,
      },
      {
        title: "Repeat Sentence",
        time: practiceTime?.speaking?.repeat_sentence?.toString()?.includes('.') ? practiceTime?.speaking?.repeat_sentence?.toString()?.replace('.', ':') : `${practiceTime?.speaking?.repeat_sentence}:00`,
      },
      {
        title: "Describe Image",
        time: practiceTime?.speaking?.describe_image?.toString()?.includes('.') ? practiceTime?.speaking?.describe_image?.toString()?.replace('.', ':') : `${practiceTime?.speaking?.describe_image}:00`,
      },
      {
        title: "Re-Tell Lecture",
        time: practiceTime?.speaking?.retell_sentence?.toString()?.includes('.') ? practiceTime?.speaking?.retell_sentence?.toString()?.replace('.', ':') : `${practiceTime?.speaking?.retell_sentence}:00`,
      },
      {
        title: "Answer Short Question",
        time: practiceTime?.speaking?.short_question?.toString()?.includes('.') ? practiceTime?.speaking?.short_question?.toString()?.replace('.', ':') : `${practiceTime?.speaking?.short_question}:00`,
      },
    ],
    writingPerformances: [
      {
        title: "Summarize Written Text",
        time: practiceTime?.writing?.summarize?.toString()?.includes('.') ? practiceTime?.writing?.summarize?.toString()?.replace('.', ':') : `${practiceTime?.writing?.summarize}:00`,
      },
      {
        title: "Write Essay",
        time: practiceTime?.writing?.write_easy?.toString()?.includes('.') ? practiceTime?.writing?.write_easy?.toString()?.replace('.', ':') : `${practiceTime?.writing?.write_easy}:00`,
      },
    ],
    readingPerformances: [
      {
        title: "Reading & Writing Fill in the blanks",
        time: practiceTime?.reading?.read_write_blank
          ?.toString()?.includes('.') ? practiceTime?.reading?.read_write_blank
            ?.toString()?.replace('.', ':') : `${practiceTime?.reading?.read_write_blank
            }:00`,
      },
      {
        title: "Multiple Choice (Multiple)",
        time: practiceTime?.reading?.
          multi_choice_multi_answer?.toString()?.includes('.') ? practiceTime?.reading?.
            multi_choice_multi_answer?.toString()?.replace('.', ':') : `${practiceTime?.reading?.
              multi_choice_multi_answer}:00`,
      },
      {
        title: "Re-order Paragraphs",
        time: practiceTime?.reading?.reorder_paragraph?.toString()?.includes('.') ? practiceTime?.reading?.reorder_paragraph?.toString()?.replace('.', ':') : `${practiceTime?.reading?.reorder_paragraph}:00`,
      },
      {
        title: "Reading Fill in the Blanks",
        time: practiceTime?.reading?.reading_blank?.toString()?.includes('.') ? practiceTime?.reading?.reading_blank?.toString()?.replace('.', ':') : `${practiceTime?.reading?.reading_blank}:00`,
      },
      {
        title: "Multiple Choice (Single)",
        time: practiceTime?.reading?.multi_choice_single_answer
          ?.toString()?.includes('.') ? practiceTime?.reading?.multi_choice_single_answer
            ?.toString()?.replace('.', ':') : `${practiceTime?.reading?.multi_choice_single_answer
            }:00`,
      },
    ],
    listeningPerformances: [
      {
        title: "Summarize Spoken Text",
        time: practiceTime?.listening?.summarize_spoken
          ?.toString()?.includes('.') ? practiceTime?.listening?.summarize_spoken
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.summarize_spoken
            }:00`,
      },
      {
        title: "Multiple Choice (Multiple)",
        time: practiceTime?.listening?.multi_choice_multi_answer
          ?.toString()?.includes('.') ? practiceTime?.listening?.multi_choice_multi_answer
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.multi_choice_multi_answer
            }:00`,
      },
      {
        title: "Fill in the Blanks",
        time: practiceTime?.listening?.blank
          ?.toString()?.includes('.') ? practiceTime?.listening?.blank
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.blank
            }:00`,
      },
      {
        title: "Highlight Correct Summary",
        time: practiceTime?.listening?.highlight_summary
          ?.toString()?.includes('.') ? practiceTime?.listening?.highlight_summary
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.highlight_summary
            }:00`,
      },
      {
        title: "Multiple Choice (Single)",
        time: practiceTime?.listening?.multi_choice_single_answer
          ?.toString()?.includes('.') ? practiceTime?.listening?.multi_choice_single_answer
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.multi_choice_single_answer
            }:00`,
      },
      {
        title: "Select Missing Word",
        time: practiceTime?.listening?.missing_word
          ?.toString()?.includes('.') ? practiceTime?.listening?.missing_word
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.missing_word
            }:00`,
      },
      {
        title: "Highlight Incorrect Words",
        time: practiceTime?.listening?.incorrect_words
          ?.toString()?.includes('.') ? practiceTime?.listening?.incorrect_words
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.incorrect_words
            }:00`,
      },
      {
        title: "Write From Dictation",
        time: practiceTime?.listening?.dictation
          ?.toString()?.includes('.') ? practiceTime?.listening?.dictation
            ?.toString()?.replace('.', ':') : `${practiceTime?.listening?.dictation
            }:00`,
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

  // det data
  useEffect(() => {
    const getTime = async () => {
      const { data } = await axios("/time_spend")
      setPracticeTime(data)
    }
    getTime()
  }, [])
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
          {overall.map((task) => (
            <TodayTaskCard key={task.name} data={task} />
          ))}
        </div>
      </div>
      <div className="bg-secondary space-y-2 p-[15px] rounded-b-lg">
        {/* Performances reading */}
        {(performanceTab === "all" || performanceTab === "reading") && (
          <ListeningProgressTracker
            type="Reading"
            data={practiceTimeData?.readingPerformances}
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
