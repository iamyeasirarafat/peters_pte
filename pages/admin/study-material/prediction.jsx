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
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const Index = () => {
  const [reFetch, setRefetch] = useState(false);
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
        <PredictionListMobile data={prediction?.results} />
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
  const [openItemId, setOpenItemId] = useState(null);
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
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
          />
        ))}
      </div>
    </div>
  );
};
const PredictionListRow = ({ data, openItemId, setOpenItemId }) => {
  const [value, setValue] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">{data?.title}</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">#{data?.id}</p>
        <p className="text-xs font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
          {data?.premium ? "Premium" : "Free"}
        </p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">
            {formatDateTime(data?.uploaded_at, "date")}
          </p>
          <div className="relative">
            <button
              onClick={() =>
                setOpenItemId(data?.id === openItemId ? null : data?.id)
              }
              className="btn-transparent-dark btn-small btn-square"
            >
              <Icon name="dots" />
            </button>
            {data?.id === openItemId && <StudyMore id={data?.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PredictionListMobile = ({ data }) => {
  const [showDelete, setShowDelete] = useState(null);
  return (
    <div className="bg-white dark:bg-black">
      {data?.map((item) => (
        <div key={item?.id} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
              {item?.premium ? "Premium" : "Free"}
            </p>
            <div className="relative">
              <button
                onClick={() =>
                  setShowDelete(item?.id === showDelete ? null : item?.id)
                }
                className="btn-transparent-dark btn-small btn-square"
              >
                <Icon name="dots" />
              </button>
              {showDelete === item?.id && <StudyMore id={item?.id} />}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-sm font-bold">{item?.title}</p>
              <p className="text-xs">#{item?.id}</p>
            </div>
            <p className="text-[#5F646D] dark:text-white text-xs">
              {" "}
              {formatDateTime(item?.uploaded_at, "date")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const StudyMore = ({ id }) => {
  const handelDelete = async () => {
    const res = await axios.delete(`/study_material/${id}`);
    toast.success("File Deleted");
  };
  return (
    <div className="bg-white rounded shadow absolute top-1/2 p-2 right-full">
      <button
        className="flex items-center gap-x-2 border border-red rounded-md py-1 px-2"
        onClick={handelDelete}
      >
        <GoTrash /> Delete
      </button>
    </div>
  );
};
