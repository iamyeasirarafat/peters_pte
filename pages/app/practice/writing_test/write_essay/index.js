import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TextBlock from "@/components/global/TextBlock";
import TypingBlock from "@/components/global/TypingBlock";
import WriteEssayModal from "@/components/write_essay/WriteEssayModal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";
import axios from "axios";

const Index = () => {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/write_easy/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/write_easy/" + id);
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
    title: "Write Essay",
    api: "/write_easies",
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
        <TypingBlock
          typingTime={20}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
          isReady={data?.id ? false : true}
        />
      </GlobalMainContent>
      {/* result section */}
      {(result?.others?.[0]?.user || result?.self?.[0]?.user) && (
        <ResultSection
          setAiResult={setAiResult}
          summary
          result={result}
          setOpenModal={setOpen}
        />
      )}
      <WriteEssayModal result={aiResult} open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
};

export default Index;
