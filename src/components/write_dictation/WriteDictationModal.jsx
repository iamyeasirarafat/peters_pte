import React from "react";
import ReusableModal from "../global/ReusableModal";
import { MdOutlineFileDownload } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import LineProgressBar from "../global/LineProgressBar";

const WriteDictationModal = ({ open, setOpen }) => {
  const totalScore = 50;
  const content = 20;
  const grammar = 30;
  const form = 40;
  const spelling = 50;
  const vocabulary = 60;
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">#15425454</p>
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
        <div className="p-5">
          {/* score */}
          <div className="grid grid-cols-12 gap-x-6">
            {/* Total Score */}
            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Total Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={totalScore}
                    text={totalScore}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 10.00</p>
              </div>
            </div>
            {/* Time Taken */}
            <div className="col-span-3 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">02:23</p>
              </div>
            </div>
            {/* Total Score */}
            <div className="col-span-6 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-2 p-4">
                {/* Listening */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">
                    Listening
                  </p>
                  <LineProgressBar
                    height={30}
                    lineColor={"cream"}
                    strokeWidth={content}
                  />
                  <p className="text-gray text-xl">0/4.5</p>
                </div>
                {/* Writing */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Writing</p>
                  <LineProgressBar
                    height={30}
                    lineColor={"primary"}
                    strokeWidth={grammar}
                  />
                  <p className="text-gray text-xl">0/4.5</p>
                </div>
              </div>
            </div>
          </div>
          {/* Your Answer */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Answer</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-left text-xl">
                A report on inequality in the UK said last week that girls had
                better educational results than boys at 16, went to university
                in greater numbers and achieved better degrees once they got
                there.{" "}
                <q>
                  More women now have higher education qualifications than men
                  in every age group up to age 44,
                </q>{" "}
                the report said.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">Correct Word</p>
            <p className="text-cream text-lg font-medium">Missed Word</p>
            <p className="text-red text-lg font-medium">
              Misspelled/Wrong Word
            </p>
          </div>
          {/* Correct Answer */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Correct Answer</p>
            </div>
            <div className="p-4">
              <p className="text-left text-xl">
                Nature is defined as a specific chemical compound.
              </p>
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

export default WriteDictationModal;
