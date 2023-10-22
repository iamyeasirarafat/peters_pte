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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalPagination } from "../../reading_test/multiple_answers";
const answers = [
  {
    serial: "A",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise",
  },
  {
    serial: "B",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise",
  },
  {
    serial: "C",
    answer:
      "Listen to the recording and answer the question by selecting all the question color fact on global earth",
  },
  {
    serial: "D",
    answer:
      "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by selecting all the tortoise",
  },
  {
    serial: "E",
    answer:
      "Listen to the recording and answer the question by selecting all the question color fact on global earth",
  },
];
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
      const { data } = await axios("/multi_choice/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Single Answer",
    api: "/multi_choices/single-answer",
  };

  //submit data
  const onSubmit = async () => {
    //submitting data
    const result = await axios.post("/multi_choice/answer", {
      multi_choice: id,
      answers: [selectedAnswer],
    });
    setResult(result.data);
  };
  return (
    <div>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Multiple Choice, Single Answers" />
      <p className="text-gray text-base mt-2 text-center">
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
        result={result}
        myAnswer={givenAnswer}
        apiData={apiData}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </div>
  );
}

export default Page;
