"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import ListenBlock from "@/src/components/global/ListenBlock";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import TypingBlock from "@/src/components/global/TypingBlock";
import WriteDictationModal from "@/src/components/write_dictation/WriteDictationModal";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <>
      <PageHeader title="Write From Dictation" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <WriteDictationModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </>
  );
};

export default Page;
