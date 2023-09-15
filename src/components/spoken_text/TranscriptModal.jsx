import React from "react";
import ReusableModal from "../global/ReusableModal";
import { GrClose } from "react-icons/gr";

const TranscriptModal = ({ open, setOpen }) => {
  return (
    <ReusableModal open={open} setOpen={setOpen} className="w-6/12">
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-xl">#7250589</p>
          <p className="text-white text-xl">TRANSCRIPT</p>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full bg-white flex items-center outline-none justify-center"
          >
            <GrClose className="text-gray text-base" />
          </button>
        </div>
        {/* Modal content */}
        <div className="p-4">
          <div className="bg-white border border-primary rounded-[15px] p-3">
            <p className="text-xl text-start">
              A report on inequality in the UK said last week that girls had
              better educational results than boys at 16, went to university in
              greater numbers and achieved better degrees once they got there.
              More women now have higher education qualifications than men in
              every age group up to age 44, the report said.
            </p>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default TranscriptModal;
