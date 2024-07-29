import wordCount from "@/utils/wordCount";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReusableModal from "../global/ReusableModal";
import WordHighlight from "../global/WordHighlight";
import ModalHeader from "../global/ModalHeader";

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
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">
        {/* modal header */}
        <ModalHeader id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="p-3 lg:p-5">
          {/* score */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-3">
            {/* Total Score */}
            <div className="col-span-12 lg:col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Listening Score</p>
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
            <div className="col-span-12 lg:col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Writing Score</p>
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
            <div className="col-span-12 lg:col-span-4 w-full border border-primary rounded-[13px] relative h-[150px] lg:h-auto">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full mt-2 lg:mt-0">
                <p className="text-[60px] text-gray">{result?.time_taken}</p>
              </div>
            </div>
            {/* Correct word */}
            {/* <div className="col-span-4 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Matching Words</p>
              </div>
              score point
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">{num_matching_words}</p>
              </div>
            </div> */}
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
