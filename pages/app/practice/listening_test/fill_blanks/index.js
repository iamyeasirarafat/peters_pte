import FillBlanksModal from "@/components/fill_blanks/FillBlanksModal";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";
import GlobalPagination from "../../../../../components/global/GlobalPagination";

const Page = () => {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  // get data
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/blank/${id}/answer`;
  // get data
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/blank/" + id);
      setData(data);
    };
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    if (id) {
      getData();
      getResult();
    }
  }, [id, reFetch, answerApi]);

  //sideModal Data
  const SideModalData = {
    title: "Fill in the Blanks",
    api: "/blanks",
  };

  return (
    <DashboardLayout>
      <Toaster />
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Fill In The Blanks" />
      <p className="text-gray text-base mt-2 ml-2">
        You will hear a recording. Type the missing words in each blank.
      </p>
      {/* main content */}
      <GlobalMainContent data={data}>
        <ListenBlock data={data} blank />
        <FillBlanksBlock
          typingTime={2}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
          sentence={data?.sentence}
        />
      </GlobalMainContent>
      {(result?.self?.[0]?.user || result?.other?.[0]?.user) && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
          setAiResult={setAiResult}
        />
      )}
      <FillBlanksModal
        data={aiResult}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
};

export default Page;

const FillBlanksBlock = ({ typingTime, result, setReFetch, api, sentence }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const initialMinutes = typingTime;
  const router = useRouter();
  const id = router.query.que_no;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    if (sentence) {
      setAnswers(sentence.map((_, index) => ({ index, value: "" })));
    }
  }, [sentence]);

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

  //!Updating answer state
  const updateAnswer = (index, value) => {
    const existingIndex = answers.findIndex((item) => item.index === index);
    if (existingIndex !== -1) {
      // If index exists, update its value
      setAnswers((prev) => [
        ...prev.slice(0, existingIndex),
        { index, value },
        ...prev.slice(existingIndex + 1),
      ]);
    } else {
      // If index does not exist, add a new entry
      setAnswers((prev) => [...prev, { index, value }]);
    }
  };
  const initialSeconds = initialMinutes * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const timeTakenInMinutes = ((initialSeconds - remainingSeconds) / 60).toFixed(
    2
  );
  //*submit function
  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(api, {
        answers: [...answers.map((item) => item.value)],
        time_taken: timeTakenInMinutes,
      });
      toast.success(res.data.message || "Submitted Successfully");
      setReFetch((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="p-5 border border-primary rounded-[15px] relative">
        <p className="text-xl font-medium">
          {Array.isArray(sentence) &&
            sentence.map((word, index) => {
              return (
                <span key={index}>
                  {word}
                  {index !== sentence.length - 1 && (
                    <FillBlankInput
                      onChange={(e) => updateAnswer(index, e.target.value)}
                    />
                  )}
                </span>
              );
            })}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={isLoading || timerExpired}
          onClick={handelSubmit}
          className="py-2 px-3 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-sm md:text-lg"
        >
          {isLoading ? (
            <>
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              Loading...
            </>
          ) : result?.self?.[0]?.user ? (
            "Re-Submit"
          ) : (
            "Submit"
          )}
        </button>
        <GlobalPagination />
      </div>
    </>
  );
};
const FillBlankInput = ({ onChange }) => {
  return (
    <div className="px-2 inline-block">
      <input
        onBlur={onChange}
        // onChange={onChange}
        className="w-[150px] text-gray text-lg text-center border border-x-0 border-t-0 border-b-gray outline-none focus:ring-transparent focus:border-gray p-0 m-0"
        type="text"
      />
    </div>
  );
};
