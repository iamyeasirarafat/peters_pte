import axios from "axios";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import DashboardLayout from "./layout";
import { StudyFile } from "./study-material";
// import AnimatedLoading from "@"
function Prediction() {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState([]);
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
      <div className="flex justify-between mt-7 items-center">
        <h1 className="text-lightGray font-cabin text-4xl">
          Prediction
        </h1>
        <button>
          <FiInfo className="text-2xl text-blue" />
        </button>
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
        <div className={`space-y-2 mt-5`}>
          {prediction?.map((item, i) => (
            <StudyFile key={item.id} data={item} />
          ))}

        </div>
      )}
    </DashboardLayout>
  );
}

export default Prediction;
