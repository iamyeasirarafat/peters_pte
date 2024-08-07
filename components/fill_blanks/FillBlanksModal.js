import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ModalHeader from "../global/ModalHeader";
import ReusableModal from "../global/ReusableModal";

const FillBlanksModal = ({
  data,
  open,
  setOpen,
  reading_fill_banks,
  fill_blanks,
}) => {
  const router = useRouter();
  const id = router.query.que_no;
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">
        {/* modal header */}
        <ModalHeader id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="p-5">
          {/* score */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-3">
            {/* Total Score */}
            <div
              className={`${
                reading_fill_banks
                  ? "col-span-4 lg:col-span-2"
                  : "col-span-4 lg:col-span-1"
              } w-full border border-primary rounded-[13px]`}
            >
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">
                  {fill_blanks ? "Listening" : "Reading"} Score
                </p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={
                      fill_blanks
                        ? data?.scores.listening
                        : data?.scores.reading || 0
                    }
                    text={
                      fill_blanks
                        ? data?.scores.listening
                        : data?.scores.reading || 0
                    }
                    maxValue={data?.scores.max_score || 0}
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
                  Out of {data?.scores.max_score || 0}
                </p>
              </div>
            </div>
            {reading_fill_banks || (
              <div className="col-span-4 lg:col-span-1 w-full border border-primary rounded-[13px]">
                <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                  <p className="text-gray text-xl">Writing Score</p>
                </div>
                {/* score point*/}
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="w-32 h-w-32">
                    <CircularProgressbar
                      value={data?.scores.writing || 0}
                      text={data?.scores.writing || 0}
                      maxValue={data?.scores.max_writing_score || 0}
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
                    Out of {data?.scores.max_writing_score || 0}
                  </p>
                </div>
              </div>
            )}
            {/* Time Taken */}
            <div className="col-span-4 lg:col-span-2 w-full border border-primary rounded-[13px] relative h-[180px] lg:h-auto">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full mt-3 lg:mt-0">
                <p className="text-[60px] text-gray">
                  {data?.time_taken || "0.00"}
                </p>
              </div>
            </div>
            {/* Correct answer */}
            <div className=" col-span-4 lg:col-span-2 w-full border border-primary  rounded-[13px] ">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Correct answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-start justify-center gap-x-1.5 p-4 w-full h-full">
                <p className="text-gray text-xl text-center">
                  {data?.scores?.score_details.map((item, index) => {
                    return (
                      <span key={index} className="block">
                        {item.right_option}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            {/* Your Answer */}
            <div className="col-span-4 lg:col-span-2 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Your Answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-start justify-center gap-x-1.5 p-4 w-full h-full">
                <p className="text-gray text-xl text-center">
                  {data?.scores?.score_details.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={`block ${
                          item?.correct ? "text-green-500" : "text-red"
                        }`}
                      >
                        {item.user_option ? item.user_option : "-"}
                      </span>
                    );
                  })}
                </p>
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

export default FillBlanksModal;
