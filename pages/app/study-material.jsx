import axios from "axios";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { TbDownload } from "react-icons/tb";
import { getFileName } from "../../utils/getFileName";
import DashboardLayout from "./layout";

function StudyMaterial() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [studyMaterial, setStudyMaterial] = useState({});
  const [topic, setTopic] = useState([]);
  console.log(topic)
  // get Data
  useEffect(() => {
    const getStudyMaterial = async () => {
      const { data } = await axios.get(
        `/study_materials/study_material`
      );
      // setStudyMaterial(res?.data);
      let organizedData = {};
      data.forEach(item => {
        if (!organizedData[item.topic ? item.topic.title : "Others"]) {
          organizedData[item.topic ? item.topic.title : "Others"] = [];
        }
        organizedData[item.topic ? item.topic.title : "Others"].push(item);
      });
      setStudyMaterial(organizedData);
      setLoading(false);
    };
    const getTopic = async () => {
      const res = await axios.get(
        `/topic`
      );
      setTopic(res?.data);
      setLoading(false);
    };
    getStudyMaterial();
    getTopic();
  }, []);
  console.log(studyMaterial)

  return (
    <DashboardLayout >
      <div className="flex justify-between mt-7 items-center">
        <h1 className="text-lightGray font-cabin text-4xl">
          Study Material
        </h1>
        <button>
          <FiInfo className="text-2xl text-blue" />
        </button>
      </div>
      {/* tab */}
      <div className="flex md:flex-wrap my-3 border rounded-xl p-2 border-primary">
        {topic?.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(activeTab === tab?.title ? "" : tab?.title)}
            className={`${tab?.title === activeTab
              ? "bg-secondary rounded-md dark:bg-[#2b2c2c] "
              : "bg-white  dark:bg-white/20 dark:text-white"
              } py-1 px-2.5 text-black text-base font-bold`}
          >
            {tab?.title}
          </button>
        ))}
      </div>
      {/* file */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-primary border-t-transparent"
          ></div>
        </div>
      ) : (
        <div >
          {
            Object.keys(studyMaterial)?.map((key, i) => {
              const isActiveTab = activeTab === key || activeTab === "";
              return (
                <div key={i} className={`my-5 ${isActiveTab ? "block" : "hidden"}`}>
                  <h3 className="text-2xl mb-2 text-center font-medium text-black">
                    {key}
                  </h3>
                  <div className="space-y-2">
                    {
                      studyMaterial[key]?.map((item, i) => (
                        <StudyFile key={i} data={item} />
                      ))
                    }
                  </div>
                </div>
              );
            })
          }


        </div>
      )}
    </DashboardLayout>
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
    <div className="px-5 py-6 bg-white border-primary border rounded-3xl dark:bg-white/20 flex items-center justify-between">
      <p className="text-xl font-semibold text-gray">
        {data?.title}
      </p>
      <button onClick={() => handlePdfDownload(data)} className="rounded-full text-center flex items-center justify-center w-11 h-11 bg-primary ">
        <TbDownload
          className="text-2xl text-white" />
      </button>
    </div>
  );
};
