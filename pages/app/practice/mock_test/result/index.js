import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import ScoreReport from "@/components/UserMockTest/Result/ScoreReport";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateTime } from "@/utils/formatDateTime";
import Loading from "@/components/Loading";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import SpokenTextModal from "../../../../../components/spoken_text/SpokenTextModal";

const QuestionDetails = {
  read_aloud: { code: "RA", url: "read_aloud" },
  repeat_sentence: { code: "RS", url: "repeat_sentence" },
  describe_image: { code: "DI", url: "describe_image" },
  retell_sentence: { code: "RL", url: "retell_lecture" },
  short_question: { code: "ASQ", url: "answer_short_question" },
  summarize: { code: "SWT", url: "summarize_written" },
  write_essay: { code: "WE", url: "write_essay" },
  summarize_spoken: { code: "SST", url: "spoken_text" },
  blank: { code: "FIB-L", url: "fill_blanks" },
  highlight_summary: { code: "HCS", url: "highlight_summary" },
  missing_word: { code: "SMW", url: "missing_word" },
  highlight_incorrect_word: { code: "HIW", url: "highlight_incorrect_words" },
  dictation: { code: "WFD", url: "write_dictation" },
  reading_writting_blank: { code: "FIB-RW", url: "read_write_blanks" },
  blank_reading: { code: "FIB-R", url: "fill_blanks" },
  reorder_paragraph: { code: "RO", url: "reorder_paragraphs" },
  multi_choice_reading_multi_answer: { code: "MCM", url: "multiple_answers" },
  multi_choice_reading_single_answer: { code: "MCS", url: "single_answer" },
  multi_choice_multi_answer: { code: "MCM", url: "multiple_answers" },
  multi_choice_single_answer: { code: "MCS", url: "single_answer" },
};

const getQuestionCode = (type) => {
  return QuestionDetails[type]?.code;
};

const getQuestionUrl = (type) => {
  return QuestionDetails[type]?.url;
};

function Index() {
  const [loading, setLoading] = useState(true);
  const [resultDetails, setResultDetails] = useState({});

  console.log("resultDetails", resultDetails);

  const router = useRouter();
  const { id, aid, type } = router.query;

  // get the data from the server
  useEffect(() => {
    const getResultDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/mocktest/${type}/${id}/answer/${aid}`);
        setResultDetails(res?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    router.isReady && type && id && aid && getResultDetails();
  }, [router.isReady]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loading />
      ) : resultDetails ? (
        <>
          {/* title and name */}
          <div className="pt-5 flex items-center justify-between">
            <p className="text-base font-semibold text-gray capitalize">
              {resultDetails?.title} - Score Report
            </p>
            <p className="text-sm text-gray opacity-75">
              Submitted at: {formatDateTime(resultDetails?.created_at, "full")}
            </p>
          </div>
          {/* score and report */}
          <div className="pt-2">
            {resultDetails?.score?.details && (
              <ScoreReport data={resultDetails} />
            )}
          </div>
          {/* result with answer */}
          {resultDetails?.score?.details && (
            <ResultScoreDetails data={resultDetails} />
          )}
        </>
      ) : (
        "No data found"
      )}
    </DashboardLayout>
  );
}

export default Index;

const ResultScoreDetails = ({ data }) => {
  const scoreReportTab = Object.keys(data?.score?.details) || [];
  const [activeTab, setActiveTab] = useState(scoreReportTab[0]);

  return (
    <div className="mt-10 bg-white border border-primary rounded-[15px]">
      <p className="text-base font-semibold text-gray p-6 capitalize">
        {data?.title} - Answer & Score Info
      </p>
      <hr className="border border-secondary" />
      {/* tab */}
      <div className="p-5">
        {/* tab */}
        <div className="flex gap-12 px-3">
          {scoreReportTab?.map((item, i) => (
            <button
              onClick={() => setActiveTab(item)}
              key={i}
              className={`${
                activeTab === item
                  ? "text-primary  border-primary"
                  : "text-gray border-transparent"
              } py-5 px-3 text-lg capitalize  border-b-2`}
            >
              {item}
            </button>
          ))}
        </div>
        <hr className="border border-secondary" />
        {/* result */}
        <div className="py-4 space-y-2 divide-y divide-secondary">
          {data?.score?.details?.[activeTab]?.all?.map((item, index) => (
            <MockTextResultDetails
              key={index}
              count={index + 1}
              data={item}
              activeTab={activeTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MockTextResultDetails = ({ data, count, activeTab }) => {
  const [open, setOpen] = useState({ data: null, state: false });
  return (
    <div>
      <QuestionTitle
        count={count}
        title={data?.question?.title}
        id={data?.question?.id}
        type={data?.type}
        activeTab={activeTab}
      />
      {/* dynamic result */}

      {/* audio */}
      {data?.question?.audio && (
        <>
          <audio
            src={`https://api.codebyamirus.link/${data?.question?.audio}`}
            className="w-full bg-gray p-1 rounded-full"
          />
          <p>Audio is here</p>
        </>
      )}
      {/* text question | content */}
      <p className="text-gray py-3">
        {data?.question?.content || data?.question?.question}
      </p>
      {/* score button */}
      <button
        onClick={() => setOpen({ data: data?.scores, state: true })}
        className="border border-primary py-0.5 px-3 rounded-full font-medium text-primary mt-2"
      >
        Score info{" "}
        {data?.scores?.score &&
          data?.scores?.score + "/" + data?.scores?.max_score}
      </button>
      {/* Modal */}
      {data?.type === "summarize_spoken" && open?.state && (
        <SpokenTextModal open={open?.state} setOpen={setOpen} result={data} />
      )}
    </div>
  );
};

const QuestionTitle = ({ type, id, title, count, activeTab }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-base font-semibold">
        {count}. {getQuestionCode(type)} #{id} {title}
      </p>
      <Link
        href={`/app/practice/${activeTab}_test/${getQuestionUrl(
          type
        )}?que_no=${id}`}
        className="flex items-center gap-x-1 text-primary font-semibold "
      >
        Go to Question <IoIosArrowForward className="text-base" />
      </Link>
    </div>
  );
};
