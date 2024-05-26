import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import DashboardLayout from "../../layout";
import GameScore from "./GameScore";
import axios from "axios";
import GameRecorder from "./GameRecorder";

function SpeakingSpell() {
  const [loading, setLoading] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [question, setQuestion] = useState({});
  const [answerText, setAnswerText] = useState("");
  const [gameScore, setGameScore] = useState({});
  const [aid, setAid] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [tryAgain, setTryAgain] = useState(false);

  useEffect(() => {
    // fetch question
    const getQuestion = async () => {
      try {
        const res = await axios.get(
          `games/speaking_spell/answer${aid && `/${aid}`}`
        );
        setQuestion(res?.data);
        setGameScore({ current: res?.data?.score, max: res?.data?.max_score });
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

  //  handleMakeAudioToText
  const handleMakeAudioToText = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/audio_to_text", {
        audio: audioData,
      });
      setAnswerText(res?.data?.text);
      handelSubmit();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handelSubmit = async () => {
    setLoading(true);
    const answerData = {
      id: question?.question?.id,
      answer: answerText,
    };
    try {
      const res = await axios.post(
        `games/speaking_spell/answer/${aid}`,
        answerData
      );
      if (res?.data?.game_over || res?.data?.wrong_answer) {
        toast.error(
          res.data.message || res?.data?.game_over
            ? "Your game is over"
            : "Your answer is not correct try again"
        );
        setAid("");
        setIsCorrect(false);
        setTryAgain(!tryAgain);
        setAnswerText("");
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
      <div className="pt-2.5 pb-15">
        <div className="w-full bg-[url('/mini_game/speaking_spell.png')] bg-cover bg-center bg-no-repeat pt-32 pb-20 h-full flex items-center justify-center">
          <div className="w-[60%]">
            <p className="text-white text-center text-xl font-semibold">
              Speak the Line <q>{question?.question?.word}</q>
            </p>
            <div className="bg-white rounded-[15px]">
              <GameRecorder audioData={audioData} setAudioData={setAudioData} />
            </div>
            {isCorrect ? (
              <button
                onClick={handleMakeAudioToText}
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
                Ply again
              </button>
            )}
            <GameScore data={gameScore} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SpeakingSpell;
