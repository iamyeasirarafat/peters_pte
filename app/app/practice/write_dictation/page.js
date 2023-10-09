"use client";
import DiscursionSection from "@/src/components/global/DiscursionSection";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import ListenBlock from "@/src/components/global/ListenBlock";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SpokenTextModal from "@/src/components/spoken_text/SpokenTextModal";
import TypingBlock from "@/src/components/summarize-written/TypingBlock";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <>
      <PageHeader title="Summarize Spoken Text" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <DiscursionSection />
      <SpokenTextModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </>
  );
};

export default Page;