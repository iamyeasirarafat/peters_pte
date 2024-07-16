import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TypingBlock from "@/components/global/TypingBlock";
import SpokenTextModal from "@/components/spoken_text/SpokenTextModal";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";

const Page = () => {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [result, setResult] = useState({});
  const [open, setOpen] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/summarize_spoken/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/spoken/summarize/" + id);
      setData(data);
    };
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    if (id) {
      getData();
      getResult();
    }
  }, [id, answerApi, reFetch]);
  // sideModal Data
  const SideModalData = {
    title: "Summarize Spoken Text",
    api: "/spoken/summarizes",
  };
  return (
    <DashboardLayout>
      <SideModal data={SideModalData} />
      <PageHeader
        title="Summarize Spoken Text"
        tips_link="https://peterspte.com/listening-test/mastering-the-summarize-spoken-text-guide-tips/"
      />
      <p className="text-gray text-base mt-2 text-center">
        You will hear a short lecture. Write a summary for a fellow student who
        was not present at the lecture. You should write 50 - 70 words. You have
        10 minutes to finish this task
      </p>
      {/* main content */}
      <GlobalMainContent data={data}>
        <ListenBlock listening setOpen={setOpen} data={data} />
        <TypingBlock
          result={result}
          setReFetch={setReFetch}
          typingTime={10}
          api={answerApi}
          isReady={data?.id ? false : true}
        />
      </GlobalMainContent>

      <ResultSection
        summary
        result={result}
        setAiResult={setAiResult}
        setOpenModal={setOpenScoreModal}
      />

      <TranscriptModal open={open} setOpen={setOpen} />
      {openScoreModal && (
        <SpokenTextModal
          result={aiResult}
          open={openScoreModal}
          setOpen={setOpenScoreModal}
        />
      )}
    </DashboardLayout>
  );
};
export default Page;
