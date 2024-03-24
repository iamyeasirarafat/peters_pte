"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TypingBlock from "@/components/global/TypingBlock";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import WriteDictationModal from "@/components/write_dictation/WriteDictationModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";

const Page = () => {
  const [reFetch, setReFetch] = useState(false);
  const [result, setResult] = useState(null);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/dictation/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/dictation/" + id);
      setData(data);
    };
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    if (id) {
      getData();
      // getResult();
    }
  }, [id, answerApi, reFetch]);
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
      <GlobalMainContent>
        <ListenBlock data={data} setOpen={setOpen} />
        <TypingBlock
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
          isReady={data?.id ? false : true}
        />
      </GlobalMainContent>
      {(result?.other?.[0]?.user || result?.self?.[0]?.user) && (
        <ResultSection
          summary
          result={result}
          setOpenModal={setOpenScoreModal}
        />
      )}
      <TranscriptModal open={open} setOpen={setOpen} />
      <WriteDictationModal open={openScoreModal} setOpen={setOpenScoreModal} />
    </DashboardLayout>
  );
};

export default Page;
