import React from "react";
import { IoInformationSharp } from "react-icons/io5";
import { PiChartLineUpBold } from "react-icons/pi";

const PageHeader = ({ title, tips_link }) => {
  return (
    <div className="py-2 px-5 border border-primary rounded-[15px] mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-gray md:text-base text-3xl">{title}</h1>
        <div className="flex items-center gap-x-2">
          <button className="bg-primary rounded-full md:w-7 md:h-7 w-10 h-10 flex items-center justify-center cursor-pointer">
            <PiChartLineUpBold className="text-white md:text-base text-2xl" />
          </button>
          <a
            href={tips_link || "#"}
            className="bg-primary rounded-full md:w-7 md:h-7 w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <IoInformationSharp className="text-white md:text-base text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
