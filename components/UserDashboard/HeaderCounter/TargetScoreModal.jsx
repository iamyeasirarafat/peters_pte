import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckSquare } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import ReusableModal from "../../global/ReusableModal";

export default function TargetScoreModal({ apiScore, openTModal, setOpenTModal, setRefetch }) {
  const user = useSelector((state) => state?.user?.user);
  const score = [
    "35",
    "55",
    "75",
    "90"
  ]
  const [selectedScore, setSelectedScore] = useState(null)

  //set score from api
  useEffect(() => {
    if (!apiScore) return
    setSelectedScore(JSON.stringify(apiScore))
  }, [])

  const handleUpdateScore = () => {
    if (selectedScore) {
      axios
        .post("/target_score", {
          score: selectedScore
        })
        .then((res) => {
          toast.success("Target score updated successfully");
          setOpenTModal(false)
          setRefetch((prev) => !prev)
        }
        );
    }
  }
  return (
    <ReusableModal open={openTModal} setOpen={setOpenTModal}>
      <div className="bg-white border border-primary rounded-[15px] w-auto md:w-[700px] lg:w-[1000px] xl:w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl capitalize">{user?.full_name}</p>
          <p className="text-white text-2xl ">Target Score</p>
          {/* close modal */}
          <button
            onClick={() => setOpenTModal(false)}
            className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center mr-1"
          >
            <GrClose className="text-gray text-xl" />
          </button>
        </div>
        {/* Modal content */}
        <div className="flex flex-col gap-5 p-5">
          {/* score */}
          <div className="w-full border border-oldPrimary bg-[#FFF4EB] p-2 rounded-[10px]">
            <div className="flex flex-col md:flex-row gap-2 bg-white justify-between items-center rounded-[10px] p-3">
              {
                score.map((score, index) => (
                  <p
                    onClick={() => setSelectedScore(score)}
                    key={index}
                    className={`${selectedScore === score ? "bg-oldPrimary" : "bg-gray"} w-full  rounded-[10px] place-items-center py-1 cursor-pointer px-2 text-white text-4xl`}
                  >
                    {score}+
                  </p>
                ))
              }

            </div>
          </div>
          {/* Your Response */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateScore}
              className=" w-48 flex gap-2 border border-[#F2B277] bg-[#F4D1B1] rounded-[10px] justify-center items-center py-2 px-2">
              <p className="text-[#616161] text-[16px] font-normal">
                Update Target Score
              </p>
              <FiCheckSquare className="text-[#616161]" size={20} />
            </button>
          </div>
        </div>
      </div>
    </ReusableModal>
  )
}
