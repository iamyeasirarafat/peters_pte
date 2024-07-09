import GlobalMainContent from "@/components/global/GlobalMainContent";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import SingleChoiceAnswer from "@/components/global/SingleChoiceAnswer";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextBlock from "../../../../../components/global/TextBlock";
import DashboardLayout from "../../../layout";

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
  const answerApi = `/multi_choice_reading/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/multi_choice/reading/" + id);
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
    api: "/multi_choices/reading/single-answer",
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader
        title="Multiple Choice, Single Answers"
        tips_link="https://peterspte.com/reading-test/reading-multiple-choice-single-answers-guide-tips/"
      />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the multiple-choice question by
        selecting the correct response. Only one response is correct.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock highlight={true} readAloud={false} data={data} />
        {/* Multiple Choice Answer */}
        <SingleChoiceAnswer
          text_content={data?.text_content}
          isReady={data?.id ? false : true}
          typingTime={5}
          answers={data?.options || []}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
        />
      </GlobalMainContent>
      <ResultSection
        summary
        setOpenModal={setOpenScoreModal}
        setOpenScoreModal={setOpenScoreModal}
        result={result}
        setAiResult={setAiResult}
      />

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
