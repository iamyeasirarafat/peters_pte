import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";

export default function WhiteBGButton({ title }) {
  return (
    <>
      <button className="flex justify-center items-center px-4 py-1 bg-white rounded-[30px] text-black">
        <span className="text-[11px] md:text-[14px] lg:text-[18px] font-normal mr-1.5 lg:mr-2.5">{title}</span>
        <BsArrowRightCircle className="h-5 w-5 md:h-7 md:w-7" />
      </button>
    </>
  );
}
