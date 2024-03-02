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
      <div className="flex items-center justify-between gap-1.5 mt-2.5">
        <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary ">
          <button
            // disabled={router?.asPath?.startsWith("/admin")}
            onClick={() => setOpenEModal(true)}
            className="bg-gold text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Exam Count Down
          </button>
          <div className="text-xl font-medium text-gray dark:text-white">
            {/* {examDate?.exam_date ? (
                  <Countdown targetDate={examDate?.exam_date} />
                ) : (
                  <p>Not set Exam date</p>
                )} */}
            20d 03h 03m 52s
          </div>
          <RiSettings2Fill className="text-xl text-cream" />
        </div>
        <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary">
          <button
            // disabled={router?.asPath?.startsWith("/admin")}
            onClick={() => setOpenTModal(true)}
            className="bg-cream text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Target Score
          </button>
          <p className="text-3xl font-medium text-gray dark:text-white">
            79+{/* {score?.score}+ */}
          </p>
          <RiSettings2Fill className="text-xl text-cream" />
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
