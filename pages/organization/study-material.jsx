import Layout from "@/components/Layout";
import { useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
const FilterTab = [
  { name: "Grammar" },
  { name: "Vocabulary" },
  { name: "Essay" },
];
function StudyMaterial() {
  const [activeTab, setActiveTab] = useState("Grammar");
  return (
    <Layout title="Study Material">
      <p className="text-lg font-extrabold mb-2">Topic</p>
      <div className="flex md:flex-wrap my-3">
        {FilterTab?.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab?.name)}
            className={`${
              tab?.name === activeTab
                ? "bg-black dark:bg-[#2b2c2c] text-white"
                : "bg-white text-black dark:bg-black dark:text-white"
            } py-2 px-3 text-xs font-bold`}
          >
            {tab?.name}
          </button>
        ))}
      </div>
      {/* file */}
      <div className="px-5 py-6 bg-white dark:bg-black flex items-center justify-between">
        <p className="text-sm font-bold">Grammar Lesson #1</p>
        <button>
          <BiSolidDownload className="text-xl" />
        </button>
      </div>
    </Layout>
  );
}

export default StudyMaterial;
