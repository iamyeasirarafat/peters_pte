import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Pagination from "./Pagination";

const TypingBlock = ({ setResult, api }) => {
  // remaining time function
  const initialMinutes = 10;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);

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

  //handle submit functionalities
  const [textAnswer, setTextAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = router.query.que_no;
  const handleSubmit = async () => {
    setIsLoading(true);
    if (textAnswer.length > 0) {
      try {
        const res = await axios.post(api, {
          id: id,
          answer: textAnswer,
        });
        setResult(res?.data);
        toast.success(res?.data?.massage || "Submitted Successfully");
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.massage || "Something went wrong");
        setIsLoading(false);
      }
    } else {
      toast.error("You need to write something.");
      setIsLoading(false);
    }
  };

  // after change question automatically clearing textfild
  useEffect(() => {
    setTextAnswer("");
  }, [id]);

  return (
    <>
      <div className="border border-primary rounded-[15px]">
        <div className="flex items-center justify-end bg-primary rounded-t-[15px] p-1 px-5">
          <div className="w-1/2 flex items-center justify-between">
            <p className="text-gray text-xs text-center mr-auto">
              <i>
                Time Remaining {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </i>
            </p>
            <p className="text-gray text-xs text-center">
              Word Count: {textAnswer.split(" ").length}
            </p>
          </div>
        </div>
        <div className="p-3">
          <textarea
            onChange={(e) => setTextAnswer(e.target.value)}
            value={textAnswer}
            disabled={timerExpired}
            className="w-full disabled:opacity-40 border-0 text-gray focus:ring-0"
            placeholder="Type your summary here..."
            rows={4}
          ></textarea>
        </div>
      </div>
      {/* pagination */}
      <Pagination HandleSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
};

export default TypingBlock;
