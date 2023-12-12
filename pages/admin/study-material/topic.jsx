import Layout from "@/components/Layout";
import axios from "axios";
import { useForm } from "react-hook-form";

// ============================================
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useState } from "react";
import { useEffect } from "react";
import { formatDateTime } from "../../../utils/formatDateTime";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

function Topic() {
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setRefetch] = useState(false);
  const [topic, setTopic] = useState([]);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 7;
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getTopic = async () => {
      const { data } = await axios.get(
        `/topic?limit=${pageLimit}&page=${pageNumber}`
      );
      setTopic(data);
      setIsLoading(false);
    };
    getTopic();
  }, [reFetch, pageNumber]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/topic", data);
      toast.success("Topic added successfully");
      reset();
      setRefetch(!reFetch);
    } catch (error) {
      toast.error(error?.response?.data?.title[0]);
    }
  };
  return (
    <Layout title="Study Material / Topic" back>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <p className="text-xs font-bold">Topic Name</p>
        <input
          {...register("title")}
          className="p-5 bg-white text-gray font-semibold outline-none border-0 w-full ring-0 focus:ring-0"
          placeholder="Vocabulary"
          type="text"
        />
        <button
          className="bg-primary py-4 w-full text-center text-base font-bold"
          type="submit"
        >
          Create Topic
        </button>
      </form>
      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : mounted && isTablet ? (
          <TopicMobile data={topic?.results} setRefetch={setRefetch} />
        ) : (
          <TopicList data={topic?.results} setRefetch={setRefetch} />
        )}
      </div>
      <TablePagination
        pageNumber={pageNumber}
        totalPage={Math.ceil(topic?.total / pageLimit)}
        prevNext={setPageNumber}
      />
    </Layout>
  );
}

export default Topic;

const TopicList = ({ data, setRefetch }) => {
  const [value, setValue] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  return (
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom flex items-center gap-x-4">
            <Checkbox value={value} onChange={() => setValue(!value)} />
            <Sorting title="Topic Name" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Topic Id" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="File Number" />
          </th>
          <th className="th-custom text-end">
            <Sorting title="Create Date" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <TopicRow
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

const TopicRow = ({ data, openItemId, setOpenItemId, setRefetch }) => {
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
        <p className="text-sm">{data?.file}</p>
      </td>
      <td className="td-custom flex items-center justify-end gap-x-3">
        <p className="text-sm"> {formatDateTime(data?.created_at, "date")}</p>
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
            <TopicMore id={data?.id} setRefetch={setRefetch} />
          )}
        </div>
      </td>
    </tr>
  );
};

const TopicMobile = ({ data, setRefetch }) => {
  const [showDelete, setShowDelete] = useState(null);
  return (
    <div className="bg-white dark:bg-black">
      {data?.map((item) => (
        <div key={item?.id} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">{item?.file}</p>
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
                <TopicMore id={item?.id} setRefetch={setRefetch} />
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
              {formatDateTime(item?.created_at, "date")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TopicMore = ({ id, setRefetch }) => {
  const handelDelete = async () => {
    const res = await axios.delete(`/topic/${id}`);
    toast.success("Topic Deleted");
    setRefetch && setRefetch((prev) => !prev);
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
