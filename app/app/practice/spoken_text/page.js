"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import ListenBlock from "@/src/components/global/ListenBlock";
import TypingBlock from "@/src/components/summarize-written/TypingBlock";
import React, { useState } from "react";
import GlobalModal from "@/src/components/global/GlobalModal";
import ResultSection from "@/src/components/global/ResultSection";

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-8/12 mx-auto py-20">
      <PageHeader title="Summarize Spoken Text" setOpen={setOpen} />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection />
      <PageModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Page;
const PageModal = ({ open, setOpen }) => {
  return (
    <GlobalModal open={open} setOpen={setOpen} className="w-6/12">
      <div className="h-[500px] w-full">
        <h1>Hello Modal</h1>
      </div>
    </GlobalModal>
  );
};
