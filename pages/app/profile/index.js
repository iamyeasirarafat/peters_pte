import React from "react";
import DashboardLayout from "../layout";
import Image from "next/image";
import { MdCheckCircle, MdShoppingCartCheckout } from "react-icons/md";

function Index() {
  return (
    <DashboardLayout>
      <div className="mt-5">
        <h2 className="text-4xl text-gray flex items-center gap-x-10">
          User Profile
          <span className="text-[#949494] inline-block">Plan & Package</span>
        </h2>

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
        <div className="grid grid-cols-4 gap-x-5 mt-5 mb-20">
          {/* item */}
          {Array(4)
            .fill()
            .map((_, i) => (
              <div key={i}>
                {/* image */}
                <div className="w-full h-[285px]">
                  <div className="w-full h-full relative">
                    <Image
                      className="object-cover"
                      src="/images/payment/15days.png"
                      fill
                      alt="packages-image"
                    />
                  </div>
                </div>
                {/* button */}
                <button className="text-xl font-bold py-4 bg-blue text-white flex items-center justify-center gap-x-2 w-full">
                  <MdShoppingCartCheckout className="text-base" /> Buy Now
                </button>
                {/* Offers */}
                <div className="bg-secondary px-12 py-9 text-center">
                  <p className="text-2xl font-bold line-through">9.99 $</p>
                  <p className="text-5xl font-bold">5.99 $</p>
                  <div className="mt-8 space-y-3">
                    {Array(4)
                      .fill()
                      .map((_, i) => (
                        <p
                          key={i}
                          className="text-base flex items-center gap-x-2 text-[#515151]"
                        >
                          <MdCheckCircle className="text-sm text-lime-600" />{" "}
                          Unlimited Non AI Practice
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;
