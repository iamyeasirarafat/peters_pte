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

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mocktest_List } = router.query || {};
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [mockTestList, setMockTestList] = useState([]);
  useEffect(() => {
    const getMockTest = async () => {
      setIsLoading(true);
      const res = await axios.get(`/${mocktest_List}`);
      setMockTestList(res?.data);
      setIsLoading(false);
    };
    router.isReady && getMockTest();
  }, [mocktest_List, router.isReady]);

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
        <MocktestList data={mockTestList} />
      )}
    </Layout>
  );
}

export default Index;

const MocktestList = ({ data }) => {
  const [showDot, setShowDot] = useState("");
  const [value, setValue] = useState(false);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="th-custom flex items-center gap-x-4 min-w-[400px]">
              <Checkbox value={value} onChange={() => setValue(!value)} />
              <Sorting title="Question Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Question Id" />
            </th>
            <th className="th-custom flex items-center justify-end gap-x-3">
              <Sorting title="Upload Date" />
              <button className="btn-transparent-dark btn-small btn-square">
                <Icon name="dots" />
              </button>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MocktestListRow = ({ item, showDot, setShowDot }) => {
  const [value, setValue] = useState(false);
  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">{item?.title}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#{item?.id}</p>
      </td>
      <td className="td-custom flex items-center justify-end gap-x-3">
        <p className="text-sm">{formatDateTime(item?.created_at, "date")}</p>
        <button
          onClick={() => setShowDot(showDot === item?.id ? null : item?.id)}
          // onBlur={() => setShowDot(null)}
          className="px-3 btn-transparent-dark btn-small btn-square relative"
        >
          <Icon name="dots" />
          {showDot === item?.id && <ActionDialog />}
        </button>
      </td>
    </tr>
  );
};

const MocktestLisMobile = ({ data }) => {
  const [showDot, setShowDot] = useState("");
  return (
    <div
      className={`bg-white dark:bg-black p-4 mt-4 ${
        data?.length > 0 && "space-y-3"
      }`}
    >
      {data?.map((item, i) => {
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

const ActionDialog = () => {
  return (
    <div className="bg-white py-2 z-50 px-3 rounded-md shadow absolute right-8 top-1/2 space-y-2">
      <button
        onClick={(e) => e.stopPropagation()}
        className="text-black hover:text-green-500 duration-200"
      >
        Edit
      </button>
      <button className="text-black hover:text-red duration-200">Delete</button>
    </div>
  );
};
