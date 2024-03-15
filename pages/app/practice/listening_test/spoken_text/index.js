"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import TypingBlock from "@/components/global/TypingBlock";
import SpokenTextModal from "@/components/spoken_text/SpokenTextModal";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import SideModal from "@/components/global/SideModal";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import { useRouter } from "next/router";
import axios from "axios";

const Page = () => {
  const [result, setResult] = useState({});
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/spoken/summarize/" + id);
      setData(data);
    };
    id && getData();
  }, [id]);
  // sideModal Data
  const SideModalData = {
    title: "Summarize Spoken Text",
    api: "/spoken/summarizes",
  };
  return (
    <DashboardLayout>
      <SideModal data={SideModalData} />
      <PageHeader title="Summarize Spoken Text" />
      {/* main content */}
      <GlobalMainContent>
        <ListenBlock setOpen={setOpen} data={data} />
        <TypingBlock setResult={setResult} api="/spoken/summarizes/answer" />
      </GlobalMainContent>
      <ResultSection setOpenModal={setOpenScoreModal} />
      <TranscriptModal open={open} setOpen={setOpen} />
      <SpokenTextModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </DashboardLayout>
  );
};
export default Page;