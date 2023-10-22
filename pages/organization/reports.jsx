import Filters from "@/components/Filters";
import Glance from "@/components/Glance";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Chart from "@/components/LineChart/Chart";
import Statistics from "@/components/LineChart/Statistics";
import Students from "@/components/Products";
import TablePagination from "@/components/TablePagination";
const studentsList = [
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "85",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "70",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "60",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "50",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "79",
    group: "Dhaka Branch",
  },
];
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

const Courses = () => {
  return (
    <Layout title="Reports">
      {/* Students Report */}
      <>
        <p className="text-lg font-extrabold mb-2">Students Report</p>
        <Filters />
        <Students student={false} items={studentsList} />
        <TablePagination />
      </>
      {/* At a Glance */}
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance />
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

export default Courses;
