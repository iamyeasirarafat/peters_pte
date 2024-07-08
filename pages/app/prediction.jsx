import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "./layout";
import { StudyFile } from "./study-material";
// import AnimatedLoading from "@"
function Prediction() {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState([]);
  console.log(prediction)
  // get Data
  useEffect(() => {
    const getStudyPrediction = async () => {
      const res = await axios.get(
        `/study_materials/prediction`
      );
      setPrediction(res?.data);
      setLoading(false);
    };
    getStudyPrediction();
  }, []);
  return (
    <DashboardLayout>
      <p className="text-lg font-extrabold mb-2">Prediction File</p>
      {/* file */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : (
        <div className={`${prediction?.length > 0 ? "space-y-2" : ""}`}>
          {prediction?.map((item, i) => (
            <StudyFile key={item.id} data={item} />
          ))}

        </div>
      )}
    </DashboardLayout>
  );
}

export default Prediction;
