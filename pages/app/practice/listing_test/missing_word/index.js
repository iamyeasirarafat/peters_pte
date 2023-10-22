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
import DashboardLayout from "../../../layout";
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
      const { data } = await axios("/missing_word/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Missing Word",
    api: "/missing_words",
  };

  //submit data
  const onSubmit = async () => {
    //submitting data
    const result = await axios.post("/missing_word/answer", {
      missing_word: id,
      answers: [selectedAnswer],
    });
    setResult(result.data);
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Select Missing Word" />
      <p className="text-gray text-base mt-2 text-center">
        You will hear a recording. At the end of the recording the last word or
        group of words has been replaced by a beep. Select the correct option to
        complete the recording.
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
    </DashboardLayout>
  );
}

export default Page;
