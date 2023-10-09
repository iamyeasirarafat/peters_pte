import Image from "next/image";
import React from "react";
import { IoInformationSharp } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";
import { PiChartLineUpBold } from "react-icons/pi";

const PageHeader = ({ title }) => {
  return (
    <div className="py-2 px-5 border border-primary rounded-[15px] mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-gray text-base md:text-3xl">{title}</h1>
        <div className="flex items-center gap-x-2">
          <button className="bg-primary rounded-full w-7 h-7 md:w-10 md:h-10 flex items-center justify-center cursor-pointer">
            <PiChartLineUpBold className="text-white text-base md:text-2xl" />
          </button>
          <button className="bg-primary rounded-full w-7 h-7 md:w-10 md:h-10 flex items-center justify-center cursor-pointer">
            <GoDeviceCameraVideo className="text-white text-base md:text-2xl" />
          </button>
          <button className="bg-primary rounded-full w-7 h-7 md:w-10 md:h-10 flex items-center justify-center cursor-pointer">
            <IoInformationSharp className="text-white text-base md:text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
