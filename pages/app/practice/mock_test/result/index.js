import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import ScoreReport from "@/components/UserMockTest/Result/ScoreReport";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateTime } from "@/utils/formatDateTime";
import Loading from "@/components/Loading";

function Index() {
  const [loading, setLoading] = useState(true);
  const [resultDetails, setResultDetails] = useState({});

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
      </div>
    </div>
  );
};
