"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import LineProgressBar from "@/src/components/global/LineProgressBar";
import ReusableModal from "@/src/components/global/ReusableModal";
import Score from "@/src/components/global/Score";
import TabButton from "@/src/components/global/TabButton";
import TextBlock from "@/src/components/read-aloud/TextBlock";
import TypingBlock from "@/src/components/summarize-written/TypingBlock";
import Image from "next/image";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AiPageHeader title="Summarize Written Text" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        Read the passage below and summarize it using one sentence. Type your
        response in the box at the bottom of the screen. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points in the
        passage.
      </p>
      {/* read aloud box  */}
      <div className="relative border border-primary rounded-[15px] mt-12 pb-4">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Prediction
          </button>
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-primary">
            Practiced (1)
          </button>
          <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
            Appeared (12)
          </button>
        </div>
        <div className="bg-secondary rounded-t-[15px] py-2 pl-8 pr-5 flex items-center justify-between">
          <p className="text-[#ACACAC] text-xl">Bill | Q No. #7250589</p>
          <div className="flex items-center gap-x-5">
            <div className="w-[28px] h-[29px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/page.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
            <div className="w-[17px] h-[28px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/bookmark.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        {/* text block */}
        <TextBlock />
        {/* type Block */}
        <TypingBlock />
      </div>
      {/* scores */}
      <div className="relative border border-primary rounded-[15px] mt-12 py-4 px-8">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
          <TabButton
            src={"/icons/aplus.svg"}
            iconWidth={21}
            iconHeight={23}
            bgColor={"blue"}
            textColor={"white"}
          >
            My Score
          </TabButton>
          <TabButton
            src={"/icons/massage.svg"}
            iconWidth={22}
            iconHeight={22}
            bgColor={"cream"}
            textColor={"gray"}
          >
            Forum
          </TabButton>
          <TabButton
            src={"/icons/score.svg"}
            iconWidth={24}
            iconHeight={24}
            bgColor={"primary"}
            textColor={"gray"}
          >
            Community Score
          </TabButton>
        </div>
        {/* score */}
        <Score />
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Index;

const Modal = ({ open, setOpen }) => {
  const totalScore = 40;
  const content = 50;
  const grammar = 30;
  const pronunciation = 60;
  const vocabulary = 70;
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">#7250589</p>
          <p className="text-white text-2xl ml-40">AI DETAILED SCORE</p>
          <div className="flex items-center gap-x-4">
            <div className="py-[5px] pl-[10px] pr-5 bg-white rounded-[30px] flex items-center gap-x-4">
              <p className="text-white text-lg px-2 py-1 rounded-[30px] bg-blue">
                Target Score
              </p>
              <p className="text-gray text-[28px] font-medium">80</p>
            </div>
            <MdOutlineFileDownload className="text-4xl text-white cursor-pointer" />
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
          {/* score */}
          <div className="grid grid-cols-11 gap-x-6 mt-12">
            {/* Total Score */}
            <div className="col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Total Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={totalScore}
                    text={totalScore}
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
            {/* Enabling Skill  */}
            <div className="col-span-7 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-3 p-5">
                {/* Content */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Content</p>
                  <LineProgressBar
                    height={35}
                    lineColor={"cream"}
                    strokeWidth={content}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Grammar */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Grammar</p>
                  <LineProgressBar
                    height={35}
                    lineColor={"primary"}
                    strokeWidth={grammar}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Form */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Form</p>
                  <LineProgressBar
                    height={35}
                    lineColor={"blue"}
                    strokeWidth={pronunciation}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Vocabulary Range */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">
                    Vocabulary Range
                  </p>
                  <LineProgressBar
                    height={35}
                    lineColor={"primary"}
                    strokeWidth={vocabulary}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
              </div>
            </div>
          </div>
          {/* AI Speech to Text */}
          <div className="w-full border border-primary rounded-[13px] mt-5">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Response</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-left text-xl leading-normal">
                The bill calls for the establishment of the National Landslide
                Hazards Reduction Program within one year of becoming law. The
                program serves numerous functions, including to identify and
                understand landslide hazards and risks, reduce losses from
                landslides, protect communities at risk of landslides hazards,
                and improve communication and emergency preparedness.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">Total: 50 words</p>
            <p className="text-gray text-lg font-medium">Time : 5:00</p>
            <p className="text-gray text-lg font-medium">English: British</p>
          </div>
          {/* Suggestion */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Suggestion</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-left text-base leading-normal">
                Form: Your response has to be in ONE single, complete sentence
                only. If this criterion is not met, you won’t get a score in
                rest of the enabling skills.
              </p>
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
