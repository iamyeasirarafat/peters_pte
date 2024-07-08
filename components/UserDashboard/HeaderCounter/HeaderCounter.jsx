import React, { useEffect, useState } from "react";
import { RiSettings2Fill } from "react-icons/ri";

// for modal

import axios from "axios";
import ExamCountModal from "./ExamCountModal";
import TargetScoreModal from "./TargetScoreModal";

export default function HeaderCounter() {
  const [openTModal, setOpenTModal] = useState(false);
  const [openEModal, setOpenEModal] = useState(false);
  const [examCountdown, setExamCountdown] = useState("");
  const [targetScore, setTargetScore] = useState(null)
  const [refetch, setRefetch] = useState(false)
  //get data from api
  useEffect(() => {
    const getExamCountdown = async () => {
      try {
        const res = await axios.get('/exam_countdown')
        setExamCountdown(res?.data?.exam_date)
      } catch (err) {
        console.log(err)
      }
    }
    const getTargetScore = async () => {
      try {
        const res = await axios.get('/target_score')
        setTargetScore(res?.data?.score)
      } catch (err) {
        console.log(err)
      }
    }
    getTargetScore()
    getExamCountdown()
  }, [refetch])
  //cowntdown functionality
  const [countdown, setCountdown] = useState("00d 00h 00m 00s");
  useEffect(() => {
    if (!examCountdown) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(examCountdown) - now;

      if (diff <= 0) {
        setCountdown("0d 00h 00m 00s");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [examCountdown]);
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-1.5 mt-2.5">
        <div className="p-1.5 bg-white dark:bg-white/20 rounded-[50px] flex items-center gap-x-2 border border-primary">
          <button
            // disabled={router?.asPath?.startsWith("/admin")}

            className="bg-primary cursor-default text-white text-sm lg:text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Exam Countdown
          </button>
          <div className="text-sm lg:text-xl font-medium text-gray dark:text-white">
            {/* {examDate?.exam_date ? (
                  <Countdown targetDate={examDate?.exam_date} />
                ) : (
                  <p>Not set Exam date</p>
                )} */}
            {countdown}
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
            {targetScore}+{/* {score?.score}+ */}
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
      <TargetScoreModal setRefetch={setRefetch} apiScore={targetScore} openTModal={openTModal} setOpenTModal={setOpenTModal} />
      <ExamCountModal setRefetch={setRefetch} apiCountdown={countdown} openEModal={openEModal} setOpenEModal={setOpenEModal} />
    </>
  );
}
