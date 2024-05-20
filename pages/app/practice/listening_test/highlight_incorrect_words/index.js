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
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
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
  const answerApi = `/highlight_incorrect_word/${id}/answer`;
  // get data
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/highlight_incorrect_word/" + id);
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
    title: "Highlight Incorrect Words",
    api: "/highlight_incorrect_words",
  };

  return (
    <DashboardLayout>
      <Toaster />
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Highlight Incorrect Words" />
      <p className="text-gray text-base mt-2 text-center">
        You will hear a recording. Below is a transcription of the recording.
        Some words in the transcription differ from what the speaker(s) said.
        Please click on the words that are different.
      </p>
      {/* main content */}
      <GlobalMainContent data={data}>
        <ListenBlock data={data} blank />
        <SentenceBlock
          typingTime={2}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
          data={data}
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

const SentenceBlock = ({ typingTime, result, setReFetch, api, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(null);
  const initialMinutes = typingTime;
  const router = useRouter();
  const id = router.query.que_no;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [sentence, setSentence] = useState([]);
  const [apiAnswers, setApiAnswers] = useState([]);
  const [finalSentence, setFinalSentence] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    if (data) {
      setSentence(data?.sentence);
      setApiAnswers(data?.answers);
    }
  }, [data]);

  useEffect(() => {
    if (sentence) {
      constructSentence();
    }
  }, [sentence]);
  const constructSentence = () => {
    let result = [];
    let answerIndex = 0;

    for (let i = 0; i < sentence.length - 1; i++) {
      result.push(sentence[i]);
      result.push(" ");
      result.push(apiAnswers[answerIndex].wrong);
      result.push(" ");
      answerIndex = (answerIndex + 1) % apiAnswers.length;
    }

    result.push(sentence[sentence.length - 1]);

    const finalSentence = result.join("");
    setFinalSentence(finalSentence);
  };

  const handleWordClick = (word) => {
    setAnswers(null);
    const index = selectedWords.indexOf(word);
    if (index === -1) {
      setSelectedWords([...selectedWords, word]);
    } else {
      setSelectedWords(selectedWords.filter((item) => item !== word));
    }
  };
  // cheching that selected word is correct or not
  const isValueInArray = (valueToCheck) => {
    return apiAnswers?.some((item) => item.wrong === valueToCheck);
  };
  const renderClickableSentence = () => {
    const getWordColor = (word) => {
      if (selectedWords.includes(word)) {
        if (answers) {
          if (isValueInArray(word)) {
            return {
              value: "correct",
              color: "text-green-600 bg-green-200",
            };
          } else {
            return {
              value: "wrongSelected",
              color: "bg-[#FFE0E0]",
            };
          }
        } else {
          return {
            value: "selected",
            color: "text-primary",
          };
        }
      } else if (
        (answers && isValueInArray(word)) ||
        selectedWords.includes(word)
      ) {
        return {
          value: "wrong",
          color: "text-red bg-[#FFE0E0]",
        };
      } else {
        return {
          value: "nothing",
          color: "text-inherit",
        };
      }
    };
    const words = finalSentence.split(" ");
    return words.map((word, index) => (
      <span
        className={`cursor-pointer  ${getWordColor(word).color}`}
        key={index}
        onClick={() => handleWordClick(word)}
      >
        {getWordColor(word).value === "wrong" ? (
          <RxCross2 className="inline" />
        ) : getWordColor(word).value === "correct" ? (
          <FaCheck className="inline" />
        ) : (
          ""
        )}{" "}
        {word}{" "}
        {(getWordColor(word).value === "wrong" ||
          getWordColor(word).value === "correct") && (
          <span className="text-blue ml-1 bg-white">
            {apiAnswers.find((i) => i.wrong === word).value}{" "}
          </span>
        )}
      </span>
    ));
  };

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
  //*submit function
  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(api, {
        answers: selectedWords,
        time_taken: timeTakenInMinutes,
      });
      toast.success(res.data.message || "Submitted Successfully");
      setAnswers(res?.data);
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
        <p className="text-xl font-medium">{renderClickableSentence()}</p>
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
