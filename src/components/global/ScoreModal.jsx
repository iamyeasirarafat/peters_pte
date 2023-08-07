import React from "react";

const ScoreModal = ({ open, setOpen }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffd5] flex items-center justify-center z-50">
      <div className="border border-primary rounded-2xl w-8/12 h-full">
        <div className="bg-primary rounded-t-2xl flex items-center justify-between">
          <p className="text-white text-2xl">#7250589</p>
          <p className="text-white text-2xl">AI DEATILED SCORE</p>
          <div className="">
            <p>Target Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;
