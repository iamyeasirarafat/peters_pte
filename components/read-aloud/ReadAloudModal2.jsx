import wordCount from "@/utils/wordCount";
import { useRouter } from "next/router";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import AudioDownloader from "../../utils/audioDownloader";
import AudioVisualizer from "../AudioVisualizer";
import LineProgressBar from "../global/LineProgressBar";
import ReusableModal from "../global/ReusableModal";
import WordHighlight from "../global/WordHighlight";

const ReadAloudModal2 = ({ open, setOpen, result }) => {
  const [selectedTab, setSelectedTab] = useState("pr");
  const router = useRouter();
  const id = router.query.que_no;
  const speakingScore = Math.round(result?.scores?.speaking) || 0;
  const readingScore = Math.round(result?.scores?.reading) || 0;
  const content = Math.round(result?.scores?.content) || 0;
  const fluency = Math.round(result?.scores?.fluency) || 0;
  const pronunciation = Math.round(result?.scores?.pronunciation) || 0;
  // const speed = Math.round(result?.scores?.speed) || 0;
  const speed = 140;
  const stress = Math.round(result?.scores?.stress) || 0;
  const pronountiation_accuracy =
    result?.scores?.pronountiation_accuracy * 100 || 0;
  const fluent = Math.round(result?.scores?.fluent[0]) || 0;
  // Download Function
  const downloadAudio = AudioDownloader();
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">#{id}</p>
          <p className="text-white text-2xl ml-40">AI DETAILED SCORE</p>
          <div className="flex items-center gap-x-4">
            <div className="py-[5px] pl-[10px] pr-5 bg-white rounded-[30px] flex items-center gap-x-4">
              <p className="text-white text-lg px-2 py-1 rounded-[30px] bg-blue">
                Target Score
              </p>
              <p className="text-gray text-[28px] font-medium">80</p>
            </div>
            {result?.audio && (
              <MdOutlineFileDownload
                onClick={() => {
                  downloadAudio(result?.audio)
                    .then()
                    .catch((error) => toast.error("Failed to download audio"));
                }}
                className="text-4xl text-white cursor-pointer"
              />
            )}
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
        <div className="px-8 pt-4 pb-2">
          {/* audio */}
          <div className="border border-primary rounded-xl flex items-center justify-between p-2">
            <div className="w-full">
              <AudioVisualizer selectedFile={result?.audio} />
            </div>
          </div>
          {/* sound */}
          {/* <div className="flex items-center justify-end gap-x-2 mt-3">
            <AiOutlineSound className="text-lg" />
            <div className="w-[114px] h-1 rounded-[13px] bg-[#BED3CC] relative">
              <div className="absolute top-1 left-[30%] w-3 h-3 rounded-full bg-primary cursor-pointer"></div>
            </div>
          </div> */}
          {/* score */}
          <div className="grid grid-cols-12 gap-x-6 mt-6">
            {/* Speaking Score */}

            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Speaking Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={speakingScore}
                    text={speakingScore}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "25px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 90</p>
              </div>
            </div>

            {/* wrighting Score */}

            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">listening Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={readingScore}
                    text={readingScore}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "25px",
                      pathColor: "#00ff38",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 90</p>
              </div>
            </div>

            {/* Enabling Skill  */}
            <div
              className={`col-span-6 w-full border border-primary rounded-[13px]`}
            >
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-4 p-5">
                {/* Content */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Content</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"cream"}
                    strokeWidth={content + 10}
                  />
                  <p className="text-gray text-xl">{content}/90</p>
                </div>
                {/* Fluency */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Fluency</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"primary"}
                    strokeWidth={fluency + 10}
                  />
                  <p className="text-gray text-xl">{fluency}/90</p>
                </div>
                {/* Pronunciation */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">
                    Pronunciation
                  </p>
                  <LineProgressBar
                    height={20}
                    lineColor={"blue"}
                    strokeWidth={pronunciation + 10}
                  />
                  <p className="text-gray text-xl">{pronunciation}/90</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mt-4 grid-cols-2">
            {/* Skill Analysis */}

            <div className={` w-full border border-primary rounded-[13px]`}>
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Skill Analysis</p>
              </div>
              <p className=" mx-2 text-gray text-justify">
                The following scores indicate your performance in various
                aspects compared to other users. These scores can help analyze
                areas for improvement in this question, although they do not
                directly correspond to PTE scores.
              </p>
              {/* progress bar */}
              <div className="space-y-4 p-5">
                {/* pronountiation_accuracy */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">
                    Pronunciation Accuracy
                  </p>
                  <LineProgressBar
                    height={20}
                    lineColor={"cream"}
                    strokeWidth={pronountiation_accuracy}
                  />
                  <p className="text-gray text-xl">
                    {pronountiation_accuracy}%
                  </p>
                </div>
                {/* fluent */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Fluent</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"primary"}
                    strokeWidth={fluent}
                  />
                  <p className="text-gray text-xl">{fluent}%</p>
                </div>
                {/* stress */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Stress</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"blue"}
                    strokeWidth={stress}
                  />
                  <p className="text-gray text-xl">{stress}%</p>
                </div>
                {/* speed */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg  w-3/6 text-start">Speed</p>
                  <LineProgressBar
                    height={20}
                    lineColor={speed > 100 ? "orange-500" : "cream"}
                    strokeWidth={speed}
                  />
                  <p className="text-gray text-xl">{speed}%</p>
                </div>
              </div>
            </div>

            {/* AI Speech to Text */}
            <div className="h-full">
              <div className="w-full border border-primary rounded-[13px]">
                <div className="rounded-t-[13px] gap-4 flex place-items-center py-1 px-2">
                  <button
                    onClick={() => setSelectedTab("pr")}
                    className={`px-4 py-2 font-semibold ${selectedTab === "pr" &&
                      "border-b-2 text-primary border-primary"
                      }`}
                  >
                    Pronunciation Accuracy
                  </button>
                  <button
                    onClick={() => setSelectedTab("st")}
                    className={`px-4 py-2 font-semibold ${selectedTab === "st" &&
                      "border-b-2 text-primary border-primary"
                      }`}
                  >
                    Stress
                  </button>
                </div>
                <div className="px-7 py-5">
                  {selectedTab === "pr" ? (
                    <WordHighlight words={result?.scores?.word_highlight} />
                  ) : (
                    <>
                      <p className=" text-sm text-lightGray text-left">
                        *The function words highlighted in red are the ones you
                        stressed unnecessarily
                      </p>
                      <WordHighlight words={result?.scores?.stress_words_highlights} />
                    </>
                  )}
                </div>
              </div>
              {selectedTab === "pr" && (
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      color: "green",
                    }}
                    className=" text-lg font-medium"
                  >
                    Good: {wordCount(result?.scores?.word_highlight, "correct")}{" "}
                    words
                  </p>
                  <p
                    style={{
                      color: "orange",
                    }}
                    className=" text-lg font-medium"
                  >
                    Average:{" "}
                    {wordCount(result?.scores?.word_highlight, "mispronounced")}{" "}
                    words
                  </p>
                  <p className="text-red text-lg font-medium">
                    Bad/Missed:{" "}
                    {wordCount(result?.scores?.word_highlight, "missing")} words
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="text-center mt-3 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default ReadAloudModal2;
