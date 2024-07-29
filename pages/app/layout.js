import { toggleTopNav as toggleNav } from "@/redux/slice/layoutSlice";
import { getUser } from "@/redux/slice/userSlice";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNav from "../../components/DashboardLayout/TopNav";
import Footer from "../../components/UserDashboard/Footer";
import { IoIosArrowUp } from "react-icons/io";

function SearchBarFallback() {
  return <>placeholder</>;
}

const DashboardLayout = ({ children, dashboard }) => {
  const { topNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div>
      <div className=" flex flex-col">
        <TopNav dashboard={dashboard} />
        {!topNav && (
          <button
            onClick={toggleTopNav}
            className="absolute h-6 w-7 flex items-center justify-center rotate-180 rounded top-2 right-3"
          >
            <IoIosArrowUp className="text-xl" />
          </button>
        )}
        <div
          className={` w-full
        ${!topNav ? "h-screen" : "h-[calc(100vh-64px)]"}
        overflow-y-auto  bg-white content-scrollbar no-scrollbar flex flex-col justify-between`}
        >
          <Suspense fallback={<SearchBarFallback />}>
            <div className="container mx-auto p-2 md:px-10 4xl:px-0">
              {children}
            </div>
          </Suspense>
          {/* footer */}
          {dashboard && <Footer />}
        </div>
        {/* <GlobalModal /> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
