import React from "react";
import { BiSolidLike, BiSolidTrashAlt } from "react-icons/bi";
import { BsFillChatLeftFill, BsPlusCircle } from "react-icons/bs";

const Discursion = () => {
  return (
    <div className="border border-primary rounded-[15px] p-2 space-y-2">
      <div className="w-full flex items-center justify-between">
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
        {/* like comment */}
        <div className="flex items-center gap-x-3">
          <p className="flex items-end gap-x-2">
            <BsFillChatLeftFill className="text-primary text-3xl" />
            <span className="text-gray text-base">1</span>
          </p>
          <p className="flex items-end gap-x-2">
            <BiSolidLike className="text-primary text-3xl" />
            <span className="text-gray text-base">1</span>
          </p>
        </div>
      </div>
      {/* comment */}
      <div className="ml-20 flex items-center gap-x-40">
        {/* profile and comment input */}
        <div className="flex-grow flex items-center gap-x-2">
          <p className="text-3xl w-10 h-10 flex items-center justify-center text-gray rounded-full border border-primary">
            T
          </p>
          <div className="w-full">
            <p className="text-sm">Tushar Haider</p>
            <input
              type="text"
              className="w-full placeholder:text-[#ACACAC] placeholder:italic text-gray text-sm border border-x-0 border-t-0 border-b-primary outline-none focus:ring-transparent focus:border-primary p-0 m-0"
              placeholder="Write Text Here......."
            />
          </div>
        </div>
        {/* like delete */}
        <div className="flex items-center gap-x-4">
          <p className="flex items-end gap-x-2">
            <BiSolidLike className="text-primary text-xl" />
            <span className="text-gray text-xs">1</span>
          </p>
          <BiSolidTrashAlt className="text-primary text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Discursion;
