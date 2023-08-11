"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import Score from "@/src/components/global/Score";
import TabButton from "@/src/components/global/TabButton";
import TextBlock from "@/src/components/read-aloud/TextBlock";
import TypingBlock from "@/src/components/summarize-written/TypingBlock";
import Image from "next/image";
import React, { useState } from "react";

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AiPageHeader title="Summarize Written Text" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        Read the passage below and summarize it using one sentence. Type your
        response in the box at the bottom of the screen. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points in the
        passage.
      </p>
      {/* read aloud box  */}
      <div className="relative border border-primary rounded-[15px] mt-12 pb-4">
        {/* tab button */}
        <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Prediction
          </button>
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-primary">
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
        <TextBlock />
        {/* type Block */}
        <TypingBlock />
        <div className="relative border border-primary rounded-[15px] mt-12 py-4 px-8">
          {/* tab button */}
          <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
            <TabButton
              src={"/icons/aplus.svg"}
              iconWidth={21}
              iconHeight={23}
              bgColor={"blue"}
              textColor={"white"}
            >
              My Score
            </TabButton>
            <TabButton
              src={"/icons/massage.svg"}
              iconWidth={22}
              iconHeight={22}
              bgColor={"cream"}
              textColor={"gray"}
            >
              Forum
            </TabButton>
            <TabButton
              src={"/icons/score.svg"}
              iconWidth={24}
              iconHeight={24}
              bgColor={"primary"}
              textColor={"gray"}
            >
              Community Score
            </TabButton>
          </div>
          {/* score */}
          <Score />
        </div>
      </div>
    </div>
  );
};

export default Index;
