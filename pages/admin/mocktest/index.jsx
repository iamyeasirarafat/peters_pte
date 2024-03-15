import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const [testCount, setTestCount] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      const res = await axios.get("/mocktest/count");
      setTestCount(res?.data);
    };
    getCount();
  }, []);
  const mocktest = [
    {
      id: 1,
      name: "Full Mocktest",
      icon: "MT",
      Items: testCount?.full || 0,
      url: "/admin/mocktest/full_mocktests",
    },
    {
      id: 2,
      name: "Speaking Mocktest",
      icon: "SMT",
      Items: testCount?.speaking || 0,
      url: "/admin/mocktest/speaking_mocktests",
    },
    {
      id: 3,
      name: "Listening Mocktest",
      icon: "LMT",
      Items: testCount?.listening || 0,
      url: "/admin/mocktest/listening_mocktests",
    },
    {
      id: 4,
      name: "Writing Mocktest",
      icon: "WMT",
      Items: testCount?.writting || 0,
      url: "/admin/mocktest/writting_mocktests",
    },
    {
      id: 5,
      name: "Reading Mocktest",
      icon: "RMT",
      Items: testCount?.reading || 0,
      url: "/admin/mocktest/reading_mocktests",
    },
  ];
  return (
    <Layout title="Mocktest">
      <p className="text-lg font-extrabold">Mock Test Type</p>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
        {mocktest?.map((item, i) => (
          <MocktestCart key={i} item={item} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

const MocktestCart = ({ item }) => {
  return (
    <Link
      href={item?.url}
      className="bg-white dark:bg-black rounded-sm flex justify-start items-center gap-5 p-6"
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
