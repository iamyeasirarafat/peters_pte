import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import GameScore from "./GameScore";

function SpellingBee() {
  const [loading, setLoading] = useState(false);
  const [rightAnswer, setRightAnswer] = useState({ id: null, answer: "" });
  const [question, setQuestion] = useState({});
  const [aid, setAid] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [tryAgain, setTryAgain] = useState(false);

  useEffect(() => {
    // fetch question
    const getQuestion = async () => {
      try {
        const res = await axios.get(
          `/games/spelling_bee/answer${aid && `/${aid}`}`
        );
        setQuestion(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, [tryAgain]);
  // set question answers id
  useEffect(() => {
    setAid(question?.aid ? question.aid : "");
  }, [question?.aid]);

  // handel submit
  const handelSubmit = async () => {
    setLoading(true);
    const answerData = {
      id: question?.question?.id,
      answer: rightAnswer?.answer,
    };
    try {
      const res = await axios.post(
        `/games/spelling_bee/answer/${aid}`,
        answerData
      );
      if (res?.data?.game_over) {
        toast.error(res.data.message || "Your answer is not correct try again");
        setAid("");
        setIsCorrect(false);
        setTryAgain(!tryAgain);
        setRightAnswer({ id: null, answer: "" });
      } else {
        toast.success(res.data.message || "Congratulations");
        setRightAnswer({ id: null, answer: "" });
        setIsCorrect(true);
        setTryAgain(!tryAgain);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setTryAgain(!tryAgain);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout dashboard>
      <div className="pt-2.5 pb-15">
        <div className="w-full bg-[url('/mini_game/spelling_bee.png')] bg-cover bg-center bg-no-repeat pt-32 pb-20 h-full flex items-center justify-center">
          <div className="w-[60%]">
            <p className="text-white text-center text-xl font-semibold">
              {isCorrect
                ? "Choose the correct spelling is Correct?"
                : "Wrong Answer: Game Over"}
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {question?.question?.options?.map((item, index) => (
                <label
                  key={index}
                  className={`group ${
                    !isCorrect && "opacity-50 cursor-auto"
                  } relative inline-flex items-center gap-2 select-none cursor-pointer tap-highlight-color bg-white  py-4 px-4`}
                >
                  <input
                    disabled={!isCorrect}
                    onChange={() =>
                      setRightAnswer({
                        id: index,
                        answer: item,
                      })
                    }
                    checked={rightAnswer?.id === index}
                    className="border-2 border-green-500 text-green-500 ring-transparent focus:ring-transparent w-5 h-5 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-lg font-medium">{item}</p>
                </label>
              ))}
            </div>
            {isCorrect ? (
              <button
                onClick={handelSubmit}
                disabled={loading}
                className="py-2 px-3 disabled:opacity-70 bg-primary hover:bg-secondary font-semibold duration-200 text-white hover:text-black flex items-center justify-center gap-x-2 w-full mt-5"
              >
                {loading && <LoaderIcon />} Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  setAid("");
                  setIsCorrect(true);
                  setTryAgain(!tryAgain);
                }}
                className="py-2 px-3 bg-secondary hover:bg-secondary font-semibold duration-200 text-black flex items-center justify-center gap-x-2 w-full mt-5"
              >
                Try again
              </button>
            )}
            <GameScore data={question} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SpellingBee;
