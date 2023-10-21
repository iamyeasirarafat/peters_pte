"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SpokenTextModal from "@/components/spoken_text/SpokenTextModal";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import TypingBlock from "@/components/summarize-written/TypingBlock";
import { useState } from "react";
import DashboardLayout from "../../../layout";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <DashboardLayout>
      <PageHeader title="Summarize Spoken Text" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <TranscriptModal open={open} setOpen={setOpen} />
      <SpokenTextModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </DashboardLayout>
  );
};
export default Page;
