"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import LineProgressBar from "@/src/components/global/LineProgressBar";
import ReusableModal from "@/src/components/global/ReusableModal";
import Score from "@/src/components/global/Score";
import TabButton from "@/src/components/global/TabButton";
import RecordBlock from "@/src/components/read-aloud/RecordBlock";
import TextBlock from "@/src/components/read-aloud/TextBlock";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineSound } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const params = useSearchParams();
  const id = params.get("que_no");
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/practice/read_aloud/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  return (
    <div>
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <AiPageHeader title="Read Aloud" setOpen={setOpenModal} />
      <p className="text-gray text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      {/* read aloud box  */}
      <div className="relative border border-primary rounded-[15px] mt-12 pb-4">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
          {data?.prediction && (
            <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
              Prediction
            </button>
          )}
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-primary">
            Practiced ({data?.practiced})
          </button>
          <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
            Appeared (12)
          </button>
        </div>
        <div className="bg-secondary rounded-t-[15px] py-2 pl-8 pr-5 flex items-center justify-between">
          <p className="text-[#ACACAC] text-xl">
            {data?.title} | Q No. #{data?.id}
          </p>
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
        <TextBlock data={data} />
        {/* recording Block */}
        <RecordBlock setResult={setResult} />
      </div>
      {/* // result tab */}
      {result && <ResultSection setOpenModal={setOpenModal} result={result} />}
      {result && (
        <Modal result={result} open={openModal} setOpen={setOpenModal} />
      )}
    </div>
  );
};
export default Index;

const Modal = ({ open, setOpen, result }) => {
  const ReadingScore = result?.reading_score || 0;
  const SpeakingScore = result?.speaking_score || 0;
  const content = result?.reading_score || 0;
  const fluency = result?.fluency_score || 0;
  const pronunciation = result?.pronunciation_score || 0;
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
          {/* audio */}
          <div className="border border-primary rounded-xl flex items-center justify-between p-2">
            <button className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center">
              <VscDebugStart className="text-white text-2xl" />
            </button>
          </div>
          {/* sound */}
          <div className="flex items-center justify-end gap-x-2 mt-3">
            <AiOutlineSound className="text-lg" />
            <div className="w-[114px] h-1 rounded-[13px] bg-[#BED3CC] relative">
              <div className="absolute top-1 left-[30%] w-3 h-3 rounded-full bg-primary cursor-pointer"></div>
            </div>
          </div>
          {/* score */}
          <div className="grid grid-cols-12 gap-x-6 mt-12">
            {/* Speaking Score */}
            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Speaking Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={SpeakingScore}
                    text={SpeakingScore}
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
                <p className="text-gray text-xl">Reading Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={ReadingScore}
                    text={ReadingScore}
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
            <div className="col-span-6 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-4 p-5">
                {/* Content */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Content</p>
                  <LineProgressBar
                    height={45}
                    lineColor={"cream"}
                    strokeWidth={content}
                  />
                  <p className="text-gray text-xl">53/90</p>
                </div>
                {/* Fluency */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Fluency</p>
                  <LineProgressBar
                    height={45}
                    lineColor={"primary"}
                    strokeWidth={fluency}
                  />
                  <p className="text-gray text-xl">73/90</p>
                </div>
                {/* Pronunciation */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">
                    Pronunciation
                  </p>
                  <LineProgressBar
                    height={45}
                    lineColor={"blue"}
                    strokeWidth={pronunciation}
                  />
                  <p className="text-gray text-xl">63/90</p>
                </div>
              </div>
            </div>
          </div>
          {/* AI Speech to Text */}
          <div className="w-full border border-primary rounded-[13px] mt-5">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">AI Speech to Text</p>
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
            <p className="text-[#858736] text-lg font-medium">Good: 36 words</p>
            <p className="text-red text-lg font-medium">Bad/Missed: 14 words</p>
          </div>
          <p className="text-center mt-3 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

const ResultSection = ({ result, setOpenModal }) => {
  return (
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
      <Score setOpenModal={setOpenModal} result={result} />
    </div>
  );
};
