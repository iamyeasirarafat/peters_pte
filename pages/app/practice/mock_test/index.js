import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { formatDateTime } from "@/utils/formatDateTime";
import TablePagination from "@/components/TablePagination";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import toast, { LoaderIcon } from "react-hot-toast";

function Index() {
  const [testCount, setTestCount] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get("/mocktest/count");
        setTestCount(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCount();
  }, []);
  const mocktest = [
    {
      id: 1,
      name: "Full Mocktest",
      icon: "FMT",
      Items: testCount?.full || 0,
      url: "/app/practice/mock_test/full_mocktests",
    },
    {
      id: 2,
      name: "Speaking Mocktest",
      icon: "SMT",
      Items: testCount?.speaking || 0,
      url: "/app/practice/mock_test/speaking_mocktests",
    },
    {
      id: 3,
      name: "Reading Mocktest",
      icon: "RMT",
      Items: testCount?.reading || 0,
      url: "/app/practice/mock_test/reading_mocktests",
    },
    {
      id: 4,
      name: "Writing Mocktest",
      icon: "WMT",
      Items: testCount?.writting || 0,
      url: "/app/practice/mock_test/writting_mocktests",
    },
    {
      id: 5,
      name: "Listening Mocktest",
      icon: "LMT",
      Items: testCount?.listening || 0,
      url: "/app/practice/mock_test/listening_mocktests",
    },
  ];

  return (
    <DashboardLayout>
      <MockTestResultList />

      {/*  */}
      <div>
        <p className="text-lg font-extrabold">Mock Test Type</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
          {mocktest?.map((item, i) => (
            <MocktestCart key={i} item={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;

const MocktestCart = ({ item }) => {
  return (
    <Link
      href={item?.url}
      className="bg-secondary dark:bg-white/20 rounded-sm flex justify-start items-center gap-5 p-6"
    >
      <div
        className={`w-[2.88rem] h-[2.88rem] rounded-sm flex justify-center items-center bg-red text-white`}
      >
        <p className="text-white text-base font-bold">{item?.icon}</p>
      </div>
      <div>
        <p className="font-bold text-base">{item?.name}</p>
        <p className="text-sm flex items-center gap-x-2">
          <span className="font-bold">{item?.Items}</span> items
        </p>
      </div>
    </Link>
  );
};

const MockTestResultList = () => {
  const [reFetch, setReFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mockTestResultList, setMockTestResultList] = useState({});
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 5;

  // get mock test result list

  useEffect(() => {
    const getMockTestResultList = async () => {
      try {
        setLoading(false);
        const res = await axios.get(
          `/mocktest/practiced?page=${pageNumber}&limit=${pageLimit}`
        );
        setMockTestResultList(res?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    router.isReady && getMockTestResultList();
  }, [router.isReady, pageNumber, reFetch]);

  return (
    <div className="py-5">
      <p className="text-lg font-extrabold mb-3">My Test</p>
      {/*  */}
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-2">
          {mockTestResultList?.results?.map((item, i) => (
            <MockTestResultCard key={i} data={item} setReFetch={setReFetch} />
          ))}
        </div>
      )}
      <TablePagination
        pageNumber={pageNumber}
        totalPage={Math.ceil(mockTestResultList?.total / pageLimit)}
        prevNext={setPageNumber}
      />
    </div>
  );
};

const MockTestResultCard = ({ data, setReFetch }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState({
    state: false,
    data: {},
  });
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-3 border border-primary rounded-[15px]">
      <div className="space-y-1">
        <p className="text-base font-semibold text-gray capitalize">
          {data?.mocktest?.title}
        </p>
        <p className="text-sm text-gray opacity-75">
          Submitted At: {formatDateTime(data?.created_at, "full")}
        </p>
      </div>
      {/*  */}
      <div className="flex items-center gap-x-3">
        {/* delete button */}
        <button
          onClick={() => setOpenDeleteModal({ state: true, data: data })}
          className="w-8 h-8 rounded-full bg-red text-white flex items-center justify-center"
        >
          <GoTrash />
        </button>
        {/* check result */}
        <button
          onClick={() =>
            router.push({
              pathname: "/app/practice/mock_test/result",
              query: {
                id: data?.mocktest?.id,
                aid: data?.aid,
                type: data?.type,
              },
            })
          }
          className="py-2 px-3 bg-primary text-white font-medium rounded-full"
        >
          Check Result
        </button>
      </div>
      {openDeleteModal && (
        <MockTestResultDeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setReFetch={setReFetch}
        />
      )}
    </div>
  );
};

const MockTestResultDeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  setReFetch,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `/mocktest/${openDeleteModal?.data?.type}/${openDeleteModal?.data?.mocktest?.id}/answer/${openDeleteModal?.data?.aid}`
      );
      toast.success(res?.data?.message || "Deleted Successfully");
      setLoading(false);
      setOpenDeleteModal({ state: false, data: {} });
      setReFetch((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };
  return (
    <Modal
      title="Mock Test Result Delete"
      visible={openDeleteModal?.state}
      onClose={() => setOpenDeleteModal({ state: false, data: {} })}
    >
      <div>
        <h2 className="text-2xl font-medium capitalize">
          {openDeleteModal?.data?.mocktest?.title}
        </h2>
        <p className="text-base font-semibold">
          Are you sure you want to delete this mock test result?
        </p>
        {/* button */}
        <div className="flex items-center justify-end gap-x-3 mt-5">
          <button
            onClick={handleDelete}
            className="py-2 px-7 bg-primary text-white font-medium rounded-full flex items-center gap-x-2"
          >
            {loading && <LoaderIcon />} Yes
          </button>
          <button
            onClick={() => setOpenDeleteModal({ state: false, data: {} })}
            className="py-2 px-7 bg-red text-white font-medium rounded-full"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
