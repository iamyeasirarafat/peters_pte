import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import { useSelector } from "react-redux";
import ReusableModal from "../../components/global/ReusableModal";
import PTEAccurateMock from "../../components/UserDashboard/AccurateMockTest/PTEAccurateMock";
import PTECalendar from "../../components/UserDashboard/Calendar/PTE_Calendar";
import TodaysTask from "../../components/UserDashboard/CurrentDayTask/PTECurrentDayTask";
import HeaderCounter from "../../components/UserDashboard/HeaderCounter/HeaderCounter";
import HelpAndsupport from "../../components/UserDashboard/Help&support/HelpAndsupport";
import MiniGameWidgets from "../../components/UserDashboard/MiniGameWidgets/MiniGameWidgets";
import Performances from "../../components/UserDashboard/Performances/Performances";
import PracticeProgress from "../../components/UserDashboard/PracticeProgress/PracticeProgress";
import StudyMaterial from "../../components/UserDashboard/StudyMaterial/StudyMaterial";
import DashboardLayout from "./layout";

const Index = () => {
  const [toggleProgress, setToggleProgress] = useState("performance");
  const user = useSelector((state) => state?.user?.user);
  const [promotion, setPromotion] = useState({
    state: false,
    data: null,
  });
  useEffect(() => {
    const promotion = async () => {
      const { data } = await axios.get("/promo_banner");
      if (data && data.active) {
        if (localStorage.getItem("promotionImage") === data.image) {
          return;
        }
        setTimeout(() => {
          setPromotion({ state: true, data: data });
        }, data.show_after * 1000);
      }
    };
    promotion();
  }, []);
  return (
    <DashboardLayout dashboard>
      <div className="p-3 mt-12">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#949494] text-[26px] lg:text-[36px]">
            Welcome,{" "}
            <span className="text-black capitalize">{user?.full_name}</span>
          </p>
          {/* Exam Count Down */}
          <HeaderCounter />
        </div>
        {/* practice slider  */}
        {/* <PracticeSlider /> */}
        <div className="my-20">
          <div className="flex bg-primary w-full h-[46px] rounded-[15px] justify-center items-center">
            <span className="text-[26px] text-white">Study Plan</span>
          </div>
          <div className="flex flex-col lg:flex-row  rounded-[15px] mt-2 p-2 justify-between gap-2">
            {/* Calendar */}
            <div className="w-full">
              <PTECalendar />
            </div>
            {/* Today's task  */}
            <TodaysTask />
          </div>
        </div>
        {/* pte accurate mock test */}
        <PTEAccurateMock />

        {/* mini game */}
        <MiniGameWidgets />

        <div className="flex bg-primary w-full h-[46px] rounded-[15px] justify-center items-center my-3">
          <span className="text-[26px] text-white">Your Progress</span>
        </div>

        {/* toggle buttons */}
        <div className="w-full bg-gray-500 flex justify-between gap-1 mb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setToggleProgress("performance")}
              className={`${
                toggleProgress === "performance"
                  ? "bg-primary text-white"
                  : "bg-white border-primary"
              } hover:bg-cream border hover:text-white px-2 py-1 md:px-4 md:py-2 text-[13px] md:text-[21px] gap-1 flex flex-col justify-center items-center rounded-[10px]`}
            >
              Your Performance
              <SlBadge />
            </button>
            <button
              onClick={() => setToggleProgress("progress")}
              className={`${
                toggleProgress === "progress"
                  ? "bg-primary text-white"
                  : "bg-white border-primary"
              } border  hover:bg-cream hover:text-white px-2 py-1 md:px-4 md:py-2 text-[13px] md:text-[21px] gap-1 flex flex-col justify-center items-center rounded-[10px]`}
            >
              Practice Progress
              <IoAnalyticsOutline />
            </button>
          </div>
          <div className="text-right ">
            <select
              className="border border-primary mb-2 text-[12px] md:text-[16px]"
              name=""
              id=""
            >
              <option value="all">All Time</option>
              <option value="speaking">Speaking</option>
              <option value="writing">Writing</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
            <p className="text-[12px] md:text-[16px] font-normal text-[#949494]">
              Last updated on 25/07/2023
            </p>
          </div>
        </div>

        {/* all time progress  */}
        {toggleProgress === "performance" ? (
          <Performances />
        ) : (
          <PracticeProgress />
        )}

        {/* study material  */}

        <StudyMaterial />

        {/* help & support */}
        <HelpAndsupport />
        {promotion?.state && (
          <PromotionModal open={promotion} setOpen={setPromotion} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;

const PromotionModal = ({ open, setOpen }) => {
  return (
    <ReusableModal open={open?.state} setOpen={setOpen} className="">
      <div className="bg-white relative">
        {/* modal header */}
        <button
          onClick={() => {
            setOpen({ state: false, data: null });
            localStorage.setItem("promotionImage", open?.data.image);
          }}
          className="w-7 h-7 absolute top-0 right-0  rounded-full bg-white flex items-center outline-none justify-center"
        >
          <GrClose className="text-gray text-base" />
        </button>
        {/* Modal content */}
        <Link target="_blank" href={open?.data.link} className="p-4">
          <Image
            className="rounded-md"
            alt="Uploaded Image"
            width={600}
            height={600}
            src={open?.data.image}
          />
        </Link>
      </div>
    </ReusableModal>
  );
};
