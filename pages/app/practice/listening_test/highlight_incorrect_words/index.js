import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import ReusableModal from "@/components/global/ReusableModal";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import GlobalPagination from "../../../../../components/global/GlobalPagination";
import DashboardLayout from "../../../layout";
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
        <ListenBlock listening data={data} blank />
        <SentenceBlock
          typingTime={2}
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

const SentenceBlock = ({ typingTime, setReFetch, api, data }) => {
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

  const handleWordClick = (word, index) => {
    setAnswers(null);
    const wordIdentifier = `${word}-${index}`;
    const selectedWordIndex = selectedWords.indexOf(wordIdentifier);
    if (selectedWordIndex === -1) {
      setSelectedWords([...selectedWords, wordIdentifier]);
    } else {
      setSelectedWords(selectedWords.filter((item) => item !== wordIdentifier));
    }
  };
  // cheching that selected word is correct or not
  const isValueInArray = (valueToCheck) => {
    return apiAnswers?.some((item) => item.wrong === valueToCheck);
  };
  const renderClickableSentence = () => {
    const getWordColor = (word, index) => {
      const wordIdentifier = `${word}-${index}`;
      if (selectedWords.includes(wordIdentifier)) {
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
        selectedWords.includes(wordIdentifier)
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
        className={`cursor-pointer  ${getWordColor(word, index).color}`}
        key={index}
        onClick={() => handleWordClick(word, index)}
      >
        {getWordColor(word, index).value === "wrong" ? (
          <RxCross2 className="inline" />
        ) : getWordColor(word, index).value === "correct" ? (
          <FaCheck className="inline" />
        ) : (
          ""
        )}{" "}
        {word}{" "}
        {(getWordColor(word, index).value === "wrong" ||
          getWordColor(word, index).value === "correct") && (
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
        answers: selectedWords.map((item) => item.split("-")[0]),
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
        <div className="flex items-center gap-2">
          <button
            onClick={handelSubmit}
            disabled={isLoading}
            className="py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-blue text-white font-semibold text-lg"
          >
            {isLoading && <LoaderIcon />}
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
};

const FillBlanksModal = ({ data, open, setOpen }) => {
  //reading score will be Calculated by score's half of ceil
  const readingScore = Math.ceil(data?.scores.score / 2);
  const readingMaxScore = Math.ceil(data?.scores.max_score / 2);
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl">#{data?.id || 0}</p>
          <p className="text-white text-2xl ml-40">AI DETAILED SCORE</p>
          <div className="flex items-center gap-x-4">
            <div className="py-[5px] pl-[10px] pr-5 bg-white rounded-[30px] flex items-center gap-x-4">
              <p className="text-white text-lg px-2 py-1 rounded-[30px] bg-blue">
                Target Score
              </p>
              <p className="text-gray text-[28px] font-medium">80</p>
            </div>
            {/* <MdOutlineFileDownload className="text-4xl text-white cursor-pointer" /> */}
            {/* close modal */}
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center"
            >
              <GrClose className="text-gray text-xl" />
            </button>
          </div>
        </div>
        {/* Modal content */}
        <div className="p-5">
          {/* score */}
          <div className="grid grid-cols-4 gap-6">
            {/* Total Score */}
            <div
              className={`col-span-1 w-full border border-primary rounded-[13px]`}
            >
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Listening Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={data?.scores.score || 0}
                    text={data?.scores.score || 0}
                    maxValue={data?.scores.max_score || 0}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">
                  Out of {data?.scores.max_score || 0}
                </p>
              </div>
            </div>

            <div className="col-span-1 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Reading Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={readingScore || 0}
                    text={readingScore || 0}
                    maxValue={readingMaxScore || 0}
                    strokeWidth={15}
                    styles={buildStyles({
                      textColor: "gray",
                      textSize: "20px",
                      pathColor: "#ff8412",
                      trailColor: "#f1f1f1",
                    })}
                  />
                </div>
                <p className="text-gray text-xl mt-1">
                  Out of {readingMaxScore || 0}
                </p>
              </div>
            </div>

            {/* Time Taken */}
            <div className="col-span-2 w-full border border-primary rounded-[13px] relative">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full">
                <p className="text-[60px] text-gray">
                  {data?.time_taken || "0.00"}
                </p>
              </div>
            </div>
            {/* Correct answer */}
            <div className=" col-span-2 w-full border border-primary  rounded-[13px] ">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Correct answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-start justify-center gap-x-1.5 p-4 w-full h-full">
                <p className="text-gray text-xl text-center">
                  {data?.scores?.score_details.map((item, index) => {
                    return (
                      <span key={index} className="block">
                        {item.right_option}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            {/* Your Answer */}
            <div className="col-span-2 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Your Answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-start justify-center gap-x-1.5 p-4 w-full h-full">
                <p className="text-gray text-xl text-center">
                  {data?.scores?.score_details.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={`block ${
                          item?.correct ? "text-green-500" : "text-red"
                        }`}
                      >
                        {item.user_option ? item.user_option : "-"}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-2 text-lightGray">
            This score will disappear on 02/08/2023
          </p>
        </div>
      </div>
    </ReusableModal>
  );
};
