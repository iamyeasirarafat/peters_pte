import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ErrorHighlight from "../global/ErrorHighlight";
import LineProgressBar from "../global/LineProgressBar";
import ModalHeader from "../global/ModalHeader";
import ReusableModal from "../global/ReusableModal";

const WriteEssayModal = ({ open, setOpen, result }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const {
    Content,
    Grammar,
    Spelling,
    Structure,
    Linguistic,
    Form,
    Vocabulary,
    Overall: totalScore,
  } = result?.scores || {};
  const formateData = [
    { color: "cream", value: Content, name: "Content" },
    { color: "primary", value: Grammar, name: "Grammar" },
    { color: "blue", value: Spelling, name: "Spellings" },
    {
      color: "cream",
      value: Structure,
      name: "Development, Structure and Coherence",
    },
    { color: "primary", value: Linguistic, name: "General Linguistic Range" },
    { color: "blue", value: Form, name: "Form" },
    { color: "cream", value: Vocabulary, name: "Vocabulary" },
  ];
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">
        {/* modal header */}
        <ModalHeader id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="px-5 lg:px-8 pt-5 lg:pt-4 pb-2">
          {/* score */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-3 mt-5 lg:mt-12">
            {/* Total Score */}
            <div className="col-span-12 lg:col-span-3 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Total Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4 pt-7">
                <div className="w-[150px] h-[150px]">
                  <CircularProgressbar
                    value={totalScore}
                    text={`${totalScore}`}
                    maxValue={15}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "25px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">Out of 15.00</p>
              </div>
            </div>
            {/* Enabling Skill  */}
            <div className="col-span-12 lg:col-span-9 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-0 p-5">
                {formateData?.map((item, index) => {
                  let outOf = 2;
                  if (item?.name === "Content") {
                    outOf = 3;
                  }
                  return (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between gap-x-5"
                    >
                      <p className="text-gray text-lg w-4/12 lg:w-6/12 text-start">
                        {item?.name}
                      </p>
                      <div className="w-6/12 lg:w-5/12">
                        <LineProgressBar
                          height={25}
                          lineColor={`${item?.color}`}
                          strokeWidth={item?.value * 50}
                        />
                      </div>
                      <p className="text-gray w-2/12 lg:w-1/12 text-lg">
                        {item?.value}/{outOf}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full border border-primary rounded-[13px] mt-5">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Response</p>
            </div>
            <div className="px-7 py-5">
              <ErrorHighlight words={result?.scores?.word_highlights} />
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
            <div className="px-7 py-5">
              <p className="text-left text-base leading-normal">
                {result?.suggestion}
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

export default WriteEssayModal;
