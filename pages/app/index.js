import { useRouter } from "next/router";
import DashboardLayout from "./layout";
import { useEffect } from "react";
import { RiSettings2Fill } from "react-icons/ri";

import { HiOutlineMicrophone } from "react-icons/hi2";
import { PiBookOpen, PiHeadphonesThin } from "react-icons/pi";

import PTECalendar from "../../components/UserDashboard/Calendar/PTE_Calendar";
import TodayTaskCard from "../../components/UserDashboard/Cards/TodayTaskCard";

const taskCard = [
  {
    name: "speaking",
    bgcolor: "#FF8412",
    icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
  },
  {
    name: "Writing",
    bgcolor: "#F2B277",
    icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
  },
  {
    name: "reading",
    bgcolor: "#4399FF",
    icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
  },
  {
    name: "listening",
    bgcolor: "#949494",
    icon: <HiOutlineMicrophone className="w-[48px] h-[48px]" />,
  },
];
const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth");
  }, []);
  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-[#949494] text-[36px]">
            Welcome, <span className="text-black">Tushar</span>
          </p>

          {/* Exam Count Down */}
          <div className="flex items-center justify-between gap-1.5 mt-2.5">
            <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary ">
              <button
                // disabled={router?.asPath?.startsWith("/admin")}
                // onClick={() => setOpenExamCountDown({ state: true, uid: data?.id })}
                className="bg-gold text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
              >
                Exam Count Down
              </button>
              <div className="text-xl font-medium text-gray dark:text-white">
                {/* {examDate?.exam_date ? (
                  <Countdown targetDate={examDate?.exam_date} />
                ) : (
                  <p>Not set Exam date</p>
                )} */}
                20d 03h 03m 52s
              </div>
              <RiSettings2Fill className="text-xl text-cream" />
            </div>
            <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary">
              <button
                // disabled={router?.asPath?.startsWith("/admin")}
                // onClick={() => setOpenTargetScore({ state: true, uid: data?.id })}
                className="bg-cream text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
              >
                Target Score
              </button>
              <p className="text-3xl font-medium text-gray dark:text-white">
                79+{/* {score?.score}+ */}
              </p>
              <RiSettings2Fill className="text-xl text-cream" />
            </div>
            {/* <ExamCountDown
              openExamCountDown={openExamCountDown}
              setOpenExamCountDown={setOpenExamCountDown}
              setRefetch={setRefetch}
            />
            <TargetScore
              openTargetScore={openTargetScore}
              setOpenTargetScore={setOpenTargetScore}
              setRefetch={setRefetch}
            /> */}
          </div>
        </div>
        <div className="bg-slate-700">
          {/* here row bar goes */}
          Carousel bar goes here
        </div>
        <div>
          <div className="flex bg-[#FF8412] w-full h-[46px] rounded-[15px] justify-center items-center">
            <span className="text-[26px] text-white">Study Plan</span>
          </div>
          <div className="flex border-2 border-primary rounded-[15px] mt-2 p-2 justify-between gap-2">
            <div className="w-full">
              <PTECalendar />
            </div>

            {/* Today's task  */}
            <div className="w-full flex flex-col text-[#616161] border border-[#F2B277] p-[15px] rounded-[10px] bg-[#FFF4EB]">
              <h3 className="font-medium text-[21px] text-center mb-2.5">
                Today's Task
              </h3>
              <div className="bg-white rounded-[10px] h-full p-[15px]">
                {/* Task lists */}
                <div className="flex flex-col gap-2 justify-center text-[16px] mt-2 mb-4">
                  <div className="flex items-center gap-2 capitalize">
                    <span className="h-3 w-3 rounded-full border " />
                    <p>give summarize written text 5 times</p>
                  </div>
                  <div className="flex items-center gap-2 capitalize">
                    <span className="h-3 w-3 rounded-full border " />
                    <p>Give Write Essay 2 Times</p>
                  </div>
                  <div className="flex items-center gap-2 capitalize">
                    <span className="h-3 w-3 rounded-full border bg-[#CF8800]" />
                    <p className="line-through text-[#949494]">
                      Score Target 75 Today
                    </p>
                  </div>
                </div>
                {/* Cards */}
                <div className="flex text-white justify-between">
                  {taskCard.map((card) => (
                    <TodayTaskCard key={card.name} data={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <div></div>
          <div></div>
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Index;
