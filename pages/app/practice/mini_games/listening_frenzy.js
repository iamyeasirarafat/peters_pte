import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import GameScore from "./GameScore";

function ListeningFrenzy() {
  const [loading, setLoading] = useState(false);
  const [rightAnswer, setRightAnswer] = useState({ id: null, answer: "" });
  const [question, setQuestion] = useState({});
  const { options } = question;
  useEffect(() => {
    // fetch question
    const getQuestion = async () => {
      try {
        const res = await axios.get("/games/spelling_bee/1");
        setQuestion(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, []);
  const handelSubmit = () => {
    console.log("Answer", rightAnswer);
  };

  return (
    <DashboardLayout dashboard>
      <div className="pt-2.5 pb-15">
        <div className="w-full bg-[url('/mini_game/listening_frenzy.png')] bg-cover bg-center bg-no-repeat pt-32 pb-20 h-full flex items-center justify-center">
          <div className="w-[60%]">
            <p className="text-white text-center text-xl font-semibold">
              Choose the correct spelling is Correct?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {options?.map((item, index) => (
                <label
                  key={index}
                  className={`group relative inline-flex items-center gap-2 select-none cursor-pointer tap-highlight-color bg-white  py-4 px-4`}
                >
                  <input
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
            <button
              onClick={handelSubmit}
              disabled={loading}
              className="py-2 px-3 disabled:opacity-50 bg-primary hover:bg-secondary font-semibold duration-200 text-white hover:text-black flex items-center justify-center gap-x-2 w-full mt-5"
            >
              {loading && <LoaderIcon />} Submit
            </button>
            <GameScore />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ListeningFrenzy;