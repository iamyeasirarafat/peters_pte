import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import GlobalPagination from "./GlobalPagination";

function MultipleChoiceAnswer({
  answers,
  api,
  setReFetch,
  isReady,
  typingTime,
  text_content,
}) {
  const router = useRouter();
  const id = router.query.que_no;
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState([]);
  const initialMinutes = typingTime;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [result, setResult] = useState(null);
  console.log("answerData", answerData);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          setTimerExpired(true);
          clearInterval(countdownInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [minutes, seconds]);

  // reset time
  useEffect(() => {
    setMinutes(initialMinutes);
    setSeconds(0);
  }, [id, initialMinutes]);
  const initialSeconds = initialMinutes * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const timeTakenInMinutes = ((initialSeconds - remainingSeconds) / 60).toFixed(
    2
  );
  //submit data
  const handelSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(api, {
        answers: answerData,
        time_taken: timeTakenInMinutes,
      });
      setResult(data);
      toast.success(data.message || "Submitted Successfully");
      setReFetch((prev) => !prev);
      setLoading(false);
      // setAnswerData([]);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const right_options = result?.score?.score_details?.right_options;
  const wrong_answers = result?.score?.score_details?.wrong_answers;
  return (
    <>
      <div className="p-5 rounded-[15px] border border-primary">
        <div className="flex items-center justify-between mb-2">
          {text_content && (
            <p className="text-gray text-base">{text_content}</p>
          )}
          {/* <p className="text-gray text-xs">
            <i>
              Time {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </i>
          </p> */}
        </div>
        <div className="space-y-2 mt-2">
          {answers?.map((answer, i) => {
            console.log("answer", answer);
            const right = right_options?.includes(answer?.index);
            const wrong = wrong_answers?.includes(answer?.index);
            return (
              <Answer
                right={right}
                wrong={wrong}
                id={id}
                key={i}
                answer={answer}
                answerData={answerData}
                setAnswerData={setAnswerData}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handelSubmit}
            disabled={loading || isReady}
            className="py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-blue text-white font-semibold text-lg"
          >
            {loading && <LoaderIcon />}
            Submit
          </button>
          <button
            onClick={() => {
              router.reload();
            }}
            className="py-2 px-6 hover:bg-secondary  flex items-center gap-x-2 rounded-[22px]  text-primary border border-primary font-semibold text-lg"
          >
            Restart
          </button>
        </div>
        <GlobalPagination />
      </div>
    </>
  );
}

export default MultipleChoiceAnswer;

export const Answer = ({
  answer,
  id,
  answerData,
  setAnswerData,
  right,
  wrong,
}) => {
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    setIsCheck(false);
  }, [id]);

  useEffect(() => {
    if (isCheck) {
      setAnswerData((prev) => [...prev, answer?.value]);
    } else {
      setAnswerData((prev) => prev.filter((item) => item !== answer?.value));
    }
  }, [isCheck, setAnswerData]);

  const isChecked = answerData.includes(answer?.value);
  const labelClass = isChecked ? "bg-secondary" : "";

  return (
    <label
      htmlFor={answer?.index}
      className={`${
        right ? "bg-green-300" : wrong ? "bg-rose-300" : labelClass
      }  rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        id={answer?.index}
        onChange={() => setIsCheck(!isCheck)}
        checked={isChecked}
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{answer?.index}.</span>
        <span className="text-base">{answer?.value}</span>
      </p>
    </label>
  );
};
