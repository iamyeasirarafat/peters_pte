import React from "react";

export default function TodayTaskCard({ data }) {
  const { bgcolor, name, icon, time } = data;
  return (
    <div
      style={{ backgroundColor: bgcolor }}
      className={`flex flex-col h-97px min-w-[117px] rounded-[10px] w-full py-3 justify-center items-center`}
    >
      <p className="capitalize text-[21px] pb-1">{name}</p>
      {icon}
      {time && <p className="text-[36px] pt-3">{time}</p>}
    </div>
  );
}
