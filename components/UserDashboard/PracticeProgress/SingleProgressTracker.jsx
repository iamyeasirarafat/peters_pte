import React from "react";
import CircularProgressWidget from "../Cards/CircularProgressWidget";

export default function ListeningProgressTracker({ data, type }) {
  return (
    <div className="bg-white rounded-[10px] h-full p-3">
      {/* cards  */}
      <h3 className="font-medium text-[21px] text-[#949494] text-center my-2.5">
        {type}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-2.5 px-3">
        {/* card 1  */}
        {data?.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 px-3 w-auto min-h-[74px] gap-2 capitalize border border-primary rounded-[10px]`}
          >
            <p
              className={`text-[#949494] leading-[16px] text-[15px] font-normal`}
            >
              {item?.title}
            </p>
            <p className="text-[24px] font-semibold text-[#949494]">
              {item?.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
