import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";

export default function WhiteBGButton({ title }) {
  return (
    <>
      <button className="flex justify-center items-center h-11 px-3 bg-white rounded-[30px] text-black">
        <span className="text-[18px] font-normal mr-2.5">{title}</span>
        <BsArrowRightCircle size={20} />
      </button>
    </>
  );
}
