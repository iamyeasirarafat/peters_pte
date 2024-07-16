import { useState } from "react";
import Score from "./Score";
import ScoreTable from "./ScoreTable";

const ScoreReport = ({ data }) => {
  const scoreReportTab = ["score report"];
  if (data?.score?.report) {
    scoreReportTab.push(...Object.keys(data?.score?.report));
  }

  const [activeTab, setActiveTab] = useState("score report");
  return (
    <div className="bg-white border border-primary rounded-[15px]">
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
      <div className="px-6">
        {activeTab === "score report" ? (
          <Score
            setActiveTab={setActiveTab}
            scoreReportTab={scoreReportTab}
            data={data}
          />
        ) : (
          <ScoreTable data={data} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};
export default ScoreReport;
