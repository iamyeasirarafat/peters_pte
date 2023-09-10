"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import ListenBlock from "@/src/components/global/ListenBlock";
import TypingBlock from "@/src/components/summarize-written/TypingBlock";
import React, { useState } from "react";
import ResultSection from "@/src/components/global/ResultSection";
import TranscriptModal from "@/src/components/spoken_text/TranscriptModal";
import SpokenTextModal from "@/src/components/spoken_text/SpokenTextModal";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  console.log(open, "open");
  return (
    <>
      <PageHeader title="Summarize Spoken Text" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <TranscriptModal open={open} setOpen={setOpen} />
      <SpokenTextModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </>
  );
};

export default Page;
