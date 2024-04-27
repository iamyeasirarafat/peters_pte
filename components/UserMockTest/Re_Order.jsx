import React, { useState } from "react";
import Image from "next/image";
export default function Re_Order() {
  const qData = [
    {
      index: "A",
      test: "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by",
    },
    {
      index: "B",
      test: "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by",
    },
    {
      index: "C",
      test: "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by",
    },
    {
      index: "D",
      test: "Listen to the recording and answer the question by selecting all the tortoise and Listen to the recording and answer the question by",
    },
  ];
  const [answerData, setAnswerData] = useState([]);
  const [questionData, setQuestionData] = useState(qData);
  const sortingValue = [...questionData].sort((a, b) =>
    a.index.localeCompare(b.index)
  );
  return (
    <div>
      <p className="font-semibold mb-6">
        The text boxes in the left panel have been placed in random order. Restore the original order by dragging the text boxes from the left panel to the right panel.
      </p>
      <ReOrderBlock
        data={sortingValue}
        answerData={answerData}
        setAnswerData={setAnswerData}
        setQuestionData={setQuestionData}
      />
    </div>
  );
}



const ReOrderBlock = ({ data, answerData, setAnswerData, setQuestionData }) => {
  return (
    <div className="grid grid-cols-11">
      {/* question */}
      <div className="col-span-5 border border-primary rounded-[15px] w-full p-2.5">
        <p className="text-center text-lg font-medium">Source</p>
        <div className="space-y-2">
          {data?.map((item, index) => (
            <SentenceBlock
              from="q"
              key={index}
              data={item}
              setAnswerData={setAnswerData}
              setQuestionData={setQuestionData}
            />
          ))}
        </div>
      </div>
      {/* icon */}
      <div className="col-span-1 h-full flex items-center justify-center">
        <div className="h-[55px] w-[55px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              fill
              alt="icons"
              src="/icons/reorderArrow.svg"
            />
          </div>
        </div>
      </div>
      {/* answer */}
      <div className="col-span-5 border border-primary rounded-[15px] w-full p-2.5">
        <p className="text-center text-lg font-medium">Target</p>
        <div className="space-y-2">
          {answerData?.map((item, index) => (
            <SentenceBlock
              from="a"
              key={index}
              data={item}
              setAnswerData={setAnswerData}
              setQuestionData={setQuestionData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const SentenceBlock = ({ data, from, setAnswerData, setQuestionData }) => {
  return (
    <div
      onClick={() => {
        if (from === "q") {
          setAnswerData((prev) => [...prev, data]);
          setQuestionData((prev) =>
            prev.filter((item) => item?.index !== data?.index)
          );
        } else {
          setAnswerData((prev) =>
            prev.filter((item) => item?.index !== data?.index)
          );
          setQuestionData((prev) => [...prev, data]);
        }
      }}
      className="border border-primary rounded-[10px] p-2.5 w-full flex items-center gap-x-5 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out"
    >
      <div className="w-9 h-9 rounded-md bg-primary text-white flex items-center justify-center flex-shrink-0">
        {data?.index}
      </div>
      <p className="text-gray text-base leading-[18px]">{data?.test}</p>
    </div>
  );
};