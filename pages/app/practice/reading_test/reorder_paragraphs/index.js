import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import ReusableModal from "@/components/global/ReusableModal";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LoaderIcon } from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import GlobalPagination from "../../../../../components/global/GlobalPagination";
import DashboardLayout from "../../../layout";

function Page() {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/reorder_paragraph/${id}/answer`;
  // getting Data
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/reorder_paragraph/" + id);
      setData(data);
    };
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    if (id) {
      getData();
      getResult();
    }
  }, [id, reFetch, answerApi]);
  //sideModal Data
  const SideModalData = {
    title: "Re-order Paragraphs",
    api: "/reorder_paragraphs",
  };
  // =========================
  const [answerData, setAnswerData] = useState([]);
  const [questionData, setQuestionData] = useState(data?.options || []);
  const sortingValue = [...questionData].sort((a, b) =>
    a.index.localeCompare(b.index)
  );
  //setting options to questionData
  useEffect(() => {
    if (data.options && answerData.length === 0) {
      setQuestionData(data.options);
    }
  }, [data, answerData]);

  //clearing answer list when question is changed
  useEffect(() => {
    setAnswerData([]);
  }, [id]);

  // =========================
  const initialMinutes = 2;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          setTimerExpired(true);
          clearInterval(countdownInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [minutes, seconds]);

  // reset time
  useEffect(() => {
    setMinutes(initialMinutes);
    setSeconds(0);
  }, [id, initialMinutes]);
  const initialSeconds = initialMinutes * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const timeTakenInMinutes = ((initialSeconds - remainingSeconds) / 60).toFixed(
    2
  );

  const handelSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(answerApi, {
        answers: answerData.map((item) => item.index),
        time_taken: timeTakenInMinutes,
      });
      setReFetch((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending audio:", error);
      setIsLoading(false);
    }
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Re-order Paragraphs" />
      <p className="text-gray text-base mt-2 text-center">
        The text boxes in the left panel have been placed in random order.
        Restore the original order by dragging the text boxes from the left
        panel to the right panel.
      </p>
      <GlobalMainContent data={data}>
        <ReOrderBlock
          data={sortingValue}
          answerData={answerData}
          setAnswerData={setAnswerData}
          setQuestionData={setQuestionData}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handelSubmit}
              disabled={isLoading}
              className="py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-blue text-white font-semibold text-lg"
            >
              {isLoading && <LoaderIcon />}
              Submit
            </button>
            <button
              onClick={() => {
                router.reload();
              }}
              className="py-2 px-6 hover:bg-secondary  flex items-center gap-x-2 rounded-[22px]  text-primary border border-primary font-semibold text-lg"
            >
              Restart
            </button>
          </div>
          <GlobalPagination />
        </div>
      </GlobalMainContent>
      {(result?.self?.[0]?.user || result?.other?.[0]?.user) && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
          setAiResult={setAiResult}
        />
      )}
      <ReorderModal
        apiData={data}
        data={aiResult}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
}
export default Page;

const ReOrderBlock = ({ data, answerData, setAnswerData, setQuestionData }) => {
  return (
    <div className="grid grid-cols-11">
      {/* question */}
      <div className="col-span-5 border border-primary rounded-[15px] w-full p-2.5">
        <p className="text-center text-lg font-medium">Source</p>
        <div className="space-y-2">
          {data?.map((item, index) => (
            <SentenceBlock
              from="q"
              key={index}
              data={item}
              setAnswerData={setAnswerData}
              setQuestionData={setQuestionData}
            />
          ))}
        </div>
      </div>
      {/* icon */}
      <div className="col-span-1 h-full flex items-center justify-center">
        <div className="h-[55px] w-[55px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              fill
              alt="icons"
              src="/icons/reorderArrow.svg"
            />
          </div>
        </div>
      </div>
      {/* answer */}
      <div className="col-span-5 border border-primary rounded-[15px] w-full p-2.5">
        <p className="text-center text-lg font-medium">Target</p>
        <div className="space-y-2">
          {answerData?.map((item, index) => (
            <SentenceBlock
              from="a"
              key={index}
              data={item}
              setAnswerData={setAnswerData}
              setQuestionData={setQuestionData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const SentenceBlock = ({ data, from, setAnswerData, setQuestionData }) => {
  return (
    <div
      onClick={() => {
        if (from === "q") {
          setAnswerData((prev) => [...prev, data]);
          setQuestionData((prev) =>
            prev.filter((item) => item?.index !== data?.index)
          );
        } else {
          setAnswerData((prev) =>
            prev.filter((item) => item?.index !== data?.index)
          );
          setQuestionData((prev) => [...prev, data]);
        }
      }}
      className="border border-primary rounded-[10px] p-2.5 w-full flex items-center gap-x-5 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out"
    >
      <div className="w-9 h-9 rounded-md bg-primary text-white flex items-center justify-center flex-shrink-0">
        {data?.index}
      </div>
      <p className="text-gray text-base leading-[18px]">{data?.value}</p>
    </div>
  );
};

const ReorderModal = ({ apiData, data, open, setOpen }) => {
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">#{data?.id || 0}</p>
          <p className="text-white text-2xl ml-40">AI DETAILED SCORE</p>
          <div className="flex items-center gap-x-4">
            <div className="py-[5px] pl-[10px] pr-5 bg-white rounded-[30px] flex items-center gap-x-4">
              <p className="text-white text-lg px-2 py-1 rounded-[30px] bg-blue">
                Target Score
              </p>
              <p className="text-gray text-[28px] font-medium">80</p>
            </div>
            {/* <MdOutlineFileDownload className="text-4xl text-white cursor-pointer" /> */}
            {/* close modal */}
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center"
            >
              <GrClose className="text-gray text-xl" />
            </button>
          </div>
        </div>
        {/* Modal content */}
        <div className="p-5">
          {/* score */}
          <div className="grid grid-cols-6 gap-6">
            {/* Total Score */}
            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Total Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={data?.scores.score || 0}
                    text={data?.scores.score || 0}
                    maxValue={data?.scores.max_score || 0}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">
                  Out of {data?.scores.max_score || 0}
                </p>
              </div>
            </div>
            {/* Time Taken */}
            <div className="col-span-3 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">
                  {data?.time_taken || "0.00"}
                </p>
              </div>
            </div>
            {/* Correct answer */}
            <div className="col-span-3 w-full h-34 border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Correct answer</p>
              </div>
              {/* score point*/}
              <div className="flex mt-4 text-xl justify-center h-full">
                {apiData?.options?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="h-14 w-14 mr-4 flex items-center justify-center  rounded bg-green-500 text-white font-semibold"
                    >
                      {item.index}
                    </span>
                  );
                })}
              </div>
            </div>
            {/* Your Answer */}
            <div className="col-span-3 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Your Answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center gap-x-1.5 p-4 absolute top-0 left-0 w-full h-full">
                <p className="flex gap-2 mt-6 text-xl text-center">
                  {data?.scores?.score_details.map((item, index) => {
                    return (
                      <div key={index} className="">
                        {data?.scores?.score_details.length - 1 === index ? (
                          <div
                            // className={`flex gap-2 ${
                            //   (index + 1) % 2 === 0
                            //     ? "border-b-2"
                            //     : "border-t-2"
                            // } ${
                            //   item.match ? "border-green-400" : "border-red"
                            // }`}
                            className="flex gap-2"
                          >
                            <span className="h-14 w-14 mr-4 flex items-center justify-center  rounded border-primary border text-primary font-semibold">
                              {item?.pair[0]}
                            </span>
                            <span className="h-14 w-14 mr-4 flex items-center justify-center  rounded border-primary border text-primary font-semibold">
                              {item?.pair[1]}
                            </span>
                          </div>
                        ) : (
                          <span className="h-14 w-14 mr-4 flex items-center justify-center  rounded border-primary border text-primary font-semibold">
                            {item?.pair[0]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
          <p className="text-center mt-2 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};
