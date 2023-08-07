"use client";
import Image from "next/image";
import React, { useState } from "react";
import NavigateButton from "@/src/components/global/NavigateButton";
import TeaxtBlock from "@/src/components/read-aloud/TeaxtBlock";
import RecordBlock from "@/src/components/read-aloud/RecordBlock";
import Pagination from "@/src/components/read-aloud/Pagination";
import Score from "@/src/components/read-aloud/Score";
import ScoreModal from "@/src/components/global/ScoreModal";
import ReusableModal from "@/src/components/global/ReusableModal";

const Page = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      {/* Read Aloud top */}
      <div className="py-2 px-5 border border-primary rounded-[15px] mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-gray text-3xl">Read Aloud</h1>
          <div className="flex items-center gap-x-2">
            <button className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
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
                    alt="grow icon"
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
                    alt="grow icon"
                    fill
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <p className="text-gray text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      {/* read aloud box  */}
      <div className="relative border border-primary rounded-[15px] mt-12 pb-4">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Prediction
          </button>
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-[#F4D1B1]">
            Practiced (1)
          </button>
          <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
            Appeared (12)
          </button>
        </div>
        <div className="bg-secondary rounded-t-[15px] py-2 pl-8 pr-5 flex items-center justify-between">
          <p className="text-[#ACACAC] text-xl">Bill | Q No. #7250589</p>
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
        {/* text block */}
        <TeaxtBlock />
        {/* recording Block */}
        <RecordBlock />
        {/* paginaion */}
        <Pagination />
      </div>
      <div className="relative border border-primary rounded-[15px] mt-12 py-4 px-8">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
          <NavigateButton
            src={"/icons/aplus.svg"}
            iconWidth={21}
            iconHeight={23}
            bgColor={"blue"}
            textColor={"white"}
          >
            My Score
          </NavigateButton>
          <NavigateButton
            src={"/icons/masage.svg"}
            iconWidth={22}
            iconHeight={22}
            bgColor={"cream"}
            textColor={"gray"}
          >
            Forum
          </NavigateButton>
          <NavigateButton
            src={"/icons/score.svg"}
            iconWidth={24}
            iconHeight={24}
            bgColor={"[#F4D1B1]"}
            textColor={"gray"}
          >
            Community Score
          </NavigateButton>
        </div>
        {/* score */}
        <Score />
      </div>
      <ReusableModal open={open} setOpen={setOpen}>
        <h1>hello modal</h1>
      </ReusableModal>
    </div>
  );
};

export default Page;
