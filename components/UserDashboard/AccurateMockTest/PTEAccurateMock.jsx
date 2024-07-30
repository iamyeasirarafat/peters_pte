import React, { useEffect, useState } from "react";

import BestRecordCard from "../Cards/BestRecordCard";
import WhiteBGButton from "../Buttons/WhiteBGButton";
import axios from "axios";

export default function PTEAccurateMock() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios("/best_record").then(({ data }) => {
      const structuredData = [];
      Object.keys(data).forEach((item) => {
        const dd = {
          value: data[item] > 0 ? data[item] : null,
          title: `${item} test`,
        };
        structuredData.push(dd);
      });
      setData(structuredData);
    });
  }, []);

  return (
    <div className="flex mb-20 flex-col md:flex-row justify-between bg-[url('/images/ptemocktest.png')] w-full bg-clip-content md:bg-cover  rounded-[15px] my-[25px] text-white">
      {/* first element */}
      <div className="flex flex-col justify-center w-full border-b border-b-white md:border-b-0 md:border-r-2 md:border-r-white py-10">
        <h2 className="text-[26px] lg:text-[36px] font-normal mx-auto md:ml-7 lg:ml-10 mb-5">
          PTE accurate Mock Test
        </h2>
        <div className="flex gap-3 mx-auto md:mx-5 lg:ml-10">
          <WhiteBGButton title={"Full Mock test"} />
          <WhiteBGButton title={"Sectional Mocktest"} />
        </div>
      </div>

      {/* second element */}
      <div className="pl-3 md:pl-0 flex items-center w-full border-t border-l-white md:border-t-0 md:border-l-2 md:border-r-white py-10">
        <div>
          <h2 className="text-[21px] ml-10">Your Best Record Till Now</h2>
          <div className="ml-10 flex gap-2 mt-2">
            {/* record card */}
            <div className="grid grid-cols-2 gap-2">
              {data &&
                data.map((item, i) => <BestRecordCard key={i} data={item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
