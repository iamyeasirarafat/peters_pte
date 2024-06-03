import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function Summarize_written({ question, aid }) {
  const router = useRouter();
  const mockTestId = router?.query?.testId;
  const { register, handleSubmit, watch } = useForm();
  const summitButton = useRef(null);

  console.log("question", question);

  useEffect(() => {
    const layout_button = document.getElementById("submit_button");
    layout_button.addEventListener("click", () => {
      summitButton?.current?.click();
    });
  }, []);

  const onSubmit = async (data) => {
    const finalData = {
      id: question.id,
      type: question?.type,
      answer: data.answer,
    };
    console.log("data ", finalData);
    try {
      await axios.post(
        `/mocktest/writting/${mockTestId}/answer/${aid}`,
        finalData
      );
    } catch (error) {
      console.log(error);
    }
  };

  //audio controls and auto play related function
  const audioRef = useRef(null);
  useEffect(() => {
    if (question?.audio) {
      audioRef.current.play();
    }
  }, [question]);
  return (
    <div>
      <p className="font-semibold mb-6">{question?.title}</p>
      {question?.audio ? (
        <audio ref={audioRef} controls>
          <source
            src={`${process.env.NEXT_PUBLIC_API_URL}${question?.audio}`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>{question?.content || question?.question}</p>
      )}

      <div className="flex flex-col text-zinc-700 my-5">
        <div className="flex justify-end items-center bg-gray/20  rounded-t-sm">
          {/* <div className="flex gap-6 pl-5 py-1 ">
            <button>Copy</button>
            <button>Cut</button>
            <button>Paste</button>
          </div> */}
          <div className="pr-5 py-1">
            {watch("answer") ? watch("answer").trim().split(" ").length : 0}{" "}
            Word(s)
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("answer", { required: true })}
            className="border border-gray-400 rounded-b-sm w-full"
            cols="30"
            rows="5"
            placeholder={
              question?.type === "summarize"
                ? "write summary here"
                : "write essay here"
            }
          ></textarea>
          <button className="hidden" ref={summitButton} />
        </form>
      </div>
    </div>
  );
}
