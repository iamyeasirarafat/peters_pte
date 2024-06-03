import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import MultipleChoiceAnswer from "@/components/global/MultipleChoiceAnswer";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";

function Page() {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);

  // get data
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/multi_choice/${id}/answer`;
  // get data
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
    title: "Multiple Answers",
    api: "/multi_choices",
  };

  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Multiple Choice, Multiple Answers" />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the question by selecting all the
        correct responses. You will need to select more than one response.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} data={data} />
        {/* Multiple Choice Answer */}
        <MultipleChoiceAnswer
          text_content={data?.text_content}
          setReFetch={setReFetch}
          answers={data?.options}
          isReady={data?.id ? false : true}
          typingTime={5}
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
      <MultipleChoiceAiModal
        outOf={aiResult?.scores?.score_details?.right_options?.length || 0}
        result={aiResult}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
    </DashboardLayout>
  );
}

export default Page;
