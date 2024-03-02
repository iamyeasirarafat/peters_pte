import React from "react";
import { CiBookmark, CiFileOn } from "react-icons/ci";

const GlobalMainContent = ({ children, data }) => {
  return (
    <div className="relative border border-primary rounded-[15px] mt-12">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-full right-5">
        {data?.prediction && (
          <button className="text-gray py-1 px-3 rounded-t text-base bg-cream">
            Prediction
          </button>
        )}

        <button className="text-gray py-1 px-3 rounded-t text-base bg-primary">
          Practiced {data?.practiced ? `(${data?.practiced})` : ""}
        </button>
        <button className="text-white py-1 px-3 rounded-t text-base bg-blue">
          Appeared (12)
        </button>
      </div>
      <div className="bg-secondary rounded-t-[15px] py-1 px-4 md:px-6 flex items-center justify-between">
        <p className="text-[#ACACAC] text-base md:text-xl">
          {data?.title} | Q No. #{data?.id}
        </p>
        <div className="flex items-center gap-x-2">
          <CiFileOn className="text-primary text-3xl" />
          <CiBookmark className="text-3xl text-primary" />
        </div>
      </div>
      <div className="px-4 md:px-6 py-2 space-y-5">{children}</div>
    </div>
  );
};

export default GlobalMainContent;
