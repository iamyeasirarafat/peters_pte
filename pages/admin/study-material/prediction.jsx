import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { formatDateTime } from "../../../utils/formatDateTime";
import Loading from "@/components/Loading";

const Index = () => {
  const [prediction, setPrediction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  // get prediction data
  useEffect(() => {
    setIsLoading(true);
    const getStudyPrediction = async () => {
      const res = await axios.get(`/study_materials/prediction`);
      setPrediction(res?.data);
      setIsLoading(false);
    };
    getStudyPrediction();
  }, []);

  return (
    <Layout title="Prediction" back>
      <div className="mb-5">
        <button
          onClick={() => router.push("/admin/study-material/add-prediction")}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <AiFillPlusCircle />
          Create New Prediction
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <PredictionListMobile data={prediction?.results} />
        </div>
      ) : (
        <PredictionList data={prediction?.results} />
      )}
      <TablePagination />
    </Layout>
  );
};

export default Index;

export const PredictionList = ({ data }) => {
  const [value, setValue] = useState(false);
  return (
    <div className="bg-white dark:bg-black w-full">
      <div className="flex items-center justify-between p-3">
        <div className="w-full flex items-center gap-x-2">
          <Checkbox value={value} onChange={() => setValue(!value)} />
          <Sorting title="File Name" />
        </div>
        <div className="w-full flex items-center gap-x-6 justify-between">
          <Sorting title="File Id" />
          <Sorting title="Category" />
          <Sorting title="Upload Date" />
        </div>
      </div>
      <div>
        {data?.map((item, i) => (
          <PredictionListRow
            key={item?.id}
            data={item}
            value={value}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
};
const PredictionListRow = ({ data }) => {
  const [value, setValue] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">{data?.title}</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">{data?.id}</p>
        <p className="text-xs font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
          {data?.premium ? "Premium" : "Free"}
        </p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">
            {formatDateTime(data?.uploaded_at, "date")}
          </p>
          <button className="btn-transparent-dark btn-small btn-square">
            <Icon name="dots" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PredictionListMobile = ({ data }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
        {data?.premium ? "Premium" : "Free"}
      </p>
      <button className="btn-transparent-dark btn-small btn-square">
        <Icon name="dots" />
      </button>
    </div>
    <div className="flex items-end justify-between">
      <div className="space-y-1">
        <p className="text-sm font-bold">{data?.title}</p>
        <p className="text-xs">{data?.id}</p>
      </div>
      <p className="text-[#5F646D] dark:text-white text-xs">05/07/23</p>
    </div>
  </div>
);
