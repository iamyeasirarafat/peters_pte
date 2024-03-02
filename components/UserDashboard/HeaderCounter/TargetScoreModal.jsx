import React from "react";
import ReusableModal from "../../global/ReusableModal";
import { GrClose } from "react-icons/gr";
import { FiCheckSquare } from "react-icons/fi";

export default function TargetScoreModal({ openTModal, setOpenTModal }) {
  return (
    <ReusableModal open={openTModal} setOpen={setOpenTModal}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">Tushar Ahmed</p>
          <p className="text-white text-2xl ">Target Score</p>
          {/* close modal */}
          <button
            onClick={() => setOpenTModal(false)}
            className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center   mr-1"
          >
            <GrClose className="text-gray text-xl" />
          </button>
        </div>
        {/* Modal content */}
        <div className="flex flex-col gap-5 p-5">
          {/* score */}
          <div className="w-full border border-[#F2B277] bg-[#FFF4EB] p-2 rounded-[10px]">
            <div className="flex gap-2 bg-white justify-between items-center rounded-[10px] p-3">
              <p className="w-full bg-gray rounded-[10px] place-items-center py-1 px-2 text-white text-4xl">
                35+
              </p>
              <p className="w-full bg-gray rounded-[10px] place-items-center py-1 px-2 text-white text-4xl">
                55+
              </p>
              <p className="w-full bg-[#FF8412] rounded-[10px] place-items-center py-1 px-2 text-white text-4xl">
                75+
              </p>
              <p className="w-full bg-gray rounded-[10px] place-items-center py-1 px-2 text-white text-4xl">
                90
              </p>
            </div>
          </div>
          {/* Your Response */}
          <div className="flex justify-end">
            <div className=" w-48 flex gap-2 border border-[#F2B277] bg-[#F4D1B1] rounded-[10px] justify-center items-center py-2 px-2">
              <p className="text-[#616161] text-[16px] font-normal">
                Update Target Score
              </p>
              <FiCheckSquare className="text-[#616161]" size={20} />
            </div>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
}
