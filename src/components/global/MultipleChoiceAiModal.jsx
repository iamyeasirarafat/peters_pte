import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import LineProgressBar from "./LineProgressBar";
import ReusableModal from "./ReusableModal";

const MultipleChoiceAiModal = ({
  open,
  setOpen,
  apiData,
  myAnswer,
  result,
  single,
}) => {
  const obj = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
  };

  // getting the right answers index
  const rightIndex = [];
  if (!single) {
    result?.right_options?.forEach((element) => {
      const index = apiData?.options.indexOf(element);
      if (index !== -1) {
        rightIndex.push(index);
      }
    });
  } else {
    const index = apiData?.options?.indexOf(result?.right_option);
    if (index !== -1) {
      rightIndex.push(index);
    }
  }
  const value = (result?.score / result?.max_score) * 100;
  console.log(value);
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
                    value={value}
                    text={result?.score}
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
                  Out of {result?.max_score}
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
                {/* <p className="text-[60px] text-gray">02:23</p> */}
                <p className="text-[60px] text-gray">N/A</p>
              </div>
            </div>
            {/* Correct answer */}
            <div className="col-span-3 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Correct answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center gap-x-1.5 p-4 absolute top-0 left-0 w-full h-full">
                {rightIndex?.map((item) => {
                  return <WordValue key={item} word={obj[item]} />;
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
                {myAnswer?.map((item, i) => {
                  let wrong = true;
                  rightIndex.forEach((i) => {
                    if (i === parseInt(item)) {
                      wrong = false;
                    }
                  });
                  return <WordValue key={i} word={obj[item]} wrong={wrong} />;
                })}
              </div>
            </div>
          </div>
          {/* Your Response */}
          <div className="w-full border border-primary rounded-[13px] mt-4">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Enabling Skill</p>
            </div>
            <div className="px-7 py-5">
              <div className="w-full flex items-center justify-between gap-x-5">
                <p className="text-gray text-xl w-3/6 text-start">Listening</p>
                <LineProgressBar
                  height={30}
                  lineColor={"cream"}
                  strokeWidth={50}
                />
                <p className="text-gray text-xl">0/2</p>
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

export default MultipleChoiceAiModal;

const WordValue = ({ word, wrong }) => {
  return (
    <p
      className={`text-[60px] text-gray ${
        wrong ? "bg-[#ffe0e0]" : "bg-[#d3ffd5]"
      } capitalize leading-none py-3 px-2.5 rounded-[15px] border border-primary`}
    >
      {word}
    </p>
  );
};
