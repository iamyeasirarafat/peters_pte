import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ErrorHighlight from "../global/ErrorHighlight";
import LineProgressBar from "../global/LineProgressBar";
import ModalHeader from "../global/ModalHeader";
import ReusableModal from "../global/ReusableModal";
const SummarizeModal = ({ open, setOpen, result }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const {
    content,
    grammar,
    form,
    vocabulary,
    overall: totalScore,
  } = result?.scores || {};
  const formateData = [
    { color: "cream", value: content, name: "Content" },
    { color: "primary", value: grammar, name: "Grammar" },
    { color: "blue", value: form, name: "Form" },
    { color: "cream", value: vocabulary, name: "Vocabulary" },
  ];
  function togglePopover(elementId) {
    const popover = document.getElementById(elementId);
    popover.classList.toggle('hidden');
  }
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">

        {/* modal header */}
        <ModalHeader id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="px-5 lg:px-8 pt-4 pb-2">
          {/* score */}
          <div className="grid grid-cols-11 gap-x-6 gap-y-3 mt-12">
            {/* Total Score */}
            <div className="col-span-11 lg:col-span-4 w-full border border-primary rounded-[13px]">
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
            <div className="col-span-11 lg:col-span-7 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Enabling Skill</p>
              </div>
              {/* progress bar */}
              <div className="space-y-3 p-5">
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
                        height={35}
                        lineColor={`${item?.color}`}
                        strokeWidth={item?.value * 50}
                      />
                    </div>
                    <p className="text-gray w-1/12 text-xl">{item?.value}/{item?.name === "Form" ? 1 : 2}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* AI Speech to Text */}
          <div className="w-full border border-primary rounded-[13px] mt-5">
            <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
              <p className="text-gray text-xl">Your Response</p>
            </div>
            <div className="px-7 py-5">
              <ErrorHighlight words={result?.scores?.word_highlight} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray text-lg font-medium">
              Total: {result?.answer?.split(" ").length} words
            </p>
            <p className="text-gray text-lg font-medium">
              Time : {result?.time_taken}
            </p>
            <p className="text-gray text-lg font-medium">English: British</p>
          </div>
          <p className="text-center mt-3 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};

export default SummarizeModal;
