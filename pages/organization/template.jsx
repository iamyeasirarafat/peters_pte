import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { StudyFile } from "./study-material";
function Template() {
  const [templates, setTemplates] = useState([]);

  // get Data
  useEffect(() => {
    const getStudyTemplate = async () => {
      const res = await axios.get(`/study_materials/template`);
      setTemplates(res?.data);
    };
    getStudyTemplate();
  }, []);
  return (
    <Layout title="Template">
      <p className="text-lg font-extrabold mb-2">Template File</p>
      {/* file */}
      <div className={`${templates?.length > 0 ? "space-y-2" : ""}`}>
        {templates?.results?.map((item, i) => (
          <StudyFile key={item?.id} data={item} />
        ))}
      </div>
    </Layout>
  );
}

export default Template;
