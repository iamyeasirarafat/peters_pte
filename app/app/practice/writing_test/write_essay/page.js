"use client";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import TextBlock from "@/src/components/global/TextBlock";
import TypingBlock from "@/src/components/global/TypingBlock";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import WriteEssayModal from "@/src/components/write_essay/WriteEssayModal";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const params = useSearchParams();
  const id = params.get("que_no");

  // sideModal Data
  const SideModalData = {
    title: "Summarize Text",
    api: "/summarizes",
  };
  return (
    <div>
      {/* Toast component  */}
      <Toaster />

      {/* sideModal Component  */}
      <SideModal data={SideModalData} />
      <PageHeader title="Write Essay" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        You will have 20 minutes to plan, write and revise an essay about the
        topic below. Your response will be judged on how well you develop a
        position, organize your ideas, present supporting details, and control
        the elements of standard written English. You should write 200-300
        words.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* type Block */}
        <TypingBlock setResult={setResult} />
      </GlobalMainContent>
      {/* result section */}
      {!result && (
        <ResultSection summary result={result} setOpenModal={setOpen} />
      )}
      {!result && (
        <WriteEssayModal result={result} open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Index;
