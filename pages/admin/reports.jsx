import Filters from "@/components/Filters";
import Glance from "@/components/Glance";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Chart from "@/components/LineChart/Chart";
import Statistics from "@/components/LineChart/Statistics";
import Students from "@/components/Students_list";
import TablePagination from "@/components/TablePagination";
import axios from "axios";
import { useEffect, useState } from "react";

const legend = [
  {
    title: "Full Mocktest",
    color: "#F2B277",
  },
  {
    title: "Sectional Mocktest",
    color: "#98E9AB",
  },
];

const barsDoubleData = [
  {
    name: "Jan",
    pricePurple: 350,
    priceGreen: 280,
  },
  {
    name: "Feb",
    pricePurple: 220,
    priceGreen: 440,
  },
  {
    name: "Mar",
    pricePurple: 420,
    priceGreen: 360,
  },
  {
    name: "Apr",
    pricePurple: 540,
    priceGreen: 350,
  },
  {
    name: "May",
    pricePurple: 190,
    priceGreen: 320,
  },
  {
    name: "Jun",
    pricePurple: 250,
    priceGreen: 360,
  },
  {
    name: "Jul",
    pricePurple: 340,
    priceGreen: 240,
  },
  {
    name: "Aug",
    pricePurple: 380,
    priceGreen: 490,
  },
  {
    name: "Sep",
    pricePurple: 470,
    priceGreen: 340,
  },
  {
    name: "Oct",
    pricePurple: 210,
    priceGreen: 180,
  },
  {
    name: "Nov",
    pricePurple: 150,
    priceGreen: 290,
  },
  {
    name: "Dec",
    pricePurple: 200,
    priceGreen: 380,
  },
];

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState({});
  const [studentSCounts, setStudentsCounts] = useState({});
  const [status, setStatus] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 4;

  useEffect(() => {
    // get students
    const getStudents = async () => {
      const res = await axios.get(
        `student/recentjoined?limit=${pageLimit}&page=${pageNumber}`
      );
      setStudents(res?.data);
      setLoading(false);
    };
    getStudents();

    // get students count
    const getStudentsCount = async () => {
      const res = await axios.get(`student/counts`);
      setStudentsCounts(res?.data);
    };
    getStudentsCount();
  }, [status, pageNumber]);
  return (
    <Layout title="Reports">
      {/* Students Report */}
      <>
        <p className="text-lg font-extrabold mb-2">Students Report</p>
        <Filters />
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div
              className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
            ></div>
          </div>
        ) : (
          <>
            <Students setStatus={setStatus} items={students?.results} />
            <TablePagination
              pageNumber={pageNumber}
              totalPage={Math.ceil(students?.total / pageLimit)}
              prevNext={setPageNumber}
            />
          </>
        )}
      </>
      {/* At a Glance */}
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance studentSCounts={studentSCounts} />
      </div>
      {/* Mocktest Report */}
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">Mocktest Report</p>
        <div className="bg-white dark:bg-black mb-5">
          <div className="card-head border-0 justify-stretch">
            <div className="mr-auto text-h6">At a Glance</div>
            <div className="flex items-center mr-6 lg:flex-col lg:items-stretch">
              {legend.map((item, index) => (
                <div
                  className="flex items-center mr-6 last:mr-0 text-xs font-bold lg:mr-0"
                  key={index}
                >
                  <div
                    className="w-2 h-2 mr-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.title}
                </div>
              ))}
            </div>
            <button className="group text-0">
              <Icon
                className="icon-18 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="calendar"
              />
            </button>
          </div>
          <div className="flex md:block">
            <Statistics title="Full Mocktest Given" count={34} percent={10} />
            <Statistics
              title="Today’s Higest Number"
              count={"82 | 90S 81W 72R 90L"}
              percent={-2}
            />
            <Statistics
              title="Sectional Mocktest Given"
              count={94}
              percent={10}
            />
          </div>
          <Chart items={barsDoubleData} />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
