import Link from "next/link";
import React from "react";
import { IoInformationSharp } from "react-icons/io5";
import { PiChartLineUpBold } from "react-icons/pi";

const PageHeader = ({ title, tips_link }) => {
  return (
    <div className="py-2 px-5  bg-primary rounded-[15px] mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-cabin font-semibold  text-3xl">
          {title}
        </h1>
        <div className="flex items-center gap-x-2">
          <Link
            href="/app#progress"
            className="bg-white rounded-full md:w-11 md:h-11 w-11 h-11 flex items-center justify-center cursor-pointer"
          >
            <PiChartLineUpBold className="text-primary  text-2xl" />
          </Link>
          <Link
            href={tips_link || "#"}
            target="_blank"
            className="bg-white rounded-full  w-11 h-11 flex items-center justify-center cursor-pointer"
          >
            <IoInformationSharp className="text-primary  text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
