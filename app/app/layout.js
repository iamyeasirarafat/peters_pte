"use client";
import { toggleTopNav as toggleNav } from "@/src/redux/slice/layoutSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./src/layout/SideNav";
import TopNav from "./src/layout/TopNav";

const DashboardLayout = ({ children }) => {
  const { topNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
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
          className={`max-w-7xl w-full 
        ${!topNav ? "h-screen" : "h-[calc(100vh-5.5rem)]"}
        overflow-y-auto mx-auto`}
        >
          {children}
        </div>
        {/* <GlobalModal /> */}
      </div>
    </>
  );
};

export default DashboardLayout;
