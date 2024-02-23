import DashboardLayout from "./layout";
import TodaysTask from "../../components/UserDashboard/CurrentDayTask/PTECurrentDayTask";
import PTECalendar from "../../components/UserDashboard/Calendar/PTE_Calendar";
import HeaderCounter from "../../components/UserDashboard/HeaderCounter/HeaderCounter";
import PTEAccurateMock from "../../components/UserDashboard/AccurateMockTest/PTEAccurateMock";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { navItems } from "../../components/DashboardLayout/SideNav";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [currPos, setCurrPos] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.querySelector(".carousel-item");
      if (firstItem) {
        setItemWidth(
          firstItem.offsetWidth +
            parseFloat(getComputedStyle(firstItem).marginRight)
        );
      }
    }
  }, []);
  const numberOfItems = 5;
  const moveCarousel = (direction) => {
    const newPos = currPos + direction * itemWidth;
    setCurrPos(Math.min(0, Math.max(-(itemWidth * numberOfItems), newPos)));
  };
  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-[#949494] text-[36px]">
            Welcome, <span className="text-black">Tushar</span>
          </p>
          {/* Exam Count Down */}
          <HeaderCounter />
        </div>
        <div className="flex w-full h-[143px] justify-between items-center">
          {/* here row carousel bar goes */}
          <button
            onClick={() => moveCarousel(-1)}
            className="cursor-pointer pr-[20px] z-2 bg-white"
          >
            <BsArrowLeftCircle size={48} />
          </button>
          {/* all items of carousel bar */}
          <div
            ref={carouselRef}
            style={{ transform: `translateX(${currPos}px)` }}
            className="flex gap-10 overflow-auto"
          >
            {/* speaking test */}
            <div className="carousel-item">
              <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                speaking test
              </h4>
              <hr className="border border-[#616161] my-2" />

              <div className="flex gap-2">
                <button className="relative w-[55px] h-[55px] bg-[#CF8800] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">RA</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#CF8800] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">RS</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#CF8800] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">DI</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#CF8800] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">RL</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#CF8800] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">ASQ</span>
                </button>
              </div>
            </div>

            {/* writing test */}
            <div className="carousel-item">
              <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                writing test
              </h4>
              <hr className="border border-[#616161] my-2" />

              <div className="flex gap-2">
                <button className="relative w-[55px] h-[55px] bg-[#F2B277] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">SWT</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#F2B277] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">WE</span>
                </button>
              </div>
            </div>

            {/* reading test */}
            <div className="carousel-item">
              <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                reading test
              </h4>
              <hr className="border border-[#616161] my-2" />

              <div className="flex gap-2">
                <button className="relative w-[55px] h-[55px] bg-[#7DD8FF] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">FIB</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#7DD8FF] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">MCM</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#7DD8FF] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">RP</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#7DD8FF] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">FIB</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#7DD8FF] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">MCS</span>
                </button>
              </div>
            </div>

            {/* listening test */}
            <div className="carousel-item">
              <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                listening test
              </h4>
              <hr className="border border-[#616161] my-2" />

              <div className="flex gap-2">
                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">SST</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">MCM</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">FIB</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">HCS</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">MCS</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">SMW</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">HIW</span>
                </button>

                <button className="relative w-[55px] h-[55px] bg-[#949494] rounded-[13px] text-white">
                  <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                    AI
                  </span>
                  <span className="text-[20px] font-semibold">WFD</span>
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => moveCarousel(1)}
            className="cursor-pointer pl-[20px] z-2 bg-white"
          >
            <BsArrowRightCircle size={48} />
          </button>
        </div>
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
      </div>
    </DashboardLayout>
  );
};

export default Index;
