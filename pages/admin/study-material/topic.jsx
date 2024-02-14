import Layout from "@/components/Layout";
import axios from "axios";
import { set, useForm } from "react-hook-form";

// ============================================
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useState } from "react";
import { useEffect } from "react";
import { formatDateTime } from "@/utils/formatDateTime";
import Loading from "@/components/Loading";
import toast, { LoaderIcon } from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { MultiActions } from "../../../components/Students_list";

function Topic() {
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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
      setUploading(true);
      const res = await axios.post("/topic", data);
      toast.success("Topic added successfully");
      reset();
      setRefetch(!reFetch);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      toast.error(error?.response?.data?.title[0] || "Something went wrong");
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
          disabled={uploading}
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
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
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
          <th className="th-custom text-center">
            <Sorting title="Create Date" />
          </th>
          <th className="th-custom text-center">
            {deleteUserList?.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenMultiActions(!openMultiActions)}
                  className="btn-transparent-dark btn-small btn-square"
                >
                  <Icon name="dots" />
                </button>
                {openMultiActions && (
                  <MultiActions
                    type="Topic"
                    deleteUserList={deleteUserList}
                    setDeleteUserList={setDeleteUserList}
                    setOpenMultiActions={setOpenMultiActions}
                    setStatus={setRefetch}
                  />
                )}
              </div>
            )}
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
            deleteUserList={deleteUserList}
            setDeleteUserList={setDeleteUserList}
          />
        ))}
      </tbody>
    </table>
  );
};

const TopicRow = ({
  data,
  openItemId,
  setOpenItemId,
  setRefetch,
  deleteUserList,
  setDeleteUserList,
}) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(data.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [data, deleteUserList]);
  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox
          value={value}
          onChange={() => {
            setValue(!value);
            if (!value) {
              setDeleteUserList((prev) => [...prev, data.id]);
            } else {
              setDeleteUserList((prev) => prev.filter((i) => i !== data.id));
            }
          }}
        />
        <p className="text-sm font-bold">{data?.title}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#{data?.id}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">{data?.file}</p>
      </td>
      <td className="th-custom text-center">
        <p className="text-sm"> {formatDateTime(data?.created_at, "date")}</p>
      </td>
      <td className="td-custom text-center">
        <div className="relative">
          <button
            onClick={() =>
              setOpenItemId(data?.id === openItemId ? null : data?.id)
            }
            disabled={deleteUserList?.length > 0}
            className={`btn-transparent-dark btn-small btn-square ${
              deleteUserList?.length > 0 && "cursor-not-allowed opacity-20"
            }`}
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
  const [loading, setLoading] = useState(false);
  const handelDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/topic/${id}`);
      toast.success("Deleted Successfully");
      setRefetch && setRefetch((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.title[0]);
      setLoading(false);
    }
  };
  return (
    <div className="bg-secondary rounded shadow absolute top-1/2 p-2 right-[60%]">
      <button
        className="flex items-center gap-x-2 hover:text-red duration-200 rounded-md py-1 px-2"
        onClick={handelDelete}
        disabled={loading}
      >
        {loading ? <LoaderIcon /> : <GoTrash />} Delete
      </button>
    </div>
  );
};
