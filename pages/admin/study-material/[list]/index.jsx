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
import { formatDateTime } from "@/utils/formatDateTime";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FaEdit } from "react-icons/fa";

const Index = () => {
  const [reFetch, setRefetch] = useState(false);
  const [prediction, setPrediction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 8;

  const { list } = router.query;
  console.log("list", list);
  // get prediction data
  useEffect(() => {
    const getStudyPrediction = async () => {
      const res = await axios.get(
        `/study_materials/${list}?limit=${pageLimit}&page=${pageNumber}`
      );
      setPrediction(res?.data);
      setIsLoading(false);
    };
    getStudyPrediction();
  }, [reFetch, pageNumber, list]);

  return (
    <Layout title={list?.replace("_", " ")} back>
      <div className="mb-5">
        <button
          onClick={() => router.push(`/admin/study-material/form/add-${list}`)}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <AiFillPlusCircle />
          Create New {list?.replace("_", " ")}
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : mounted && isTablet ? (
        <PredictionListMobile
          data={prediction?.results}
          setRefetch={setRefetch}
        />
      ) : (
        <PredictionList data={prediction?.results} setRefetch={setRefetch} />
      )}
      <TablePagination
        pageNumber={pageNumber}
        totalPage={Math.ceil(prediction?.total / pageLimit)}
        prevNext={setPageNumber}
      />
    </Layout>
  );
};

export default Index;

export const PredictionList = ({ data, setRefetch }) => {
  const [value, setValue] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  return (
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom flex items-center gap-x-4">
            <Checkbox value={value} onChange={() => setValue(!value)} />
            <Sorting title="File Name" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="File Id" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Category" />
          </th>
          <th className="th-custom text-end">
            <Sorting title="Upload Date" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <PredictionListRow
            key={item?.id}
            data={item}
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
            setRefetch={setRefetch}
          />
        ))}
      </tbody>
    </table>
  );
};

const PredictionListRow = ({ data, openItemId, setOpenItemId, setRefetch }) => {
  const [value, setValue] = useState(false);
  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">{data?.title}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#{data?.id}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-xs font-bold border border-black dark:border-white py-1 px-3 rounded-sm inline-block">
          {data?.premium ? "Premium" : "Free"}
        </p>
      </td>
      <td className="td-custom flex items-center justify-end gap-x-3">
        <p className="text-sm">{formatDateTime(data?.uploaded_at, "date")}</p>
        <div className="relative">
          <button
            onClick={() =>
              setOpenItemId(data?.id === openItemId ? null : data?.id)
            }
            className="btn-transparent-dark btn-small btn-square"
          >
            <Icon name="dots" />
          </button>
          {data?.id === openItemId && (
            <StudyMore id={data?.id} setRefetch={setRefetch} />
          )}
        </div>
      </td>
    </tr>
  );
};

export const PredictionListMobile = ({ data, setRefetch }) => {
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
              {showDelete === item?.id && (
                <StudyMore id={item?.id} setRefetch={setRefetch} />
              )}
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

const StudyMore = ({ id, setRefetch }) => {
  const handelDelete = async () => {
    const res = await axios.delete(`/study_material/${id}`);
    toast.success("File Deleted");
    setRefetch && setRefetch((prev) => !prev);
  };
  return (
    <div className="bg-secondary rounded shadow absolute top-1/2 p-2 right-full space-y-2">
      <button className="flex items-center gap-x-2 border border-green-500 hover:text-green-500 duration-200 rounded-md py-1 px-2">
        <FaEdit /> Edit
      </button>
      <button
        className="flex items-center gap-x-2 border border-red hover:text-red duration-200 rounded-md py-1 px-2"
        onClick={handelDelete}
      >
        <GoTrash /> Delete
      </button>
    </div>
  );
};
