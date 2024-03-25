import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import SingleChoiceAnswer from "@/components/global/SingleChoiceAnswer";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
const answers = [
  {
    index: "A",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise",
  },
  {
    index: "B",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise",
  },
  {
    index: "C",
    answer:
      "Listen to the recording and answer the question by selecting all the question color fact on global earth",
  },
  {
    index: "D",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise",
  },
];
function Page() {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  // get data
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/multi_choice/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/multi_choice/" + id);
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
  }, [id, reFetch, answerApi]);

  //sideModal Data
  const SideModalData = {
    title: "Single Answers",
    api: "/multi_choices/single-answer",
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Multiple Choice, Single Answers" />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the multiple-choice question by
        selecting the correct response. Only one response is correct.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} data={data} />
        {/* Multiple Choice Answer */}
        <SingleChoiceAnswer
          isReady={data?.id ? false : true}
          typingTime={5}
          answers={data?.options || []}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
        />
      </GlobalMainContent>
      {(result?.self?.[0]?.user || result?.other?.[0]?.user) && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
          setAiResult={setAiResult}
        />
      )}
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
      <MultipleChoiceAiModal
        outOf={1}
        result={aiResult}
        data={data}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
}

export default Page;
