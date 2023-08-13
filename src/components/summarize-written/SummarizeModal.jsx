import { useSearchParams } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import LineProgressBar from "../global/LineProgressBar";
import ReusableModal from "../global/ReusableModal";

const SummarizeModal = ({ open, setOpen, result }) => {
  const params = useSearchParams();
  const id = params.get("que_no");
  const totalScore = result.Overall || 0;
  const content = result?.Content || 0;
  const grammar = result?.Grammar || 0;
  const pronunciation = result?.Form || 0;
  const vocabulary = result?.Vocabulary || 0;
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
                    maxValue={7}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "25px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 7</p>
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
                    strokeWidth={content * 50}
                  />
                  <p className="text-gray text-xl">{content}/2</p>
                </div>
                {/* Grammar */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Grammar</p>
                  <LineProgressBar
                    height={35}
                    lineColor={"primary"}
                    strokeWidth={grammar * 50}
                  />
                  <p className="text-gray text-xl">{grammar}/2</p>
                </div>
                {/* Form */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Form</p>
                  <LineProgressBar
                    height={35}
                    lineColor={"blue"}
                    strokeWidth={pronunciation * 50}
                  />
                  <p className="text-gray text-xl">{pronunciation}/2</p>
                </div>
                {/* Vocabulary Range */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">
                    Vocabulary Range
                  </p>
                  <LineProgressBar
                    height={35}
                    lineColor={"primary"}
                    strokeWidth={vocabulary * 50}
                  />
                  <p className="text-gray text-xl">{vocabulary}/2</p>
                </div>
              </div>
            </div>
          </div>
          {/* AI Speech to Text */}
          {/* <div className="w-full border border-primary rounded-[13px] mt-5">
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
          {/* <div className="w-full border border-primary rounded-[13px] mt-4">
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
          </div> */}
          <p className="text-center mt-3 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default SummarizeModal;
