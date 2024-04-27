import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import { getFileName } from "../../utils/getFileName";
import { formatDateTime } from "@/utils/formatDateTime";
import TablePagination from "@/components/TablePagination";
const FilterTab = [
  { name: "Grammar" },
  { name: "Vocabulary" },
  { name: "Essay" },
];
function StudyMaterial() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Grammar");
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;

  // get Data
  useEffect(() => {
    const getStudyMaterial = async () => {
      const res = await axios.get(
        `/study_materials/study_material?limit=${pageLimit}&page=${pageNumber}`
      );
      setStudyMaterial(res?.data);
      setLoading(false);
    };
    getStudyMaterial();
  }, [pageNumber]);
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
                : "bg-white text-black dark:bg-white/20 dark:text-white"
            } py-2 px-3 text-xs font-bold`}
          >
            {tab?.name}
          </button>
        ))}
      </div>
      {/* file */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : (
        <div className={`${studyMaterial?.length > 0 ? "space-y-2" : ""}`}>
          {studyMaterial?.results?.map((material, i) => (
            <StudyFile key={material?.id} data={material} />
          ))}
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(studyMaterial?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </div>
      )}
    </Layout>
  );
}

export default StudyMaterial;

export const handlePdfDownload = (name) => {
  const blob = new Blob([`https://api.codebyamirus.link/${name?.file}`], {
    type: "application/pdf",
  });
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
    <div className="px-5 py-6 bg-white dark:bg-white/20 flex items-center justify-between">
      <p className="text-sm font-bold">
        {data?.title} {formatDateTime(data?.uploaded_at, "date")}
      </p>
      <button onClick={() => handlePdfDownload(data)}>
        <BiSolidDownload className="text-xl" />
      </button>
    </div>
  );
};
