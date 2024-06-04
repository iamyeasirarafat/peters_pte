"use client";
import FillBlanksModal from "@/components/fill_blanks/FillBlanksModal";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
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
  const answerApi = `/reading_blank/${id}/answer`;
  // get data
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/reading_blank/" + id);
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
    title: "Reading Blanks",
    api: "/reading_blanks",
  };

  return (
    <DashboardLayout>
      <Toaster />
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Reading fill in the Blanks" />
      {/* main content */}
      <GlobalMainContent data={data}>
        {/* <ListenBlock data={data} blank /> */}
        <FillBlanksBlock
          typingTime={2}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
          sentence={data?.sentence}
          option_list={data?.options || []}
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
        reading_fill_banks
        data={aiResult}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
};

export default Page;

const FillBlanksBlock = ({
  typingTime,

  setReFetch,
  api,
  sentence,
  option_list,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
  const id = router.query.que_no;
  const initialMinutes = typingTime;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  // useEffect(() => {
  //   if (sentence) {
  //     setAnswers(sentence.map((_, index) => ({ index, value: "" })));
  //   }
  // }, [sentence]);

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
      // get index wise array of string
      answers.sort((a, b) => a.index - b.index);
      const x = answers.map((obj) => obj.value);
      const { data } = await axios.post(api, {
        answers: x,
        time_taken: timeTakenInMinutes,
      });
      setResult(data);
      toast.success(data.message || "Submitted Successfully");
      setReFetch((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const abc = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };

  //Drag and drop functionality
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setIsDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    const newElement = document.createElement("div");
    newElement.setAttribute("draggable", true);
    newElement.setAttribute("id", data);
    newElement.setAttribute(
      "class",
      "border border-primary cursor-move font-medium bg-[#FFF4EB] capitalize px-5  rounded-3xl py-2"
    );
    newElement.addEventListener("dragstart", handleDragStart);
    newElement.innerText = data;
    e.target.appendChild(newElement);
    draggedElement.remove();
    setAnswers((prev) => prev.filter((item) => item.value !== data));
    setIsDragging(false);
  };
  const score_details = result?.score?.score_details;
  return (
    <>
      <div className="border border-primary rounded-lg p-2">
        <p className="text-xl font-medium">
          {Array.isArray(sentence) &&
            sentence.map((word, index) => {
              const correct =
                result &&
                score_details.find(
                  (item) => abc[item.index] === index + 1 && item.correct
                );
              const wrong =
                result &&
                score_details.find(
                  (item) => abc[item.index] === index + 1 && !item.correct
                );
              return (
                <span key={index}>
                  <span>{word}</span>
                  {index !== sentence.length - 1 && (
                    <FillBlankInput
                      right={correct}
                      wrong={wrong}
                      index={index}
                      setAnswer={updateAnswer}
                      handleDragStart={handleDragStart}
                      setIsDragging={setIsDragging}
                    />
                  )}
                </span>
              );
            })}
        </p>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border border-primary rounded-lg flex space-x-2  p-2"
      >
        {option_list.map((item, i) => (
          <div
            id={item}
            className={`${
              isDragging ? "opacity-50" : ""
            } border border-primary cursor-move font-medium bg-[#FFF4EB]  px-5  rounded-3xl py-2`}
            draggable="true"
            onDragStart={handleDragStart}
            key={i}
          >
            {item}
          </div>
        ))}
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
const FillBlankInput = ({
  right,
  wrong,
  index,
  setAnswer,
  setIsDragging,
  handleDragStart,
}) => {
  console.log(right, wrong);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    // Checking if the target already has children
    if (e.currentTarget.children.length === 0) {
      const newElement = document.createElement("div");
      newElement.setAttribute("draggable", true);
      newElement.setAttribute("id", data);
      newElement.addEventListener("dragstart", handleDragStart);
      newElement.innerText = data;
      e.target.appendChild(newElement);
      setAnswer(index, data);
      // Remove the dragged element from its previous location
      draggedElement.remove();
    } else {
      //giving the cursor style not allowed to drop
      e.target.style.cursor = "not-allowed";
    }

    setIsDragging(false);
  };
  const bg = right
    ? "bg-green-200 border-0"
    : wrong
    ? "bg-rose-200 border-0"
    : "";
  return (
    <div
      id="dropArea"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`px-2 w-44 border rounded-lg h-7 mx-4 mt-2 border-[#949494] inline-block ${bg}`}
    ></div>
  );
};
