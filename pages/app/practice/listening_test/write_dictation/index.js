"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import TypingBlock from "@/components/global/TypingBlock";
import WriteDictationModal from "@/components/write_dictation/WriteDictationModal";
import SideModal from "@/components/global/SideModal";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import { useRouter } from "next/router";
import axios from "axios";

const Page = () => {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/dictation/" + id);
      setData(data);
    };
    id && getData();
  }, [id]);
  // sideModal Data
  const SideModalData = {
    title: "Write From Dictation",
    api: "/dictations",
  };
  return (
    <DashboardLayout>
      <SideModal data={SideModalData} />
      <PageHeader title="Write From Dictation" />
      {/* main content */}
      {data && (
        <GlobalMainContent>
          <ListenBlock setOpen={setOpen} data={data} />
          <TypingBlock setResult={setResult} api="/dictation/answer" />
        </GlobalMainContent>
      )}
      {result && <ResultSection setOpenModal={setOpenScoreModal} />}
      <WriteDictationModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </DashboardLayout>
  );
};

export default Page;
