"use client";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import SummarizeModal from "@/src/components/summarize-written/SummarizeModal";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import TextBlock from "@/src/components/global/TextBlock";
import TypingBlock from "@/src/components/global/TypingBlock";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const params = useSearchParams();
  const id = params.get("que_no");
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
    <div>
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
    </div>
  );
};

export default Index;
