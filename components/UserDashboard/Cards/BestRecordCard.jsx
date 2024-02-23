import React from "react";

export default function BestRecordCard({ data }) {
  const { title, value } = data;

  return (
    <div className="flex flex-col border border-white rounded-[10px] p-2 justify-center items-center w-[117px]">
      <p className="text-[16px] font-normal pb-1 capitalize">{title}</p>
      <p className="text-[36px]">{value == null ? "--" : value}</p>
    </div>
  );
}
