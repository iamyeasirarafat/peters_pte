import React from "react";
import TabButton from "./TabButton";
import { BsFillChatLeftFill, BsPlusCircle } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import Discursion from "./Discursion";

const DiscursionSection = () => {
  return (
    <div className="space-y-2">
      {/* result */}
      <div className="flex items-center justify-between border border-primary rounded-[15px] p-2">
        {/* profile */}
        <div className="flex items-center gap-x-2">
          <p className="text-4xl w-[55px] h-[55px] flex items-center justify-center text-gray rounded-full border border-primary">
            T
          </p>
          <div className="space-y-1">
            <p className="text-base text-gray">Tushar Haider</p>
            <p className="text-base text-gray space-x-3">
              01:13 PM <span>02/07/2023</span>
            </p>
          </div>
        </div>
        {/* result score */}
        <div className="flex items-center gap-x-2">
          <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
            <p className="text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary">
              S
            </p>
            <p className="text-xl text-gray">0.00/7.00</p>
          </button>
          <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
            <p className="text-2xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-blue">
              AI
            </p>
            <p className="text-xl text-gray">Detailed Score</p>
            <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
          </button>
        </div>
        {/*  */}
        <div className="flex items-center gap-x-9">
          <BsFillChatLeftFill className="text-primary text-3xl" />
          <BiSolidLike className="text-primary text-4xl" />
        </div>
      </div>
      {/* discursion */}
      <Discursion />
    </div>
  );
};

export default DiscursionSection;
