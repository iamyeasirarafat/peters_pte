"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import TypingBlock from "@/components/global/TypingBlock";
import WriteDictationModal from "@/components/write_dictation/WriteDictationModal";
import { useState } from "react";
import DashboardLayout from "../../../layout";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <DashboardLayout>
      <PageHeader title="Write From Dictation" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <TypingBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <WriteDictationModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </DashboardLayout>
  );
};

export default Page;
