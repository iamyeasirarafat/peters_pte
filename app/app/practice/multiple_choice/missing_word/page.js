"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import SingleChoiceAnswer from "@/src/components/global/SingleChoiceAnswer";
import TextBlock from "@/src/components/global/TextBlock";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalPagination } from "../multiple_answers/page";
import ResultSection from "@/src/components/global/ResultSection";
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
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PageHeader title="Select Missing Word" setOpen={setOpenModal} />
      <p className="text-gray text-base mt-2 text-center">
        You will hear a recording. At the end of the recording the last word or
        group of words has been replaced by a beep. Select the correct option to
        complete the recording.
      </p>
      <GlobalMainContent>
        {/* text block */}
        <TextBlock />
        {/* Multiple Choice Answer */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SingleChoiceAnswer register={register} answers={answers} />
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
      <ResultSection setOpenModal={setOpenModal} />
    </div>
  );
}

export default Page;
