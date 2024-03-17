import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TypingBlock = ({ result, setReFetch, api, isReady, typingTime }) => {
  // remaining time function
  const initialMinutes = typingTime;
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
          answer: textAnswer,
          time_taken: `${initialMinutes - minutes}:${seconds}`,
        });
        toast.success(res?.data?.massage || "Answer Submitted Successfully");
        setIsLoading(false);
        setReFetch((prev) => !prev);
        setTextAnswer("");
      } catch (error) {
        toast.error(error?.massage || "Something went wrong");
        setIsLoading(false);
      }
    } else {
      toast.error("You need to write something.");
      setIsLoading(false);
    }
  };

  // after change question automatically clearing textfield
  useEffect(() => {
    setTextAnswer("");
    setMinutes(initialMinutes);
    setSeconds(0);
  }, [id, initialMinutes]);

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
            disabled={timerExpired || isReady}
            className="w-full disabled:opacity-40 border-0 text-gray focus:ring-0"
            placeholder="Type your summary here..."
            rows={4}
          ></textarea>
        </div>
      </div>
      {/* button */}
      <div className="flex items-center gap-x-4">
        {result?.self?.[0]?.user ? (
          <button
            disabled={isLoading || isReady || timerExpired}
            onClick={handleSubmit}
            className="py-2 px-3 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-primary text-white font-semibold text-sm md:text-lg"
          >
            {isLoading ? (
              <>
                <div
                  className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                Loading...
              </>
            ) : (
              "Re-Test"
            )}
          </button>
        ) : (
          <button
            disabled={isLoading || isReady || timerExpired}
            onClick={handleSubmit}
            className="py-2 px-3 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-sm md:text-lg"
          >
            {isLoading ? (
              <>
                <div
                  className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default TypingBlock;
