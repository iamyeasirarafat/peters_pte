import React from "react";

export default function TodayTaskCard({ data }) {
  const { bgcolor, name, icon } = data;
  return (
    <div
      className={`flex flex-col h-97px min-w-[117px] bg-[${bgcolor}] rounded-[10px] p-[12px] justify-center items-center`}
    >
      <p className="capitalize text-[21px] pb-1">{name}</p>
      {icon}
    </div>
  );
}
