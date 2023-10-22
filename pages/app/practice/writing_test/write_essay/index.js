import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TextBlock from "@/components/global/TextBlock";
import TypingBlock from "@/components/global/TypingBlock";
import WriteEssayModal from "@/components/write_essay/WriteEssayModal";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;

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
      <PageHeader title="Write Essay" setOpen={setOpen} />
      <p className="text-gray text-base mt-2 text-center">
        You will have 20 minutes to plan, write and revise an essay about the
        topic below. Your response will be judged on how well you develop a
        position, organize your ideas, present supporting details, and control
        the elements of standard written English. You should write 200-300
        words.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* type Block */}
        <TypingBlock setResult={setResult} />
      </GlobalMainContent>
      {/* result section */}
      {!result && (
        <ResultSection summary result={result} setOpenModal={setOpen} />
      )}
      {!result && (
        <WriteEssayModal result={result} open={open} setOpen={setOpen} />
      )}
    </DashboardLayout>
  );
};

export default Index;
