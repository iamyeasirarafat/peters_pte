import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import AudioDownloader from "../../utils/audioDownloader";
import AudioVisualizer from "../AudioVisualizer";
import LineProgressBar from "../global/LineProgressBar";
import ReusableModal from "../global/ReusableModal";

const AnswerShortQue = ({
  open,
  setOpen,
  result
}) => {
  const router = useRouter();
  const id = router.query.que_no;
  const speakingScore = Math.round(result?.scores?.speaking) || 0;
  const content = result?.scores?.content || 'no'
  const fluency = result?.scores?.fluency_score || 0;
  const fluencyTotal = result?.scores?.["fluency_total score"] || 5;
  const pronunciation = result?.scores?.pronounciation_score || 0;
  const pronunciationTotal = result?.scores?.["pronounciation_total score"] || 5;
  const listening = Math.round(result?.scores?.listening) || 0;
  const downloadAudio = AudioDownloader();
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
            {result?.audio && (
              <MdOutlineFileDownload
                onClick={() => {
                  downloadAudio(result?.audio)
                    .then()
                    .catch((error) => toast.error("Failed to download audio"));
                }}
                className="text-4xl text-white cursor-pointer"
              />
            )}
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
            <div className="w-full">
              <AudioVisualizer selectedFile={result?.audio} />
            </div>
          </div>
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
                    value={speakingScore * 100}
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
                <p className="text-gray text-xl mt-1">Out of 1</p>
              </div>
            </div>

            {/* wrighting Score */}

            <div className="col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">
                  listening Score
                </p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={listening * 100}
                    text={listening}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "25px",
                      pathColor: "#00ff38",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 1</p>
              </div>
            </div>

            {/* Enabling Skill  */}
            <div
              className={`col-span-6 w-full border border-primary rounded-[13px]`}
            >
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-4 p-5">
                {/* Content */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Content</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"cream"}
                    strokeWidth={content === "yes" ? 100 : 0}
                  />
                  <p className="text-gray text-xl capitalize">{content}</p>
                </div>
                {/* Fluency */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">Fluency</p>
                  <LineProgressBar
                    height={20}
                    lineColor={"primary"}
                    strokeWidth={(fluency / fluencyTotal) * 100}
                  />
                  <p className="text-gray text-xl">{fluency}/{fluencyTotal}</p>
                </div>
                {/* Pronunciation */}
                <div className="w-full flex items-center justify-between gap-x-5">
                  <p className="text-gray text-lg w-3/6 text-start">
                    Pronunciation
                  </p>
                  <LineProgressBar
                    height={20}
                    lineColor={"blue"}
                    strokeWidth={(pronunciation / pronunciationTotal) * 100}
                  />
                  <p className="text-gray text-xl">{pronunciation}/{pronunciationTotal}</p>
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

              <p className="text-left">{result?.scores?.user_speech}</p>

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

export default AnswerShortQue;
