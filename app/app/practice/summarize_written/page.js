"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import DiscursionSection from "@/src/components/global/DiscursionSection";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import SummarizeModal from "@/src/components/summarize-written/SummarizeModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const MainContent = dynamic(
  () => import("@/src/components/summarize-written/MainContent"),
  {
    ssr: false,
  }
);

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
      <AiPageHeader title="Summarize Written Text" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        Read the passage below and summarize it using one sentence. Type your
        response in the box at the bottom of the screen. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points in the
        passage.
      </p>
      {/* read aloud box  */}
      <MainContent data={data} setResult={setResult} />
      {/* result section */}
      {result && (
        <ResultSection summary result={result} setOpenModal={setOpen} />
      )}
      {result && (
        <SummarizeModal result={result} open={open} setOpen={setOpen} />
      )}
      <DiscursionSection />
    </div>
  );
};

export default Index;
