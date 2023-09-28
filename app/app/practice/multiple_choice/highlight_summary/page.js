"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import ListenBlock from "@/src/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/src/components/global/MultipleChoiceAiModal";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import SingleChoiceAnswer from "@/src/components/global/SingleChoiceAnswer";
import TranscriptModal from "@/src/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalPagination } from "../multiple_answers/page";
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
  console.log(result);
  // get data
  const params = useSearchParams();
  const id = params.get("que_no");
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
  const onSubmit = async (data) => {
    // filtering answer data
    const ans = Object.keys(data).find((i) => data[i] === true);
    //submitting data
    const result = await axios.post("highlight_summary/answer", {
      highlight_summary: id,
      answer: ans,
    });
    console.log(result);
    setResult(result.data);
  };
  return (
    <div>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Highlight Correct Summary" />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the multiple-choice question by
        selecting the correct response. Only one response is correct.
      </p>
      <GlobalMainContent data={apiData}>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} data={apiData} />
        {/* Multiple Choice Answer */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SingleChoiceAnswer register={register} answers={apiData?.options} />
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
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
        />
      )}
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
      <MultipleChoiceAiModal
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </div>
  );
}

export default Page;
