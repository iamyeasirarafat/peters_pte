import wordCount from "@/utils/wordCount";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { GrClose } from "react-icons/gr";
import ReusableModal from "../global/ReusableModal";
import WordHighlight from "../global/WordHighlight";

const WriteDictationModal = ({ open, setOpen, result }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const {
    overall: totalScore,
    word_highlights,
    num_matching_words,
  } = result?.scores || {};

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
          <div className="grid grid-cols-12 gap-x-6">
            {/* Total Score */}
            <div className="col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Total Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={num_matching_words}
                    text={num_matching_words}
                    strokeWidth={15}
                    maxValue={totalScore}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of {totalScore}</p>
              </div>
            </div>
            {/* Time Taken */}
            <div className="col-span-4 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">{result?.time_taken}</p>
              </div>
            </div>
            {/* Correct word */}
            <div className="col-span-4 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Matching Words</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">{num_matching_words}</p>
              </div>
            </div>
          </div>
          {/* Your Answer */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Answer</p>
            </div>
            <div className="px-7 py-5">
              <WordHighlight words={word_highlights} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">
              Total: {word_highlights?.length || 0} words
            </p>
            <p className="text-green-700 text-lg font-medium">
              Matching: {wordCount(word_highlights, "correct")} words
            </p>
            <p className="text-red text-lg font-medium">
              Missed: {wordCount(word_highlights, "missing")} words
            </p>
          </div>
          {/* Correct Answer */}
          {/* <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Correct Answer</p>
            </div>
            <div className="p-4">
              <p className="text-left text-xl">
                Nature is defined as a specific chemical compound.
              </p>
            </div>
          </div> */}
          <p className="text-center mt-2 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default WriteDictationModal;
