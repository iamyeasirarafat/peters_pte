import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

// function Index() {
//   return <DashboardLayout>
//     <Assigned_Practice />
//   </DashboardLayout>;
// }

// export default Index;

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
  return (
    <div className="py-5">
      <p className="text-lg font-extrabold mb-3">My Test</p>
      {/*  */}
      <MockTestResultCard />
    </div>
  );
};

const MockTestResultCard = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-3 border border-primary rounded-[15px]">
      <div className="space-y-1">
        <p className="text-base font-semibold text-gray">
          VIP Full Test Mock Test 38A (New 2h Format)
        </p>
        <p className="text-sm text-gray opacity-75">
          Submitted at: 2024-05-26 16:58
        </p>
      </div>
      {/*  */}
      <div className="flex items-center gap-x-3">
        {/* delete button */}
        <button className="w-8 h-8 rounded-full bg-red text-white flex items-center justify-center">
          <GoTrash />
        </button>
        {/* check result */}
        <button
          onClick={() => router.push("/app/practice/mock_test/result")}
          className="py-2 px-3 bg-primary text-white font-medium rounded-full"
        >
          Check Result
        </button>
      </div>
    </div>
  );
};
