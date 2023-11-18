import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { StudyFile } from "./study-material";
function Prediction() {
  const [prediction, setPrediction] = useState([]);

  // get Data
  useEffect(() => {
    const getStudyPrediction = async () => {
      const res = await axios.get(`/study_materials/prediction`);
      setPrediction(res?.data);
    };
    getStudyPrediction();
  }, []);
  return (
    <Layout title="Prediction">
      <p className="text-lg font-extrabold mb-2">Prediction File</p>
      {/* file */}
      <div className={`${prediction?.length > 0 ? "space-y-2" : ""}`}>
        {prediction?.results?.map((item, i) => (
          <StudyFile key={item.id} data={item} />
        ))}
      </div>
    </Layout>
  );
}

export default Prediction;
