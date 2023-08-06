import Image from "next/image";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

const page = () => {
  return (
    <div>
      {/* Read Aloud top */}
      <div className="py-[10px] px-5 border border-primary rounded-[15px] mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-gray text-4xl">Read Aloud</h1>
          <div className="flex items-center gap-x-2">
            <button className="bg-primary rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
              <div className="w-[27px] h-[14px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/icons/grow.svg"
                    alt="grow icon"
                    fill
                  />
                </div>
              </div>
            </button>
            <button className="bg-primary rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
              <div className="w-[27px] h-[17px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/icons/video.svg"
                    alt="grow icon"
                    fill
                  />
                </div>
              </div>
            </button>
            <button className="bg-primary rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
              <div className="w-[8px] h-[21px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/icons/i.svg"
                    alt="grow icon"
                    fill
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <p className="text-gray text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      {/* read aloud box  */}
      <div className="relative border border-primary rounded-[15px] mt-14 pb-4">
        {/* top button */}
        <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Prediction
          </button>
          <button className="text-gray py-1 px-3 rounded-t-md text-base bg-[#F4D1B1]">
            Practiced (1)
          </button>
          <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
            Appeared (12)
          </button>
        </div>
        <div className="bg-secondary rounded-t-[15px] py-2 pl-8 pr-5 flex items-center justify-between">
          <p className="text-[#ACACAC] text-xl">Bill | Q No. #7250589</p>
          <div className="flex items-center gap-x-5">
            <div className="w-[28px] h-[29px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/page.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
            <div className="w-[17px] h-[28px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/bookmark.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="border border-primary rounded-[15px] mt-6 ml-8 mr-5 pt-3 pb-4 px-5">
          <p className="text-xl">
            The bill calls for the establishment of the National Landslide
            Hazards Reduction Program within one year of becoming law. The
            program serves numerous functions, including to identify and
            understand landslide hazards and risks, reduce losses from
            landslides, protect communities at risk of landslides hazards, and
            improve communication and emergency preparedness.
          </p>
          {/*  */}
          <div className="mt-[40px] flex justify-end">
            <button className="w-[34px] h-[27px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/speker.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </button>
          </div>
        </div>
        {/*  */}
        <div className="border border-primary rounded-[15px] mt-3 ml-8 mr-5 p-4 flex flex-col items-center justify-center">
          <button className="w-[70px] h-[70px] bg-primary rounded-full flex items-center justify-center">
            <div className="w-[28px] h-[44px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/mic.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </button>
          <p className="text-base text-gray">Click To Start</p>
          <p className="text-sm text-accent">
            <i>Beginning in 13 Sec...</i>
          </p>
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base text-gray">0:00</p>
              <p className="text-base text-gray">0:35</p>
            </div>
            <div className="relative bg-secondary w-full h-2 rounded-[13px]">
              <div className="w-[30%] h-full absolute left-0 top-0 bg-primary rounded-[13px]"></div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-between ml-8 mr-5 mt-3">
          <div className="flex items-center gap-x-2">
            <button className="py-2 px-6 rounded-[22px] bg-blue text-white font-semibold text-lg">
              Submit
            </button>
            <button className="py-2 px-6 rounded-[22px] bg-primary text-white font-semibold text-lg">
              Re-Test
            </button>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="w-[56px] h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
              <div className="w-[32px] h-[25px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/icons/suppel.svg"
                    alt="grow icon"
                    fill
                  />
                </div>
              </div>
            </button>
            <div className="bg-secondary rounded-[30px] px-4 py-2 flex items-center gap-x-2">
              <IoIosArrowBack className="text-base text-gray" />
              <select
                className="py-2 bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
                name=""
                id=""
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <p className="text-sm text-gray font-medium">of</p>
              <p className="text-sm text-gray font-medium">1127</p>
              <IoIosArrowBack className="text-base text-gray rotate-180" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative border border-primary rounded-[15px] mt-14 py-4 px-8 mb-6">
        {/* top button */}
        <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
          <button className="flex items-center gap-x-2 text-white py-1 px-3 rounded-t-md text-base bg-blue">
            My Score{" "}
            <div className="w-[21px] h-[23px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/aplus.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </button>
          <button className="flex items-center gap-x-2 text-gray py-1 px-3 rounded-t-md text-base bg-cream">
            Forum{" "}
            <div className="w-[22px] h-[22px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/masage.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </button>
          <button className="flex items-center gap-x-2 text-gray py-1 px-3 rounded-t-md text-base bg-[#F4D1B1]">
            Community Score{" "}
            <div className="w-[24px] h-[24px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/score.svg"
                  alt="grow icon"
                  fill
                />
              </div>
            </div>
          </button>
        </div>
        {/*  */}
        <div className="flex items-center justify-between border border-primary rounded-[15px] p-2">
          {/*  */}
          <div className="flex items-center gap-x-2">
            <p className="text-5xl w-[60px] h-[60px] flex items-center justify-center text-gray rounded-full border border-primary">
              T
            </p>
            <p className="text-base text-gray">01:13</p>
            <p className="text-base text-gray">PM 02/07/2023</p>
          </div>
          {/*  */}
          <div className="flex items-center gap-x-2">
            <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
              <p className="text-4xl w-[45px] h-[45px] flex items-center justify-center rounded-full text-white bg-primary">
                S
              </p>
              <p className="text-xl text-gray">86/90</p>
            </button>
            <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
              <p className="text-4xl w-[45px] h-[45px] flex items-center justify-center rounded-full text-white bg-cream">
                R
              </p>
              <p className="text-xl text-gray">73/90</p>
            </button>
            <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
              <p className="text-3xl w-[45px] h-[45px] flex items-center justify-center rounded-full text-white bg-blue">
                AI
              </p>
              <p className="text-xl text-gray">Detailed Score</p>
              <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
            </button>
          </div>
          {/*  */}
          <div className="flex items-center gap-x-7">
            <MdOutlineFileDownload className="text-3xl text-primary cursor-pointer" />
            <BiSolidTrashAlt className="text-2xl text-primary cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
