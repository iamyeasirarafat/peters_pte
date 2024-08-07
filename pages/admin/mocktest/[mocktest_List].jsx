import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { formatDateTime } from "@/utils/formatDateTime";
import { MultiActions } from "@/components/Students_list";
import toast, { LoaderIcon } from "react-hot-toast";
import TablePagination from "@/components/TablePagination";
import { FiEdit } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";

function Index() {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;
  const router = useRouter();
  const { mocktest_List } = router.query || {};
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [mockTestList, setMockTestList] = useState([]);
  useEffect(() => {
    const getMockTest = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/${mocktest_List}?limit=${pageLimit}&page=${pageNumber}`
        );
        setMockTestList(res?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    router.isReady && getMockTest();
  }, [mocktest_List, router.isReady, status, pageNumber]);

  // formate test list name for delete many
  const convertToCamelCase = (inputString) => {
    inputString = inputString.replace(/s$/, "");
    return inputString
      .replace(/_([a-z])/g, function (match, group1) {
        return group1.toUpperCase();
      })
      .replace(/^./, function (match) {
        return match.toUpperCase();
      });
  };
  return (
    <Layout title={mocktest_List?.replace(/_/g, " ")} back>
      <div>
        <button
          onClick={() =>
            router.push(`/admin/mocktest/add-mocktest/${mocktest_List}`)
          }
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <AiFillPlusCircle />
          Create New Question
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : mounted && isTablet ? (
        <MocktestLisMobile data={mockTestList} />
      ) : (
        <>
          <MocktestList
            data={mockTestList?.results}
            setStatus={setStatus}
            convertToCamelCase={convertToCamelCase}
            mocktest_List={mocktest_List}
          />
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(mockTestList?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </>
      )}
    </Layout>
  );
}

export default Index;

const MocktestList = ({
  data,
  setStatus,
  convertToCamelCase,
  mocktest_List,
}) => {
  const [showDot, setShowDot] = useState("");
  const [value, setValue] = useState(false);
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-white/20 w-full">
        <thead>
          <tr>
            <th className="th-custom">
              <div className=" flex items-center gap-x-3">
                <Checkbox value={value} onChange={() => setValue(!value)} />
                <Sorting title="Question Name" />
              </div>
            </th>
            <th className="th-custom text-center">
              <Sorting title="Question Id" />
            </th>
            <th className="th-custom text-right">
              <Sorting title="Upload Date" />
            </th>
            <th className="th-custom relative">
              {deleteUserList?.length > 0 && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setOpenMultiActions(!openMultiActions)}
                    className="btn-transparent-dark btn-small btn-square"
                  >
                    <Icon name="dots" />
                  </button>
                  {openMultiActions && (
                    <MultiActions
                      type={convertToCamelCase(mocktest_List)}
                      deleteUserList={deleteUserList}
                      setDeleteUserList={setDeleteUserList}
                      setOpenMultiActions={setOpenMultiActions}
                      setStatus={setStatus}
                    />
                  )}
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <MocktestListRow
              key={i}
              item={item}
              showDot={showDot}
              setShowDot={setShowDot}
              deleteUserList={deleteUserList}
              setDeleteUserList={setDeleteUserList}
              setStatus={setStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MocktestListRow = ({
  item,
  showDot,
  setShowDot,
  deleteUserList,
  setDeleteUserList,
  setStatus,
}) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(item.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [item, deleteUserList]);
  return (
    <tr>
      <td className="td-custom">
        <div className=" flex items-center gap-x-3">
          <Checkbox
            value={value}
            onChange={() => {
              setValue(!value);
              if (!value) {
                setDeleteUserList((prev) => [...prev, item.id]);
              } else {
                setDeleteUserList((prev) => prev.filter((i) => i !== item.id));
              }
            }}
          />
          <p className="text-sm font-bold">{item?.title}</p>
        </div>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#{item?.id}</p>
      </td>
      <td className="td-custom text-right">
        <p className="text-sm">{formatDateTime(item?.created_at, "date")}</p>
      </td>
      <td className="td-custom text-right relative">
        <button
          onClick={() => setShowDot(showDot === item?.id ? null : item?.id)}
          disabled={deleteUserList?.length > 0}
          className={`btn-transparent-dark btn-small btn-square ${
            deleteUserList?.length > 0 && "cursor-not-allowed opacity-20"
          }`}
        >
          <Icon name="dots" />
        </button>
        {showDot === item?.id && (
          <ActionDialog setStatus={setStatus} id={item?.id} />
        )}
      </td>
    </tr>
  );
};

const MocktestLisMobile = ({ data }) => {
  const [showDot, setShowDot] = useState("");
  return (
    <div
      className={`bg-white dark:bg-white/20 p-4 mt-4 ${
        data?.results?.length > 0 && "space-y-3"
      }`}
    >
      {data?.results?.map((item, i) => {
        return (
          <div key={item?.id}>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                {formatDateTime(item?.created_at, "date")}
              </p>
              <button
                onClick={() =>
                  setShowDot(showDot === item?.id ? null : item?.id)
                }
                // onBlur={() => setShowDot(null)}
                className="px-3 relative"
              >
                <Icon name="dots" />
                {showDot === item?.id && <ActionDialog />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">{item?.title}</p>
              <p className="text-sm">#{item?.id}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ActionDialog = ({ setStatus, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mocktest_List } = router.query || {};
  const modifiedString = mocktest_List.slice(0, -1);
  const handelDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/${modifiedString}/${id}`);
      toast.success(res?.data?.message || "Deleted Successfully");
      setStatus((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-secondary py-2 px-4 z-50  rounded-md shadow absolute left-1/3 top-1/2 space-y-2 text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/mocktest/add-mocktest/${mocktest_List}?id=${id}`);
        }}
        className="text-black hover:text-gray flex items-center gap-x-2 text-base duration-200"
      >
        <FiEdit /> Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handelDelete();
        }}
        className="text-black flex items-center gap-x-2 text-base hover:text-red duration-200"
      >
        {isLoading ? <LoaderIcon /> : <PiTrash />} Delete
      </button>
    </div>
  );
};
