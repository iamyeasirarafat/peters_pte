import { FaUser, FaUsers } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { BiSolidBarChartSquare, BiSolidStar } from "react-icons/bi";
import { MdAccountBalanceWallet, MdQuiz, MdVerified } from "react-icons/md";

const Glance = ({ studentSCounts }) => {
  const data = [
    {
      name: "Total Students",
      count: studentSCounts?.total_student || 0,
      icon: <FaUsers />,
    },
    {
      name: "Premium Students",
      count: studentSCounts?.premium_student || 0,
      icon: <IoDiamondSharp />,
    },
    {
      name: "Free Students",
      count: studentSCounts?.free_students || 0,
      icon: <FaUser />,
    },
    {
      name: "Account Remaining",
      count: studentSCounts?.account_remaining || 0,
      icon: <MdAccountBalanceWallet />,
    },
    {
      name: "PTE Exam in 7 Days",
      count: `${studentSCounts?.exam_in_7_days || 0} Students`,
      icon: <MdQuiz />,
    },
    {
      name: "Avg score 75-90",
      count: `${studentSCounts?.score_75_90 || 0} Students`,
      icon: <BiSolidStar />,
    },
    {
      name: "Avg score 55-45",
      count: `${studentSCounts?.score_55_45 || 0} Students`,
      icon: <MdVerified />,
    },
    {
      name: "Avg score bellow 55",
      count: `${studentSCounts?.score_55_0 || 0} Students`,
      icon: <BiSolidBarChartSquare />,
    },
  ];
  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
      {data?.map((item, i) => (
        <div
          key={i}
          className="py-6 px-5 bg-white dark:bg-black flex items-center gap-x-5"
        >
          <p className="p-3.5 border border-black dark:border-white rounded-sm">
            {item?.icon}
          </p>
          <div>
            <p className="text-xl font-semibold">{item?.count}</p>
            <p className="text-sm">{item?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Glance;
