"use client";
import FillBlanksModal from "@/src/components/fill_blanks/FillBlanksModal";
import FillBlanksBlock from "@/src/components/global/FillBlanksBlock";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import ListenBlock from "@/src/components/global/ListenBlock";
import PageHeader from "@/src/components/global/PageHeader";
import Pagination from "@/src/components/global/Pagination";
import ResultSection from "@/src/components/global/ResultSection";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  return (
    <>
      <PageHeader title="Reading & Writing Fill in the blanks" />
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
