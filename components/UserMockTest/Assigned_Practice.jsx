import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
// import ScoredText from "../Components/Scored_test.jsx";
import { useRouter } from "next/router";
import axios from "axios";

export default function Assigned_Practice() {
  const router = useRouter();
  // console.log(router.query.mock_type, "slug");
  const [practiceList, setPracticeList] = useState([]);
  useEffect(() => {
    const getPracticeMockTest = async () => {
      try {
        const { data } = await axios.get(`/${router.query.mock_type}`);

        setPracticeList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPracticeMockTest();
  }, []);

  const data = [
    {
      name: "A",
      total_ques: 63,
      time: 124,
    },
    {
      name: "B",
      total_ques: 62,
      time: 124,
    },
    {
      name: "C",
      total_ques: 62,
      time: 124,
    },
    {
      name: "D",
      total_ques: 63,
      time: 124,
    },
  ];
  return (
    <div className="mx-5 flex flex-col justify-start">
      <p className="text-3xl my-5 text-zinc-600 font-light mx-auto">
        Assigned Practice
      </p>

      {practiceList?.map((single_data, i) => {
        return <TestListItem key={i} data={single_data} />;
      })}
    </div>
  );
}

const TestListItem = ({ data }) => {
  const router = useRouter();
  return (
    <Link
      href={`/app/practice/mock_test/${router.query.mock_type}/${data?.name}`}
    >
      <div className="w-full mb-6 cursor-pointer">
        {/* card title  */}
        <div className="w-full bg-primary px-4 py-1 mb-3">
          <p className="text-xl text-white font-medium">{data?.title}</p>
        </div>
        {/* card body */}
        <div className="px-4 space-y-2 text-gray">
          <p className="font-semibold">Scored Test A (2 hour)</p>
          <div className="flex items-center gap-3">
            <p>{data?.total_question} Questions</p>
            <p>Time: 124mins</p>
          </div>
          <FaLock className="text-3xl text-zinc-500" />
        </div>
      </div>
    </Link>
  );
};
