import React from "react";
import TabButton from "./TabButton";
import Score from "./Score";

const ResultSection = ({
  result,
  setOpenModal,
  summary,
  setOpenScoreModal,
}) => {
  return (
    <div className="relative border border-primary rounded-[15px] mt-12 p-5">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
        <TabButton
          src={"/icons/aplus.svg"}
          iconWidth={21}
          iconHeight={23}
          bgColor={"blue"}
          textColor={"white"}
        >
          My Score
        </TabButton>
        <TabButton
          src={"/icons/massage.svg"}
          iconWidth={22}
          iconHeight={22}
          bgColor={"cream"}
          textColor={"gray"}
        >
          Forum
        </TabButton>
        <TabButton
          src={"/icons/score.svg"}
          iconWidth={24}
          iconHeight={24}
          bgColor={"primary"}
          textColor={"gray"}
        >
          Community Score
        </TabButton>
      </div>
      {/* score */}
      <Score
        summary={summary}
        setOpenModal={setOpenModal}
        result={result}
        setOpenScoreModal={setOpenScoreModal}
      />
    </div>
  );
};

export default ResultSection;
