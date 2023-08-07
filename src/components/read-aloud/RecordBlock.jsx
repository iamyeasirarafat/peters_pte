import Image from "next/image";
import React from "react";

const RecordBlock = () => {
  return (
    <div className="border border-primary rounded-[15px] mt-3 ml-8 mr-5 p-4 flex flex-col items-center justify-center">
      <button className="w-[70px] h-[70px] bg-primary rounded-full flex items-center justify-center">
        <div className="w-[28px] h-[44px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src="/icons/mic.svg"
              alt="grow icon"
              fill
            />
          </div>
        </div>
      </button>
      <p className="text-base text-gray">Click To Start</p>
      <p className="text-sm text-accent">
        <i>Beginning in 13 Sec...</i>
      </p>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <p className="text-base text-gray">0:00</p>
          <p className="text-base text-gray">0:35</p>
        </div>
        <div className="relative bg-secondary w-full h-2 rounded-[13px]">
          <div className="w-[30%] h-full absolute left-0 top-0 bg-primary rounded-[13px]"></div>
        </div>
      </div>
    </div>
  );
};

export default RecordBlock;
