import React, { useState } from "react";
import DashboardLayout from "../../../layout";
import ScoreReport from "@/components/UserMockTest/Result/ScoreReport";
const scoreReportTab = ["speaking", "reading", "writing", "listening"];
function Index() {
  const [activeTab, setActiveTab] = useState("speaking");
  return (
    <DashboardLayout>
      {/* title and name */}
      <div className="pt-5 flex items-center justify-between">
        <p className="text-base font-semibold text-gray">
          VIP Full Test Mock Test 38A (New 2h Format) - Score Report
        </p>
        <p className="text-sm text-gray opacity-75">
          Submitted at: 2024-05-26 16:58
        </p>
      </div>
      {/* score and report */}
      <div className="pt-2">
        <ScoreReport />
      </div>
      {/* result with answer */}
      <div className="mt-10 bg-white border border-primary rounded-[15px]">
        <p className="text-base font-semibold text-gray p-6">
          VIP Full Test Mock Test 38A (New 2h Format) - Answer & Score Info
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
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;
