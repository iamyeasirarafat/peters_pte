import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import ScoreReport from "@/components/UserMockTest/Result/ScoreReport";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateTime } from "@/utils/formatDateTime";
import Loading from "@/components/Loading";
import { IoIosArrowForward } from "react-icons/io";

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
  const scoreReportTab = Object.keys(data?.score?.details);
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
          {scoreReportTab.map((item, i) => (
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
          {data?.score?.details?.writting?.all?.map((item, index) => (
            <MockTextResultDetails key={index} count={index + 1} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MockTextResultDetails = ({ data, count }) => {
  return (
    <div>
      <QuestionTitle
        count={count}
        title={data?.question?.title}
        id={data?.question?.id}
      />
      {/* dynamic result */}
      <p className="text-gray py-3">
        {data?.question?.content || data?.question?.question}
      </p>
      {/* score button */}
      <button className="border border-primary py-0.5 px-3 rounded-full font-medium text-primary mt-2">
        Score info{" "}
        {data?.score?.score &&
          data?.score?.score + "/" + data?.score?.max_score &&
          data?.score?.max_score}
      </button>
    </div>
  );
};

const QuestionTitle = ({ type, id, title, path, count }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-base font-semibold">
        {count}. {QuestionType("summarize_written_text")} #{id} {title}
      </p>
      <button
        onClick={() =>
          router.push("/app/practice/writing_test/summarize_written?que_no=16")
        }
        className="flex items-center gap-x-1 text-primary font-semibold "
      >
        Go to Question <IoIosArrowForward className="text-base" />
      </button>
    </div>
  );
};

const QuestionType = (type) => {
  const allType = {
    read_aloud: "RA",
    repeat_sentence: "RS",
    describe_image: "DI",
    reTell_lecture: "RL",
    answer_short_question: "ASQ",
    summarize_written_text: "SWT",
    write_essay: "WE",
    summarize_spoken_text: "SST",
    fill_in_the_blanks: "FIB-L",
    highlight_correct_summary: "HCS",
    select_missing_word: "SMW",
    highlight_incorrect_words: "HIW",
    write_from_dictation: "WFD",
  };
  return allType[type];
};
