import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import SingleChoiceAnswer from "@/components/global/SingleChoiceAnswer";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";

function Page() {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  // get data
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/highlight_summary/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/highlight_summary/" + id);
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
    title: "Highlight Summary",
    api: "/highlight_summarys",
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader
        title="Highlight Correct Summary"
        tips_link="https://peterspte.com/listening-test/highlight-correct-summary-guide-tips/"
      />
      <p className="text-gray text-base mt-2 text-center">
        You will hear a recording. Click on the paragraph that best relates to
        the recording.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <ListenBlock listening setOpen={setOpenTranscriptModal} data={data} />
        {/* Multiple Choice Answer */}
        <SingleChoiceAnswer
          text_content="Which of the following most accurately summarizes the opinion of the author in the text?"
          isReady={data?.id ? false : true}
          typingTime={5}
          answers={data?.options || []}
          result={result}
          setReFetch={setReFetch}
          api={answerApi}
        />
      </GlobalMainContent>
      <ResultSection
        summary
        setOpenModal={setOpenScoreModal}
        setOpenScoreModal={setOpenScoreModal}
        result={result}
        setAiResult={setAiResult}
      />
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
      <MultipleChoiceAiModal
        outOf={1}
        result={aiResult}
        data={data}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
    </DashboardLayout>
  );
}

export default Page;

import ReusableModal from "@/components/global/ReusableModal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ModalHeader from "../../../../../components/global/ModalHeader";

const MultipleChoiceAiModal = ({ open, setOpen, result, outOf, listining }) => {
  const router = useRouter();
  const id = router.query.que_no;
  const rightOptions = result?.scores?.score_details?.right_options || [];
  const rightAnswer = result?.scores?.score_details?.right_answers || [];
  const wrongAnswer = result?.scores?.score_details?.wrong_answers || [];
  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="bg-white border border-primary rounded-[15px] w-full overflow-hidden">
        {/* modal header */}
        <ModalHeader id={id} setOpen={() => setOpen(false)} />
        {/* Modal content */}
        <div className="p-5">
          {/* score */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-3">
            {/* Total Score */}
            <div
              className={` col-span-4 lg:col-span-1 w-full border border-primary rounded-[13px]`}
            >
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Reading Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={result?.scores.score || 0}
                    text={result?.scores.score || 0}
                    maxValue={result?.scores.max_score || 0}
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
                  Out of {result?.scores.max_score || 0}
                </p>
              </div>
            </div>

            <div className="col-span-4 lg:col-span-1 w-full border border-primary rounded-[13px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Listening Score</p>
              </div>
              {/* score point*/}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-32 h-w-32">
                  <CircularProgressbar
                    value={result?.scores.score || 0}
                    text={result?.scores.score || 0}
                    maxValue={result?.scores.max_score || 0}
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
                  Out of {result?.scores.max_score || 0}
                </p>
              </div>
            </div>

            {/* Time Taken */}
            <div className="col-span-4 lg:col-span-2 w-full border border-primary rounded-[13px] relative h-[150px] lg:h-auto">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Time Taken</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full mt-2 lg:mt-0">
                <p className="text-[60px] text-gray">
                  {result?.time_taken || "0.00"}
                </p>
              </div>
            </div>
            {/* Correct answer */}
            <div className="col-span-4 lg:col-span-2 w-full border border-primary rounded-[13px] relative h-[150px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Correct answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center gap-x-1.5 p-4 absolute top-0 left-0 w-full h-full mt-2">
                {rightOptions.map((item, i) => (
                  <WordValue key={i} word={item} />
                ))}
              </div>
            </div>
            {/* Your Answer */}
            <div className="col-span-4 lg:col-span-2 w-full border border-primary rounded-[13px] relative h-[150px]">
              <div className="bg-secondary rounded-t-[13px] place-items-center py-1 px-2">
                <p className="text-gray text-xl">Your Answer</p>
              </div>
              {/* score point*/}
              <div className="flex items-center justify-center gap-x-1.5 p-4 absolute top-0 left-0 w-full h-full mt-2">
                {/*  */}
                {rightAnswer.map((item, i) => (
                  <WordValue key={i} word={item} />
                ))}
                {wrongAnswer.map((item, i) => (
                  <WordValue wrong key={i} word={item} />
                ))}
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

const WordValue = ({ word, wrong }) => {
  return (
    <p
      className={`text-[35px] text-gray ${
        wrong ? "bg-[#ffe0e0]" : "bg-[#d3ffd5]"
      } capitalize leading-none  p-2.5 rounded-[10px] border border-primary`}
    >
      {word}
    </p>
  );
};
