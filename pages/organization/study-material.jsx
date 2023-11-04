import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import { getFileName } from "../../utils/getFileName";
const FilterTab = [
  { name: "Grammar" },
  { name: "Vocabulary" },
  { name: "Essay" },
];
function StudyMaterial() {
  const [activeTab, setActiveTab] = useState("Grammar");
  const [studyMaterial, setStudyMaterial] = useState([]);

  // get Data
  useEffect(() => {
    const getStudyMaterial = async () => {
      const res = await axios.get(`/study_materials/study_material`);
      setStudyMaterial(res?.data);
    };
    getStudyMaterial();
  }, []);
  return (
    <Layout title="Study Material">
      <p className="text-lg font-extrabold mb-2">Topic</p>
      {/* tab */}
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
      <div className={`${studyMaterial?.length > 0 ? "space-y-2" : ""}`}>
        {studyMaterial?.map((material, i) => (
          <StudyFile key={material?.id} data={material} />
        ))}
      </div>
    </Layout>
  );
}

export default StudyMaterial;

export const handlePdfDownload = (name) => {
  const blob = new Blob([name?.file], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getFileName(name?.file);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
export const StudyFile = ({ data }) => {
  return (
    <div className="px-5 py-6 bg-white dark:bg-black flex items-center justify-between">
      <p className="text-sm font-bold">{data?.title}</p>
      <button onClick={() => handlePdfDownload(data)}>
        <BiSolidDownload className="text-xl" />
      </button>
    </div>
  );
};
