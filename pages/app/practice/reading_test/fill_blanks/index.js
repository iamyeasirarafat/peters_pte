"use client";
import FillBlanksModal from "@/components/fill_blanks/FillBlanksModal";
import FillBlanksBlock from "@/components/global/FillBlanksBlock";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <>
      <PageHeader title="Reading Fill in the Blanks" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} />
        <FillBlanksBlock />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <FillBlanksModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </>
  );
};

export default Page;
