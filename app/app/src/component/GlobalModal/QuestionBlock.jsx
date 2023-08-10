import ButtonFill from "@/src/components/global/ButtonFill";
import ButtonOutline from "@/src/components/global/ButtonOutline";
import React from "react";

const QuestionBlock = () => {
  return (
    <div className="flex items-center justify-between border border-primary rounded-[13px] p-3">
      <h2 className="text-xl font-medium">Bill | #7250589</h2>
      <div className="flex items-center gap-x-3">
        <ButtonFill text="Prediction" bgColor={"cream"} textColor={"gray"} />
        <ButtonFill
          text="Practiced"
          count={"(4)"}
          bgColor={"primary"}
          textColor={"gray"}
        />
        <ButtonOutline
          text="Appeared"
          count={"(12)"}
          borderColor={"primary"}
          textColor={"gray"}
        />
      </div>
    </div>
  );
};

export default QuestionBlock;
