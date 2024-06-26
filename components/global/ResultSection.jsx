"use client";
import React, { useState } from "react";
import CommentSection from "./CommentSection";
import Score from "./Score";
import TabButton from "./TabButton";
const sectionTabButton = [
  {
    name: "My Score",
    icon: "/icons/aplus.svg",
    bgColor: "primary",
    textColor: "white",
  },
  {
    name: "Forum",
    icon: "/icons/massage.svg",
    bgColor: "primary",
    textColor: "white",
  },
  {
    name: "Community Score",
    icon: "/icons/score.svg",
    bgColor: "primary",
    textColor: "white",
  },
];
const ResultSection = ({
  result,
  setOpenModal,
  summary,
  answer_question,
  setOpenScoreModal,
  setAiResult,
  describe_image,
  repeat_sentence
}) => {
  const [pageTab, setPageTab] = useState("My Score");
  return (
    <div className="relative border border-oldPrimary rounded-[15px] mt-12 p-2 lg:py-4  lg:px-9">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-full right-5">
        {sectionTabButton?.map((button, i) => {
          return (
            <TabButton
              selected={pageTab === button?.name}
              key={i}
              src={button?.icon}
              bgColor={button?.bgColor}
              textColor={button?.textColor}
              onClick={() => {
                setPageTab(button?.name);
              }}
            >
              {button?.name}
            </TabButton>
          );
        })}
      </div>
      {/* score */}
      {pageTab === "My Score" ? (
        <div className="space-y-2">
          {result?.self?.map((item, index) => (
            <Score
              repeat_sentence={repeat_sentence}
              describe_image={describe_image}
              answer_question={answer_question}
              key={index}
              summary={summary}
              setOpenModal={setOpenModal}
              result={item}
              setOpenScoreModal={setOpenScoreModal}
              setAiResult={setAiResult}
            />
          ))}
        </div>
      ) : pageTab === "Community Score" ? (
        <div className="space-y-2">
          {result?.other?.map((item, index) => (
            <Score
              repeat_sentence={repeat_sentence}
              describe_image={describe_image}
              answer_question={answer_question}
              key={index}
              summary={summary}
              setOpenModal={setOpenModal}
              result={item}
              setOpenScoreModal={setOpenScoreModal}
              others
              setAiResult={setAiResult}
            />
          ))}
        </div>
      ) : pageTab === "Forum" ? (
        <CommentSection />
      ) : null}
    </div>
  );
};

export default ResultSection;
