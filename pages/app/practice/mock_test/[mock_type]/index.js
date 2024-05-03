import React, { useEffect } from "react";
import DashboardLayout from "../../../layout";
import MockTestLayout from "../../../../../components/UserMockTest/layout";
import Read_write_blanks from "../../../../../components/UserMockTest/Read_write_blanks";
import Missing_words from "../../../../../components/UserMockTest/Missing_words";
import Multiple_answers from "../../../../../components/UserMockTest/Multiple_answers";
import Summarize_written from "../../../../../components/UserMockTest/Summarize_written";
import Re_Order from "../../../../../components/UserMockTest/Re_Order";
import Record_Missing_words from "../../../../../components/UserMockTest/Record_Missing_words";
import Read_aloud from "../../../../../components/UserMockTest/Read_aloud";
import Repeat_sentence from "../../../../../components/UserMockTest/Repeat_sentence";
import Describe_image from "../../../../../components/UserMockTest/Describe_image";
import Retell_lecture from "../../../../../components/UserMockTest/Retell_lecture";
import Answer_short_question from "../../../../../components/UserMockTest/Answer_short_question";
import Write_essay from "../../../../../components/UserMockTest/Write_essay";
import Multiple_choice_single from "../../../../../components/UserMockTest/Multiple_choice_single";
import Highlight_correct_summary from "../../../../../components/UserMockTest/Highlight_correct_summary";
import Highlight_incorrect_words from "../../../../../components/UserMockTest/Highlight_incorrect_words";
import ReusableModal from "@/components/global/ReusableModal";
import { CiClock2 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Assigned_Practice from "../../../../../components/UserMockTest/Assigned_Practice";

function Index() {
  return (
    <DashboardLayout>
      {/* <MockTestForm /> */}
      <Assigned_Practice />
    </DashboardLayout>
  );
}

export default Index;

const MockTestForm = () => {
  const [qustionList, setQuestionList] = React.useState([
    { id: 1, name: "Read Aloud", questionType: "read_aloud" },
    { id: 2, name: "Repeat Sentence", questionType: "repeat_sentence" },
    { id: 3, name: "Describe Image", questionType: "describe_image" },
    { id: 4, name: "Retell Lecture", questionType: "retell_lecture" },
    {
      id: 5,
      name: "Answer Short Question",
      questionType: "answer_short_question",
    },
    { id: 6, name: "Summarize Written", questionType: "summarize_written" },
    { id: 7, name: "Write Essay", questionType: "write_essay" },
    { id: 8, name: "Read Write Blanks", questionType: "read_write_blanks" },
    { id: 9, name: "Multiple Answers", questionType: "multiple_answers" },
    { id: 10, name: "Re Order", questionType: "re_order" },
    { id: 11, name: "Missing Words", questionType: "missing_words" },
    {
      id: 12,
      name: "Record Missing Words",
      questionType: "record_missing_words",
    },
    {
      id: 13,
      name: "Multiple Choice Single",
      questionType: "multiple_choice_single",
    },
    {
      id: 14,
      name: "Highlight Correct Summary",
      questionType: "highlight_correct_summary",
    },
    {
      id: 15,
      name: "Highlight Incorrect Words",
      questionType: "highlight_incorrect_words",
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isLastQuestion, setIsLastQuestion] = React.useState(false);
  const [submitModal, setSubmitModal] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleStart = () => {
    // set current question from question list if start button is clicked then set id on current question
    setCurrentQuestion(qustionList[0].id);
  };

  const handleNext = () => {
    // if current question is last question then set isLastQuestion to true
    if (currentQuestion !== qustionList.length) {
      setIsLastQuestion(false);
      setCurrentQuestion(qustionList[currentQuestion].id);
    }
  };

  const handlePrev = () => {
    // if current question is 0 then set isLastQuestion to false and set current question present question
    if (currentQuestion !== 0) {
      setIsLastQuestion(false);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useEffect(() => {
    if (currentQuestion === qustionList.length) {
      setIsLastQuestion(true);
    }
    //set progress bar
    setProgress((currentQuestion / qustionList.length) * 100);
  }, [currentQuestion]);

  const handleFinish = () => {
    setSubmitModal(true);
  };

  // if current question is 0 then show starting page
  if (currentQuestion === 0) {
    return <MockTestStartingPage handleStart={handleStart} />;
    // return <Assigned_Practice />
  }

  return (
    <>
      {/* <Assigned_Practice /> */}
      <MockLayouts
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleFinish={handleFinish}
        progress={progress}
        isLastQuestion={isLastQuestion}
        currentQuestion={currentQuestion}
      />

      {submitModal && (
        <SubmitModal open={submitModal} setOpen={setSubmitModal} />
      )}
    </>
  );
};

const MockTestStartingPage = ({ handleStart }) => {
  return (
    <div className="flex flex-col m-5">
      <h2 className="text-2xl font-medium text-gray-800 mb-4">
        Score Test D (2 hour)
      </h2>
      <div className="w-full bg-gray/20 h-[1px] my-5" />

      <div className="h-[calc(100vh-300px)] py-2 overflow-y-auto">
        <p>
          Please click <b>Start</b> when you are ready to begin the activity.
        </p>
      </div>
      <div className="w-full bg-gray/20 h-[1px] my-5" />
      <div className=" flex justify-center">
        <button
          onClick={handleStart}
          className="text-center bg-cyan-700 hover:bg-cyan-800 flex items-center gap-2 text-white px-6 py-2 rounded"
        >
          Start
        </button>
      </div>
    </div>
  );
};

const SubmitModal = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <>
      <ReusableModal open={open} setOpen={setOpen} className="w-full">
        <div className="bg-white shadow-md w-[400px] p-4 rounded-md">
          {/* header */}
          <div className="flex justify-between gap-2 ">
            <div>
              <h3 className=" text-2xl font-semibold">Submit activity</h3>
              <span className="flex items-center gap-2 text-gray text-sm">
                <CiClock2 />
                20:45 / 33:00
              </span>
            </div>
            <FaTimes
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="w-full h-[1px] bg-gray/30 my-4" />

          {/* container */}
          <div className="text-left  text-gray text-sm">
            All qustions have been attempted. Do you want to submit the activity
            now?
          </div>

          <div className="w-full h-[1px] bg-gray/30 my-4" />

          {/* button container */}
          <div className="flex  gap-2 ">
            <button className="bg-gray/20 hover:bg-gray/30 flex items-center gap-2 text-white px-4 py-2 rounded">
              No
            </button>
            <button
              onClick={() => {
                setOpen(false);
                router.push("/app/practice/mock_test/report");
              }}
              className="bg-cyan-700 hover:bg-cyan-800 flex items-center gap-2 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </ReusableModal>
    </>
  );
};

const MockLayouts = ({
  handleNext,
  handlePrev,
  handleFinish,
  progress,
  isLastQuestion,
  currentQuestion,
}) => {
  return (
    <MockTestLayout
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleFinish={handleFinish}
      progress={progress}
      isLastQuestion={isLastQuestion}
    >
      {/* if current question is 1 then show read aloud component */}
      {currentQuestion === 1 && <Read_aloud />}
      {/* if current question is 2 then show repeat sentence component */}
      {currentQuestion === 2 && <Repeat_sentence />}
      {/* if current question is 3 then show describe image component */}
      {currentQuestion === 3 && <Describe_image />}
      {/* if current question is 4 then show retell lecture component */}
      {currentQuestion === 4 && <Retell_lecture />}
      {/* if current question is 5 then show answer short question component */}
      {currentQuestion === 5 && <Answer_short_question />}
      {/* if current question is 6 then show summarize written component */}
      {currentQuestion === 6 && <Summarize_written />}
      {/* if current question is 7 then show write essay component */}
      {currentQuestion === 7 && <Write_essay />}
      {/* if current question is 8 then show read write blanks component */}
      {currentQuestion === 8 && <Read_write_blanks />}
      {/* if current question is 9 then show multiple answers component */}
      {currentQuestion === 9 && <Multiple_answers />}
      {/* if current question is 10 then show re order component */}
      {currentQuestion === 10 && <Re_Order />}
      {/* if current question is 11 then show missing words component */}
      {currentQuestion === 11 && <Missing_words />}
      {/* if current question is 12 then show record missing words component */}
      {currentQuestion === 12 && <Record_Missing_words />}
      {/* if current question is 13 then show multiple choice single component */}
      {currentQuestion === 13 && <Multiple_choice_single />}
      {/* if current question is 14 then show highlight correct summary component */}
      {currentQuestion === 14 && <Highlight_correct_summary />}
      {/* if current question is 15 then show highlight incorrect words component */}
      {currentQuestion === 15 && <Highlight_incorrect_words />}
    </MockTestLayout>
  );
};
