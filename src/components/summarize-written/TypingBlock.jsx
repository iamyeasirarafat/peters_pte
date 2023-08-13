import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../global/Pagination";

const TypingBlock = ({ setResult }) => {
  // remaining time function
  const initialMinutes = 1;
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
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const id = params.get("que_no");

  const handleSubmit = async () => {
    setIsLoading(true);
    if (summary.length > 0) {
      try {
        const { data } = await axios.post("/summarize/answer", {
          summarize: id,
          summarize_text: summary,
        });
        console.log(data);
        setResult(data);

        setIsLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        console.log("summarize error", error);
        setIsLoading(false);
      }
    } else {
      toast.error("You need to write something.");
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="border border-primary rounded-[15px] mt-3 ml-8 mr-5">
        <div className="flex items-center justify-end bg-primary rounded-t-[15px] p-1 px-5">
          <div className="w-1/2 flex items-center justify-between">
            <p className="text-gray text-xs text-center mr-auto">
              <i>
                Time Remaining {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </i>
            </p>
            <p className="text-gray text-xs text-center">
              Word Count: {summary.split(" ").length}
            </p>
          </div>
        </div>
        <div className="p-3">
          <textarea
            onChange={(e) => setSummary(e.target.value)}
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
