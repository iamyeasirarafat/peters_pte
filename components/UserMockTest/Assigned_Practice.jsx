import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
// import ScoredText from "../Components/Scored_test.jsx";
import { useRouter } from "next/router";
import axios from "axios";

export default function Assigned_Practice() {
  const [mockTestData, setMockTestData] = useState([]);
  const router = useRouter();
  const testName = router.query.mock_type;
  console.log("testName", testName, "mockTestData", mockTestData);
  useEffect(() => {
    const getMockTestData = async () => {
      try {
        const res = await axios.get(testName);
        setMockTestData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    router?.isReady && getMockTestData();
  }, [router]);
  return (
    <div className="mx-5 flex flex-col justify-start">
      <p className="text-3xl my-5 text-zinc-600 font-light mx-auto">
        Assigned Practice
      </p>

      {mockTestData?.map((single_data, i) => {
        return <TestListItem key={i} data={single_data} />;
      })}
    </div>
  );
}

const TestListItem = ({ data }) => {
  const router = useRouter();
  return (
    <Link
      href={`/app/practice/mock_test/${router.query.mock_type}/${data?.id}`}
    >
      <div className="w-full mb-6 cursor-pointer">
        {/* card title  */}
        <div className="w-full bg-primary px-4 py-1 mb-3">
          <p className="text-xl text-white font-medium">
            Scored Test {data?.title}
          </p>
        </div>
        {/* card body */}
        <div className="px-4 space-y-2 text-gray">
          <p className="font-semibold">
            Scored Test ({parseFloat(data?.time / 60).toFixed(2)} hour)
          </p>
          <div className="flex items-center gap-3">
            <p>{data?.total_question} Questions</p>
            <p>Time: {data?.time}mins</p>
          </div>
          <FaLock className="text-3xl text-zinc-500" />
        </div>
      </div>
    </Link>
  );
};
