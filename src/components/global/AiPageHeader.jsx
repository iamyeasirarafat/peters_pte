import Image from "next/image";
import React from "react";

const AiPageHeader = ({ title, setOpen }) => {
  return (
    <div className="py-2 px-5 border border-primary rounded-[15px] mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-gray text-3xl">{title}</h1>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <div className="w-[27px] h-[14px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/grow.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </button>
          <button className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
            <div className="w-[27px] h-[17px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/video.svg"
                  alt="video icon"
                  fill
                />
              </div>
            </div>
          </button>
          <button className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
            <div className="w-[8px] h-[21px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/i.svg"
                  alt="i icon"
                  fill
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiPageHeader;
