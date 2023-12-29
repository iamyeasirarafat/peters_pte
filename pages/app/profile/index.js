import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import Image from "next/image";
import { MdCheckCircle, MdShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

function Index() {
  return (
    <DashboardLayout>
      <div className="mt-5">
        {/* page title */}
        <h2 className="text-4xl text-gray flex items-center gap-x-10">
          User Profile
          <span className="text-[#949494] inline-block">Plan & Package</span>
        </h2>
        <StudentPack />
      </div>
    </DashboardLayout>
  );
}

export default Index;

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
