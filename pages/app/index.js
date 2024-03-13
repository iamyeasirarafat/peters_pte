import DashboardLayout from "./layout";
import TodaysTask from "../../components/UserDashboard/CurrentDayTask/PTECurrentDayTask";
import PTECalendar from "../../components/UserDashboard/Calendar/PTE_Calendar";
import HeaderCounter from "../../components/UserDashboard/HeaderCounter/HeaderCounter";
import PTEAccurateMock from "../../components/UserDashboard/AccurateMockTest/PTEAccurateMock";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import { useState } from "react";
import MiniGameWidgets from "../../components/UserDashboard/MiniGameWidgets/MiniGameWidgets";
import Performances from "../../components/UserDashboard/Performances/Performances";
import StudyMaterial from "../../components/UserDashboard/StudyMaterial/StudyMaterial";
import HelpAndsupport from "../../components/UserDashboard/Help&support/HelpAndsupport";
import PracticeSlider from "../../components/UserDashboard/PracticeSlider/PracticeSlider";
import PracticeProgress from "../../components/UserDashboard/PracticeProgress/PracticeProgress";

const Index = () => {
  const [toggleProgress, setToggleProgress] = useState(true);

  return (
    <DashboardLayout dashboard>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-[#949494] text-[36px] lg:text-[16px] xl:text-[10px] ">
            Welcome, <span className="text-black">Tushar</span>
          </p>
          {/* Exam Count Down */}
          <HeaderCounter />
        </div>
        {/* practice slider  */}
        <PracticeSlider />
        <div>
          <div className="flex bg-[#FF8412] w-full h-[46px] rounded-[15px] justify-center items-center">
            <span className="text-[26px] text-white">Study Plan</span>
          </div>
          <div className="flex border-2 border-primary rounded-[15px] mt-2 p-2 justify-between gap-2">
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

        <div className="flex bg-[#FF8412] w-full h-[46px] rounded-[15px] justify-center items-center my-3">
          <span className="text-[26px] text-white">Your Progress</span>
        </div>

        {/* toggle buttons */}
        <div className="w-full bg-gray-500 flex justify-between mb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setToggleProgress(true)}
              className="bg-[#849C3E] hover:bg-[#4399FF] hover:text-white px-4 py-2 text-white text-[21px] gap-1 flex flex-col justify-center items-center rounded-[10px]"
            >
              Your Performance
              <SlBadge />
            </button>
            <button
              onClick={() => setToggleProgress(false)}
              className="border border-[#CF8800] hover:bg-[#4399FF] hover:text-white px-4 py-2 text-[21px] gap-1 flex flex-col justify-center items-center rounded-[10px]"
            >
              Prcatice Progress
              <IoAnalyticsOutline />
            </button>
          </div>
          <div className="text-right">
            <select className="border border-[#CF8800] mb-2" name="" id="">
              <option value="all">All Time</option>
              <option value="speaking">Speaking</option>
              <option value="writing">Writing</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
            <p className="text-[16px] font-normal text-[#949494]">
              Last updated on 25/07/2023
            </p>
          </div>
        </div>

        {/* all time progress  */}
        {toggleProgress ? <Performances /> : <PracticeProgress />}

        {/* study material  */}

        <StudyMaterial />

        {/* help & support */}
        <HelpAndsupport />
      </div>
    </DashboardLayout>
  );
};

export default Index;
