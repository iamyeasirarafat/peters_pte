"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TextBlock from "@/components/global/TextBlock";
import SummarizeModal from "@/components/summarize-written/SummarizeModal";
import TypingBlock from "@/components/summarize-written/TypingBlock";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/summarize/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  // sideModal Data
  const SideModalData = {
    title: "Summarize Text",
    api: "/summarizes",
  };
  return (
    <DashboardLayout>
      {/* Toast component  */}
      <Toaster />

      {/* sideModal Component  */}
      <SideModal data={SideModalData} />
      <PageHeader title="Summarize Written Text" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        Read the passage below and summarize it using one sentence. Type your
        response in the box at the bottom of the screen. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points in the
        passage.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* type Block */}
        <TypingBlock setResult={setResult} />
      </GlobalMainContent>
      {/* result section */}
      {result && (
        <ResultSection summary result={result} setOpenModal={setOpen} />
      )}
      {result && (
        <SummarizeModal result={result} open={open} setOpen={setOpen} />
      )}
      {/*<DiscursionSection /> */}
    </DashboardLayout>
  );
};

export default Index;
