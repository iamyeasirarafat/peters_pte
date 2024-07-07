import React from "react";

const LineProgressWidget = ({ data }) => {
  const { title, value, percentage, color } = data || {};
  return (
    <div className="w-full md:w-auto flex flex-col items-start px-5 py-3 md:px-3 lg:py-3 lg:px-5 md:py-3 gap-2 capitalize rounded-[10px]">
      <p>{title?.replace(/_/g, " ")}</p>
      <span style={{ color: color }} className={`text-3xl font-semibold`}>
        {value}
      </span>
      {/* line progress bar */}
      <div className="w-full h-[8px] bg-[#FFF4EB] rounded-[10px]">
        <div
          style={{ background: color }}
          className={`w-[${percentage}] h-full  rounded-[10px]`}
        />
      </div>
    </div>
  );
};

export default LineProgressWidget;
