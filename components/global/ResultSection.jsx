"use client";
import React, { useState } from "react";
import TabButton from "./TabButton";
import Score from "./Score";
import CommentSection from "./CommentSection";
const sectionTabButton = [
  {
    name: "My Score",
    icon: "/icons/aplus.svg",
    bgColor: "blue",
    textColor: "white",
  },
  {
    name: "Forum",
    icon: "/icons/massage.svg",
    bgColor: "cream",
    textColor: "gray",
  },
  {
    name: "Community Score",
    icon: "/icons/score.svg",
    bgColor: "primary",
    textColor: "gray",
  },
];
const ResultSection = ({
  result,
  setOpenModal,
  summary,
  setOpenScoreModal,
}) => {
  const [pageTab, setPageTab] = useState("My Score");
  return (
    <div className="relative border border-primary rounded-[15px] mt-12 p-2 lg:p-5">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-full right-5">
        {sectionTabButton?.map((button, i) => {
          return (
            <TabButton
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
              key={index}
              summary={summary}
              setOpenModal={setOpenModal}
              result={item}
              setOpenScoreModal={setOpenScoreModal}
            />
          ))}
        </div>
      ) : pageTab === "Community Score" ? (
        <div className="space-y-2">
          {result?.others?.map((item, index) => (
            <Score
              key={index}
              summary={summary}
              setOpenModal={setOpenModal}
              result={item}
              setOpenScoreModal={setOpenScoreModal}
              others
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
