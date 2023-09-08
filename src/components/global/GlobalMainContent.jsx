import Image from "next/image";
import React from "react";

const GlobalMainContent = ({ children, data }) => {
  return (
    <div className="relative border border-primary rounded-[15px] mt-12">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
        {data?.prediction && (
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Prediction
          </button>
        )}

        <button className="text-gray py-1 px-3 rounded-t-md text-base bg-primary">
          Practiced ({data?.practiced})
        </button>
        <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
          Appeared (12)
        </button>
      </div>
      <div className="bg-secondary rounded-t-[15px] py-2 pl-8 pr-5 flex items-center justify-between">
        <p className="text-[#ACACAC] text-xl">
          {data?.title} | Q No. #{data?.id}
        </p>
        <div className="flex items-center gap-x-5">
          <div className="w-[28px] h-[29px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/icons/page.svg"
                alt="grow icon"
                fill
              />
            </div>
          </div>
          <div className="w-[17px] h-[28px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/icons/bookmark.svg"
                alt="grow icon"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
};

export default GlobalMainContent;
