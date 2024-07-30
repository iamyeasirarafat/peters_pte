import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import Image from "next/image";
import { MdCheckCircle, MdShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import { StudentProfileInfo } from "../../organization/student-details";
import { BiRightArrowAlt, BiSolidEditAlt } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

function Index() {
  const [fetch, setFetch] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/student/" + 32);
      setStudentDetails(res?.data);
    };
    // fetchData();
  }, [fetch]);

  return (
    <DashboardLayout>
      <div className="mt-5">
        {/* page title */}
        <h2 className="text-4xl text-gray flex items-center gap-x-10">
          User Profile
          <span className="text-[#949494] inline-block">Plan & Package</span>
        </h2>
        {/* Student Profile info */}
        <div className="grid grid-cols-12 divide-x-2 gap-x-20 gap-y-5 bg-secondary p-4 md:pl-18 md:pr-10 md:py-10 mt-4 mb-13 border border-primary rounded-md">
          <div className="md:col-span-4 col-span-12 mt-15">
            <StudentProfileInfo
              data={studentDetails}
              setFetch={setFetch}
              user
            />
          </div>
          <div className="md:col-span-8 col-span-12 w-full">
            {/* Student Details Right Side */}
            <StudentDetailsRightSide />
          </div>
        </div>
        {/* Student Pack */}
        <StudentPack />
      </div>
    </DashboardLayout>
  );
}

export default Index;

// Student Details Right Side Component//

const StudentDetailsRightSide = () => {
  return (
    <div>
      <div className="bg-[url('/images/student_progress.svg')] w-auto bg-cover bg-center bg-no-repeat px-5 pt-9 pb-7">
        <h2 className="text-2xl font-extrabold text-black">
          Student Progress & Performance
        </h2>
        <div className="flex items-center gap-x-2 mt-2">
          <button className="flex items-center gap-x-2 bg-primary py-2.5 px-4 justify-center text-xs font-bold">
            PTE Progress <BiRightArrowAlt className="text-base" />
          </button>
          <button className="flex items-center gap-x-2 bg-primary py-2.5 px-4 justify-center text-xs font-bold">
            PTE Performance <BiRightArrowAlt className="text-base" />
          </button>
        </div>
      </div>
      {/* Student Plan */}
      <div className="bg-[url('/images/current_plan_bg.png')] w-full bg-cover bg-center bg-no-repeat mt-5">
        <h2 className="text-2xl font-extrabold text-black p-5">
          Your Current Plan
        </h2>
        <div className="bg-white  left-0 bottom-0 w-[50%] p-5">
          <h2 className="font-extrabold">Free</h2>
          <p>Go premium to get premium all access feature</p>
        </div>
      </div>
      {/* // Security// */}
      <div className="bg-white dark:bg-white/20 p-5 mt-5">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-extrabold">Security</p>
          <button
            // onClick={() =>
            //   setOpenChangePassword({ state: true, student: data?.id })
            // }
            className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold rounded-sm"
          >
            <BiSolidEditAlt /> Update Password
          </button>
        </div>
        <div className="flex items-center gap-x-13">
          <div>
            <p className="text-sm">User Name</p>
            <p className="text-sm font-bold">Eshak Khan</p>
          </div>
          <div>
            <p className="text-sm">Password</p>
            <p className="text-sm font-bold">**************</p>
          </div>
        </div>
        {/* <ChangePassword
          openChangePassword={openChangePassword}
          setOpenChangePassword={setOpenChangePassword}
        /> */}
      </div>
      {/* //Transaction History// */}
      <div className="bg-[url('/images/transaction_history.png')] w-full bg-cover bg-center bg-no-repeat mt-5 pb-28">
        <h2 className="text-2xl font-extrabold text-white p-5">
          Transaction History
        </h2>
        <div className="pl-5 space-y-2 font-extrabold">
          <button className="bg-white flex items-center py-2 px-4 gap-3">
            <h3>See All Your Transaction</h3>
            <FaArrowRight />
          </button>
          <button className="bg-white flex items-center py-2 px-4 gap-3">
            <h3>Cancel auto renew</h3>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

//Student pack//

const StudentPack = () => {
  const [studentPack, setStudentPack] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/packages/student");
      setStudentPack(res?.data);
    };
    getData();
  }, []);
  return (
    <div>
      {/* packages section */}
      <div className="flex items-end justify-between">
        <p className="text-4xl text-gray">Plan & Package</p>
        <div className="flex items-center gap-x-2">
          <div className="w-[226px] h-[96px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/images/payment/best-price.svg"
                fill
                alt="price-image"
              />
            </div>
          </div>
          <div className="w-[227px] h-[96px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/images/payment/satisisfaction.svg"
                fill
                alt="price-image"
              />
            </div>
          </div>
        </div>
      </div>
      {/* packages */}
      <div className="grid grid-cols-4 gap-x-5 mt-5 mb-20 font-cabin">
        {/* item */}
        {studentPack?.map((pack, i) => (
          <div key={i} className="h-full bg-secondary">
            {/* image */}
            <div className="w-full h-[285px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src={pack?.thumbnail}
                  fill
                  alt="packages-image"
                />
              </div>
            </div>
            {/* button */}
            <button
              onClick={() =>
                router.push(`/app/profile/checkout?id=${pack?.id}`)
              }
              className="text-xl font-bold py-4 bg-blue text-white flex items-center justify-center gap-x-2 w-full"
            >
              <MdShoppingCartCheckout className="text-base" /> Buy Now
            </button>
            {/* Offers */}
            <div className="px-12 py-9 text-center max-h-full">
              <p className="text-2xl font-bold line-through">
                {pack?.pre_price} $
              </p>
              <p className="text-5xl font-bold">{pack?.cost} $</p>
              <div className="mt-8 space-y-1">
                {pack?.text?.map((item, i) => (
                  <p
                    key={i}
                    className="text-base flex items-center gap-x-2 text-[#515151]"
                  >
                    <MdCheckCircle className="text-sm text-lime-600" />
                    {item?.premium_feature}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
