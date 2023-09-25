"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SingleChoiceAnswer from "@/src/components/global/SingleChoiceAnswer";
import TextBlock from "@/src/components/global/TextBlock";
import React, { useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PageHeader
        title="Multiple Choice, Single Answers"
        setOpen={setOpenModal}
      />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the multiple-choice question by
        selecting the correct response. Only one response is correct.
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
