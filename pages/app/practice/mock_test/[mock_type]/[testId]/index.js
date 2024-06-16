import ReusableModal from "@/components/global/ReusableModal";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Answer_short_question from "../../../../../../components/UserMockTest/Answer_short_question";
import Describe_image from "../../../../../../components/UserMockTest/Describe_image";
import Highlight_correct_summary from "../../../../../../components/UserMockTest/Highlight_correct_summary";
import Highlight_incorrect_words from "../../../../../../components/UserMockTest/Highlight_incorrect_words";
import Missing_words from "../../../../../../components/UserMockTest/Missing_words";
import Multiple_answers from "../../../../../../components/UserMockTest/Multiple_answers";
import Multiple_choice_single from "../../../../../../components/UserMockTest/Multiple_choice_single";
import Re_Order from "../../../../../../components/UserMockTest/Re_Order";
import Read_aloud from "../../../../../../components/UserMockTest/Read_aloud";
import Read_write_blanks from "../../../../../../components/UserMockTest/Read_write_blanks";
import Record_Missing_words from "../../../../../../components/UserMockTest/Record_Missing_words";
import Repeat_sentence from "../../../../../../components/UserMockTest/Repeat_sentence";
import Retell_lecture from "../../../../../../components/UserMockTest/Retell_lecture";
import Summarize_written from "../../../../../../components/UserMockTest/Summarize_written";
import Fill_blanks from "../../../../../../components/UserMockTest/fill_blanks";
import MockTestLayout from "../../../../../../components/UserMockTest/layout";
import DashboardLayout from "../../../../layout";

function Index() {
  return (
    <DashboardLayout>
      <MockTestForm />
    </DashboardLayout>
  );
}

export default Index;
const MockTestForm = () => {
  const [allResults, setAllResults] = useState([]);
  const [questionList, setQuestionList] = useState({});
  const router = useRouter();
  const { mock_type, testId } = router?.query;

  console.log("questionList", questionList);

  useEffect(() => {
    const getQuestionData = async () => {
      try {
        const res = await axios.get(
          `/mocktest/${mock_type?.split("_")?.[0]}/${testId}/answer`
        );
        setQuestionList(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    router?.isReady && getQuestionData();
  }, [router]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    setCurrentQuestion(0);
  };

  const handleNext = () => {
    if (currentQuestion === questionList?.question?.length) {
      setIsLastQuestion(true);
    } else setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsLastQuestion(false);
    }
  };

  useEffect(() => {
    if (currentQuestion === questionList?.question?.length) {
      setIsLastQuestion(true);
    }
    //set progress bar
    setProgress(((currentQuestion + 1) / questionList?.question?.length) * 100);
  }, [currentQuestion]);

  const handleFinish = () => {
    setSubmitModal(true);
  };

  // if current question is 0 then show starting page
  if (currentQuestion === null) {
    return (
      <MockTestStartingPage
        handleStart={handleStart}
        questionList={questionList}
      />
    );
  }

  return (
    <>
      <MockLayouts
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleFinish={handleFinish}
        progress={progress}
        isLastQuestion={isLastQuestion}
        currentQuestion={currentQuestion}
        questionList={questionList}
      />

      {submitModal && (
        <SubmitModal
          open={submitModal}
          setOpen={setSubmitModal}
          mock_type={mock_type}
          testId={testId}
          questionList={questionList}
          setAllResults={setAllResults}
        />
      )}
    </>
  );
};

const MockTestStartingPage = ({ handleStart, questionList }) => {
  return (
    <div className="flex flex-col m-5">
      <h2 className="text-2xl font-medium text-gray-800 mb-4">
        Score {questionList?.title} (
        {parseFloat(questionList?.time / 60).toFixed(2)} hour)
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

const SubmitModal = ({
  open,
  setOpen,
  mock_type,
  testId,
  questionList,
  setAllResults,
}) => {
  const handelComplete = async () => {
    try {
      const res = await axios(
        `/mocktest/${mock_type?.split("_")?.[0]}/${testId}/answer/${
          questionList?.aid
        }?complete=true`
      );
      setOpen(false);
      router.push("/app/practice/mock_test");
      setAllResults(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
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
            <button
              onClick={() => setOpen(false)}
              className="bg-gray/20 hover:bg-gray/30 flex items-center gap-2 text-white px-4 py-2 rounded"
            >
              No
            </button>
            <button
              onClick={handelComplete}
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
  questionList,
}) => {
  console.log("questionList", questionList);
  return (
    <MockTestLayout
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleFinish={handleFinish}
      progress={progress}
      isLastQuestion={isLastQuestion}
      currentQuestion={currentQuestion}
      questionList={questionList}
    >
      {questionList?.question?.[currentQuestion]?.type === "read_aloud" && (
        <Read_aloud />
      )}

      {questionList?.question?.[currentQuestion]?.type ===
        "repeat_sentence" && <Repeat_sentence />}

      {questionList?.question?.[currentQuestion]?.type === "describe_image" && (
        <Describe_image />
      )}
      {/* if current question is 4 then show retell lecture component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "retell_sentence" && <Retell_lecture />}
      {/* if current question is 5 then show answer short question component */}
      {questionList?.question?.[currentQuestion]?.type === "short_question" && (
        <Answer_short_question />
      )}
      {/* if current question is 6 then show summarize written component */}
      {(questionList?.question?.[currentQuestion]?.type === "summarize" ||
        questionList?.question?.[currentQuestion]?.type === "write_essay" ||
        questionList?.question?.[currentQuestion]?.type ===
          "summarize_spoken" ||
        questionList?.question?.[currentQuestion]?.type === "dictation") && (
        <Summarize_written
          question={questionList?.question?.[currentQuestion]}
          aid={questionList?.aid}
        />
      )}
      {/* if current question is 8 then show read write blanks component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "reading_writting_blank" && (
        <Read_write_blanks
          question={questionList?.question?.[currentQuestion]}
          aid={questionList?.aid}
        />
      )}
      {/* if current question is 8 then show read write blanks component */}
      {questionList?.question?.[currentQuestion]?.type === "blank" && (
        <Fill_blanks
          question={questionList?.question?.[currentQuestion]}
          aid={questionList?.aid}
        />
      )}
      {/* if current question is 9 then show multiple answers component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "multi_choice_reading_multi_answer" && <Multiple_answers />}
      {/* if current question is 10 then show re order component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "reorder_paragraph" && <Re_Order />}
      {/* if current question is 11 then show missing words component */}
      {questionList?.question?.[currentQuestion]?.type === "missing_word" && (
        <Missing_words />
      )}
      {/* if current question is 12 then show record missing words component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "highlight_incorrect_word" && <Record_Missing_words />}
      {/* if current question is 13 then show multiple choice single component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "multi_choice_reading_single_answer" && <Multiple_choice_single />}
      {/* if current question is 14 then show highlight correct summary component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "highlight_summary" && <Highlight_correct_summary />}
      {/* if current question is 15 then show highlight incorrect words component */}
      {questionList?.question?.[currentQuestion]?.type ===
        "highlight_incorrect_word" && <Highlight_incorrect_words />}
    </MockTestLayout>
  );
};
