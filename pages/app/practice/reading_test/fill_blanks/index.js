"use client";
import FillBlanksModal from "@/components/fill_blanks/FillBlanksModal";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  result,
  setReFetch,
  api,
  sentence,
  option_list,
}) => {
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

  const abc = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
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
    setIsDragging(false);
  };
  return (
    <>
      <div className="border border-primary rounded-lg p-2">
        <p className="text-xl font-medium">
          {Array.isArray(sentence) &&
            sentence.map((word, index) => {
              return (
                <span key={index}>
                  {word}
                  {
                    <FillBlankInput
                      index={index}
                      setAnswer={updateAnswer}
                      handleDragStart={handleDragStart}
                      setIsDragging={setIsDragging}
                    />
                  }
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
            } border border-primary cursor-move font-medium bg-[#FFF4EB] capitalize px-5  rounded-3xl py-2`}
            draggable="true"
            onDragStart={handleDragStart}
            key={i}
          >
            {item}
          </div>
        ))}
      </div>
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
      {/* <Pagination /> */}
    </>
  );
};
const FillBlankInput = ({
  index,
  setAnswer,
  setIsDragging,
  handleDragStart,
}) => {
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

  return (
    <div
      id="dropArea"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="px-2 w-44 border rounded-lg h-8 mx-4 border-[#949494] inline-block"
    ></div>
  );
};
