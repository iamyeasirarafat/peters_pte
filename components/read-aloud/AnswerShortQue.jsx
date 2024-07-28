import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AudioVisualizer from "../AudioVisualizer";
import LineProgressBar from "../global/LineProgressBar";
import ModalHeader from "../global/ModalHeader";
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
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">
        {/* modal header */}
        <ModalHeader audio={result?.audio} id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="px-5 lg:px-8 pt-4 pb-2">
          {/* audio */}
          <div className="border border-primary rounded-xl flex items-center justify-between p-2">
            <div className="w-full">
              <AudioVisualizer selectedFile={result?.audio} />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-3 mt-12">
            {/* Speaking Score */}

            <div className="col-span-12 lg:col-span-3 w-full border border-primary rounded-[13px]">
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

            <div className="col-span-12 lg:col-span-3 w-full border border-primary rounded-[13px]">
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
              className={`col-span-12 lg:col-span-6 w-full border border-primary rounded-[13px]`}
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
