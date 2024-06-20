import React from "react";

import BestRecordCard from "../Cards/BestRecordCard";
import WhiteBGButton from "../Buttons/WhiteBGButton";

export default function PTEAccurateMock() {
  const data = [
    {
      title: "speaking test",
      value: 85,
    },
    {
      title: "listening test",
      value: 45,
    },
    {
      title: "writing test",
      value: null,
    },
    {
      title: "reading test",
      value: 68,
    },
  ];

  return (
    <div className="flex mb-20 flex-col md:flex-row justify-between bg-[url('/images/ptemocktest.png')] w-full bg-clip-content md:bg-cover md:h-[213px] rounded-[15px] my-[25px] text-white">
      {/* first element */}
      <div className="flex flex-col justify-center w-full border-b border-b-white md:border-b-0 md:border-r-2 md:border-r-white py-5">
        <h2 className="text-[26px] lg:text-[36px] font-normal mx-auto md:ml-7 lg:ml-10 mb-5">
          PTE accurate Mock Test
        </h2>
        <div className="flex gap-3 mx-auto md:mx-5 lg:ml-10">
          <WhiteBGButton title={"Full Mock test"} />
          <WhiteBGButton title={"Sectional Mocktest"} />
        </div>
      </div>

      {/* second element */}
      <div className="pl-3 md:pl-0 items-center w-full border-t border-l-white md:border-t-0 md:border-l-2 md:border-r-white pb-10">
        <h2 className="text-[21px] pt-3 ml-10">Your Best Record Till Now</h2>
        <div className="ml-10 flex gap-2 mt-2">
          <div className="flex flex-col gap-2">
            {/* record card */}
            <BestRecordCard key={data[0].title} data={data[0]} />
            <BestRecordCard key={data[1].title} data={data[1]} />
          </div>
          <div className="flex flex-col gap-2">
            <BestRecordCard key={data[2].title} data={data[2]} />
            <BestRecordCard key={data[3].title} data={data[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
