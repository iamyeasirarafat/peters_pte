import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { StudyFile } from "./study-material";
import TablePagination from "@/components/TablePagination";
// import AnimatedLoading from "@"
function Prediction() {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;

  // get Data
  useEffect(() => {
    const getStudyPrediction = async () => {
      const res = await axios.get(
        `/study_materials/prediction?limit=${pageLimit}&page=${pageNumber}`
      );
      setPrediction(res?.data);
      setLoading(false);
    };
    getStudyPrediction();
  }, [pageNumber]);
  return (
    <Layout title="Prediction">
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
          {prediction?.results?.map((item, i) => (
            <StudyFile key={item.id} data={item} />
          ))}
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(prediction?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </div>
      )}
    </Layout>
  );
}

export default Prediction;
