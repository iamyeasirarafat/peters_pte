import React from "react";
import ReusableModal from "../../global/ReusableModal";
import { GrClose } from "react-icons/gr";
import { FiCheckSquare } from "react-icons/fi";
import Calendar from "../Calendar/PTE_Calendar";

export default function ExamCountModal({ openEModal, setOpenEModal }) {
  return (
    <ReusableModal open={openEModal} setOpen={setOpenEModal}>
      <div className="bg-white border border-primary rounded-[15px] w-96 md:w-[700px] lg:w-[1000px] xl:w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">Tushar Ahmed</p>
          <p className="text-white text-2xl ">Exam Countdown</p>
          {/* close modal */}
          <button
            onClick={() => setOpenEModal(false)}
            className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center   mr-1"
          >
            <GrClose className="text-gray text-xl" />
          </button>
        </div>
        {/* Modal content */}
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <Calendar />
            </div>
            {/* Time count */}
            <div className="w-full md:w-1/2 h-16 border border-[#F2B277] bg-[#FFF4EB] p-2 rounded-[10px]">
              <p className="text-[30px] md:text-[36px] text-[#616161] bg-white justify-between text-center rounded-[10px] p-3">
                20d 03h 03m 52s
              </p>
            </div>
          </div>
          {/* Your Response */}
          <div className="flex justify-end">
            <div className=" w-48 flex gap-2 border border-[#F2B277] bg-[#F4D1B1] rounded-[10px] justify-center items-center py-2 px-2">
              <p className="text-[#616161] text-[16px] font-normal">
                Update Exam Date
              </p>
              <FiCheckSquare className="text-[#616161]" size={20} />
            </div>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
}
