"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import SingleChoiceAnswer from "@/components/global/SingleChoiceAnswer";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../../../layout";
import { GlobalPagination } from "../../reading_test/multiple_answers";

function Page() {
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [apiData, setData] = useState({});
  const [result, setResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [givenAnswer, setGivenAnswer] = useState([]);
  // get data
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/highlight_summary/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Highlight Summary",
    api: "/highlight_summarys",
  };

  //submit data
  const onSubmit = async () => {
    //submitting data
    const result = await axios.post("/highlight_summary/answer", {
      highlight_summary: id,
      answer: selectedAnswer,
    });
    setResult(result.data);
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Highlight Correct Summary" />
      <p className="text-gray text-xs md:text-base mt-2 text-center">
        Listen to the recording and answer the multiple-choice question by
        selecting the correct response. Only one response is correct.
      </p>
      <GlobalMainContent data={apiData}>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} data={apiData} />
        {/* Multiple Choice Answer */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SingleChoiceAnswer
            setGivenAnswer={setGivenAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            register={register}
            answers={apiData?.options}
          />
          <div className="flex items-center justify-between mt-4">
            <button
              className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
              type="submit"
            >
              {result ? "Re-Submit" : "Submit"}
            </button>
            <GlobalPagination />
          </div>
        </form>
      </GlobalMainContent>
      {result && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
        />
      )}
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
      <MultipleChoiceAiModal
        single={true}
        result={result}
        myAnswer={givenAnswer}
        apiData={apiData}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
}

export default Page;
