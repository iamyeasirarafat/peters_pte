import { useRouter } from "next/router";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { GrClose } from "react-icons/gr";
import LineProgressBar from "../global/LineProgressBar";
import ReusableModal from "../global/ReusableModal";

const SpokenTextModal = ({ open, setOpen, result }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const {
    content,
    writing,
    listening,
    grammar,
    form,
    spelling,
    vocabulary,
    overall: totalScore,
  } = result?.scores || {};
  const formateData = [
    { color: "cream", value: content, name: "Content" },
    { color: "primary", value: grammar, name: "Grammar" },
    { color: "blue", value: form, name: "Form" },
    { color: "cream", value: spelling, name: "Spelling" },
    { color: "primary", value: vocabulary, name: "Vocabulary" },
  ];
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
                <div className="w-32">
                  <CircularProgressbar
                    value={totalScore}
                    text={totalScore}
                    strokeWidth={15}
                    maxValue={10}
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
            {/* <div className="col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Listening Score</p>
              </div>
              score point
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={listening}
                    text={listening}
                    strokeWidth={15}
                    maxValue={90}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 90.00</p>
              </div>
            </div> */}
            {/* <div className="col-span-4 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Writing Score</p>
              </div>
              score point
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={writing}
                    text={writing}
                    strokeWidth={15}
                    maxValue={90}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 90.00</p>
              </div>
            </div> */}

            {/* Total Score */}
            <div className="col-span-8 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-1 p-4">
                {formateData.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between gap-x-5"
                  >
                    <p className="text-gray text-xl w-3/12 text-start">
                      {item?.name}
                    </p>
                    <div className="w-8/12">
                      <LineProgressBar
                        height={30}
                        lineColor={`${item?.color}`}
                        strokeWidth={item?.value * 50}
                      />
                    </div>
                    <p className="text-gray w-1/12 text-xl">{item?.value}/2</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Your Response */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Response</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-left text-xl">{result?.answer}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">
              Total: {result?.answer?.split(" ")?.length} words
            </p>
            <p className="text-gray text-lg font-medium">
              Time Taken : {result?.time_taken}
            </p>
          </div>
          {/* Suggestion */}
          {/* <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Suggestion</p>
            </div>
            <div className="p-4">
              <p className="text-left text-xl">
                {result?.suggestion || "No Suggestion"}
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

export default SpokenTextModal;
