import Link from "next/link";
import React from "react";
import { FaLock } from "react-icons/fa";
// import ScoredText from "../Components/Scored_test.jsx";

export default function Assigned_Practice() {
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

     
      {data.map((single_data, i) => {
        return  <TestListItem key={i} data={single_data} />
      })}
    </div>
  );
}



const TestListItem=({data})=>{
  return(
    <Link href={`/app/practice/mock_test/${data?.name}`}>
<div className="w-full mb-6 cursor-pointer">
        {/* card title  */}
        <div className="w-full bg-primary px-4 py-1 mb-3">
          <p className="text-xl text-white font-medium">Scored Test {data?.name}</p>
        </div>
        {/* card body */}
        <div className="px-4 space-y-2 text-gray">
          <p className="font-semibold">Scored Test A (2 hour)</p>
          <div className="flex items-center gap-3">
          <p>63 Questions</p>
          <p>Time: 124mins</p>
          </div>
          <FaLock className="text-3xl text-zinc-500" />
        </div>
      </div>
      </Link>
  )
}

