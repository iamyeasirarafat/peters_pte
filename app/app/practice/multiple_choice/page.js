"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import MultipleChoiceAnswer from "@/src/components/global/MultipleChoiceAnswer";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import TextBlock from "@/src/components/global/TextBlock";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function Page() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <PageHeader
        title="Multiple Choice, Multiple Answers"
        setOpen={setOpenModal}
      />
      <GlobalMainContent>
        {/* text block */}
        <TextBlock />
        {/* Multiple Choice Answer */}
        <MultipleChoiceAnswer />
        <div className="flex items-center justify-between">
          <button
            className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
            type="submit"
          >
            Submit
          </button>
          <GlobalPagination />
        </div>
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenModal} />
    </div>
  );
}

export default Page;

export const GlobalPagination = () => {
  return (
    <div className="flex items-center gap-x-2">
      <button className="w-[56px] h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
        <div className="w-[32px] h-[25px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src="/icons/suppel.svg"
              alt="grow icon"
              fill
            />
          </div>
        </div>
      </button>
      <div className="bg-secondary rounded-[30px] px-4 py-[5px] flex items-center gap-x-2">
        <IoIosArrowBack className="text-lg text-gray cursor-pointer" />
        <select
          className="py-2 bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
          name=""
          id=""
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p className="text-sm text-gray font-medium">of</p>
        <p className="text-sm text-gray font-medium">1127</p>
        <IoIosArrowBack className="text-lg text-gray cursor-pointer rotate-180" />
      </div>
    </div>
  );
};
