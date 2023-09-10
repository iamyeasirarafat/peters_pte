import React from "react";
import ReusableModal from "../global/ReusableModal";
import { MdOutlineFileDownload } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import LineProgressBar from "../global/LineProgressBar";

const SpokenTextModal = ({ open, setOpen }) => {
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
            {/* Total Score */}
            <div className="col-span-9 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-1 p-4">
                {/* Content */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Content</p>
                  <LineProgressBar
                    height={30}
                    lineColor={"cream"}
                    strokeWidth={content}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* grammar */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Grammar</p>
                  <LineProgressBar
                    height={30}
                    lineColor={"primary"}
                    strokeWidth={grammar}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Form */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Form</p>
                  <LineProgressBar
                    height={30}
                    lineColor={"blue"}
                    strokeWidth={form}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Spelling */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Spelling</p>
                  <LineProgressBar
                    height={30}
                    lineColor={"blue"}
                    strokeWidth={spelling}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
                {/* Vocabulary */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">
                    Vocabulary
                  </p>
                  <LineProgressBar
                    height={30}
                    lineColor={"blue"}
                    strokeWidth={vocabulary}
                  />
                  <p className="text-gray text-xl">0/2</p>
                </div>
              </div>
            </div>
          </div>
          {/* Your Response */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Response</p>
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
            <p className="text-gray text-lg font-medium">Total: 50 words</p>
            <p className="text-gray text-lg font-medium">Time Taken : 5:00</p>
          </div>
          {/* Suggestion */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Suggestion</p>
            </div>
            <div className="p-4">
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
          <p className="text-center mt-2 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default SpokenTextModal;
