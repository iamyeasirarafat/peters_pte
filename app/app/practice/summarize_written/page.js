"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import { useState } from "react";
import ResultSection from "@/src/components/global/ResultSection";
import SummarizeModal from "@/src/components/summarize-written/SummarizeModal";
import MainContent from "@/src/components/summarize-written/MainContent";

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
      <MainContent />
      {/* result section */}
      <ResultSection result={result} setOpenModal={setOpenModal} />
      <SummarizeModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Index;
