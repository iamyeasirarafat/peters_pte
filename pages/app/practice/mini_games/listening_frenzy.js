import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import GameScore from "./GameScore";
import AudioVisualizer from "../../../../components/AudioVisualizer";

function ListeningFrenzy() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [answerText, setAnswerText] = useState("");
  const [gameScore, setGameScore] = useState({});
  const [aid, setAid] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [tryAgain, setTryAgain] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // fetch question
    const getQuestion = async () => {
      try {
        const res = await axios.get(
          `/games/listening_frenzy/answer${aid && `/${aid}`}`
        );
        setQuestion(res?.data);
        setGameScore({ current: res?.data?.score, max: res?.data?.max_score });
        setAnswerText("");
      } catch (error) {
        console.log(error);
      }
    };
    isCorrect && getQuestion();
  }, [tryAgain]);
  // set question answers id
  useEffect(() => {
    setAid(question?.aid ? question.aid : "");
  }, [question?.aid]);

  const handelSubmit = async () => {
    setLoading(true);
    const answerData = {
      id: question?.question?.id,
      answer: answerText,
    };
    try {
      const res = await axios.post(
        `/games/listening_frenzy/answer/${aid}`,
        answerData
      );
      if (res?.data?.game_over || res?.data?.wrong_answer) {
        if (res.data.message || res?.data?.game_over) {
          toast.success("Your game is over");
        } else {
          toast.error("Your answer is not correct try again");
        }
        if (res?.data?.game_over) {
          setGameOver(true);
        } else {
          setAid("");
          setIsCorrect(false);
          setTryAgain(!tryAgain);
          setAnswerText("");
        }
        setGameScore({ current: res?.data?.score, max: res?.data?.max_score });
      } else {
        toast.success(res.data.message || "Congratulations");
        setAnswerText("");
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
      <div className="pt-2.5">
        <div className="w-full bg-[url('/mini_game/listening_frenzy.svg')] bg-cover bg-center bg-no-repeat pt-32 pb-20 h-full flex items-center justify-center relative">
          <p className=" text-lg text-white font-semibold absolute top-7 left-7">
            Listening Frenzy
          </p>
          <div className="w-[60%]">
            {!gameOver && (
              <p className="text-white text-center text-2xl font-semibold">
                {isCorrect
                  ? "Listen And Write the Line"
                  : "Wrong Answer: Game Over"}
              </p>
            )}
            {gameOver ? (
              <div className="w-full py-20 flex items-center justify-center">
                <p className="text-white text-center text-4xl font-semibold">
                  Game is over
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                {/* audio */}
                <div className="w-full bg-white rounded-xl">
                  <AudioVisualizer selectedFile={question?.question?.audio} />
                </div>
                <input
                  onChange={(e) => setAnswerText(e.target.value)}
                  required
                  value={answerText}
                  type="text"
                  className="py-4 px-3 bg-white w-full border-none focus:ring-0 text-base rounded-md"
                  placeholder="Type your answer ............"
                />
              </div>
            )}
            {isCorrect && !gameOver ? (
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
                  setGameOver(false);
                }}
                className="py-2 px-3 bg-secondary hover:bg-secondary font-semibold duration-200 text-black flex items-center justify-center gap-x-2 w-full mt-5"
              >
                Play again
              </button>
            )}
            <GameScore data={gameScore} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ListeningFrenzy;
