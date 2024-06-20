import React, { useState } from "react";
import { RiSettings2Fill } from "react-icons/ri";

// for modal

import TargetScoreModal from "./TargetScoreModal";
import ExamCountModal from "./ExamCountModal";

export default function HeaderCounter() {
  const [openTModal, setOpenTModal] = useState(false);
  const [openEModal, setOpenEModal] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-1.5 mt-2.5">
        <div className="p-1.5 bg-white dark:bg-white/20 rounded-[50px] flex items-center gap-x-2 border border-primary ">
          <button
            // disabled={router?.asPath?.startsWith("/admin")}

            className="bg-primary cursor-default text-white text-sm lg:text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Exam Count Down
          </button>
          <div className="text-sm lg:text-xl font-medium text-gray dark:text-white">
            {/* {examDate?.exam_date ? (
                  <Countdown targetDate={examDate?.exam_date} />
                ) : (
                  <p>Not set Exam date</p>
                )} */}
            20d 03h 03m 52s
          </div>
          <RiSettings2Fill onClick={() => setOpenEModal(true)} className="text-xl cursor-pointer text-primary" />
        </div>
        <div className="p-1.5 bg-white dark:bg-white/20 rounded-[50px] flex items-center gap-x-2 border border-primary">
          <button
            // disabled={router?.asPath?.startsWith("/admin")}

            className="bg-primary cursor-default text-white text-sm lg:text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Target Score
          </button>
          <p className="text-sm md:text-xl lg:text-3xl font-medium text-gray dark:text-white">
            79+{/* {score?.score}+ */}
          </p>
          <RiSettings2Fill onClick={() => setOpenTModal(true)} className="text-xl cursor-pointer text-primary" />
        </div>
        {/* <ExamCountDown
              openExamCountDown={openExamCountDown}
              setOpenExamCountDown={setOpenExamCountDown}
              setRefetch={setRefetch}
              />
              <TargetScore
              openTargetScore={openTargetScore}
              setOpenTargetScore={setOpenTargetScore}
              setRefetch={setRefetch}
            /> */}
      </div>
      <TargetScoreModal openTModal={openTModal} setOpenTModal={setOpenTModal} />
      <ExamCountModal openEModal={openEModal} setOpenEModal={setOpenEModal} />
    </>
  );
}
