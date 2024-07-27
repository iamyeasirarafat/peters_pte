import React from "react";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";

const QuestionNavigation = ({ questionType, setQuestionType }) => {
  return (
    <div className="flex items-center gap-x-4 mt-4 pl-6">
      {/* All Question */}
      <div
        onClick={() => setQuestionType("All")}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {questionType === "All" ? (
          <RiCheckboxBlankCircleFill className="text-sm text-blue" />
        ) : (
          <RiCheckboxBlankCircleLine className="text-sm text-black" />
        )}
        <p className="text-sm md:text-lg">All Question</p>
      </div>
      {/* Practiced */}
      <div
        onClick={() => setQuestionType("Practiced")}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {questionType === "Practiced" ? (
          <RiCheckboxBlankCircleFill className="text-sm text-blue" />
        ) : (
          <RiCheckboxBlankCircleLine className="text-sm text-black" />
        )}
        <p>Practiced</p>
      </div>
      {/* Not Practiced */}
      <div
        onClick={() => setQuestionType("Not_Practiced")}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {questionType === "Not_Practiced" ? (
          <RiCheckboxBlankCircleFill className="text-sm text-blue" />
        ) : (
          <RiCheckboxBlankCircleLine className="text-sm text-black" />
        )}
        <p>Not Practiced</p>
      </div>
    </div>
  );
};

export default QuestionNavigation;
