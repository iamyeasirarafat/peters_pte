"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import ListenBlock from "@/src/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/src/components/global/MultipleChoiceAiModal";
import MultipleChoiceAnswer from "@/src/components/global/MultipleChoiceAnswer";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import TranscriptModal from "@/src/components/spoken_text/TranscriptModal";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
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
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PageHeader
        title="Multiple Choice, Multiple Answers"
        setOpen={setOpenModal}
      />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the question by selecting all the
        correct responses. You will need to select more than one response.
      </p>
      <GlobalMainContent>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} />
        {/* Multiple Choice Answer */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultipleChoiceAnswer register={register} answers={answers} />
          <div className="flex items-center justify-between mt-4">
            <button
              className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
              type="submit"
            >
              Submit
            </button>
            <GlobalPagination />
          </div>
        </form>
      </GlobalMainContent>
      <ResultSection
        summary
        setOpenModal={setOpenScoreModal}
        setOpenScoreModal={setOpenScoreModal}
      />
      <MultipleChoiceAiModal
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
    </div>
  );
}

export default Page;

export const GlobalPagination = () => {
  return (
    <div className="flex items-center gap-x-2">
      <button className="w-[56px] h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
        <div className="w-[32px] h-[25px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src="/icons/suppel.svg"
              alt="grow icon"
              fill
            />
          </div>
        </div>
      </button>
      <div className="bg-secondary rounded-[30px] px-4 py-[5px] flex items-center gap-x-2">
        <IoIosArrowBack className="text-lg text-gray cursor-pointer" />
        <select
          className="py-2 bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
          name=""
          id=""
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p className="text-sm text-gray font-medium">of</p>
        <p className="text-sm text-gray font-medium">1127</p>
        <IoIosArrowBack className="text-lg text-gray cursor-pointer rotate-180" />
      </div>
    </div>
  );
};
