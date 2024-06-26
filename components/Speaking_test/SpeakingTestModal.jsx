import wordCount from "@/utils/wordCount";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiOutlineSound } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import LineProgressBar from "../global/LineProgressBar";
import ReusableModal from "../global/ReusableModal";
import WordHighlight from "../global/WordHighlight";
import { useRouter } from "next/router";

const SpeakingTestModal = ({title=null, open, setOpen, result }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const speakingScore = Math.round(result?.speaking_score) || 0;
  const readingScore = Math.round(result?.reading_score) || 0;
  const content = Math.round(result?.reading_score) || 0;
  const fluency = Math.round(result?.fluency_score) || 0;
  const pronunciation = Math.round(result?.pronunciation_score) || 0;
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
            { title == 'answer_short_question' ? "" : (
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
            )}

            {/* Reading Score */}
            { title == null ? (
            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Reading Score</p>
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
            ) : ""}
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
                  <p className="text-gray text-xl">{content}/90</p>
                </div>
                {/* Fluency */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-xl w-3/6 text-start">Fluency</p>
                  <LineProgressBar
                    height={45}
                    lineColor={"primary"}
                    strokeWidth={fluency}
                  />
                  <p className="text-gray text-xl">{fluency}/90</p>
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
                  <p className="text-gray text-xl">{pronunciation}/90</p>
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
              <WordHighlight words={result?.word_highlight} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">
              Total: {result?.word_highlight.length} words
            </p>
            <p className="text-[#858736] text-lg font-medium">
              Good: {wordCount(result?.word_highlight, "correct")} words
            </p>
            <p className="text-red text-lg font-medium">
              Bad/Missed: {wordCount(result?.word_highlight, "missing")} words
            </p>
          </div>
          <p className="text-center mt-3 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default SpeakingTestModal;
