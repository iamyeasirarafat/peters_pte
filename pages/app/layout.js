import { toggleTopNav as toggleNav } from "@/redux/slice/layoutSlice";
import { getUser } from "@/redux/slice/userSlice";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../components/DashboardLayout/SideNav";
import TopNav from "../../components/DashboardLayout/TopNav";

function SearchBarFallback() {
  return <>placeholder</>;
}

const DashboardLayout = ({ children }) => {
  const { topNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <TopNav />
      <div className="flex relative">
        {!topNav && (
          <button
            onClick={toggleTopNav}
            className="absolute h-6 w-7 flex items-center justify-center rotate-180 bg-gold rounded top-2 right-3"
          >
            <Image
              className="object-cover"
              src="/icons/chevron-up.svg"
              width={16}
              height={16}
              alt="icon"
            />
          </button>
        )}
        <SideNav />
        <div
          className={` w-full
        ${!topNav ? "h-screen" : "h-[calc(100vh-5.5rem)]"}
        overflow-y-auto  bg-white px-5 md:px-10 2xl:px-0`}
        >
          <Suspense fallback={<SearchBarFallback />}>
            <div className="max-w-7xl w-full mx-auto">{children}</div>
          </Suspense>
        </div>
        {/* <GlobalModal /> */}
      </div>
    </>
  );
};

export default DashboardLayout;
