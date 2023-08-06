"use client";
import { toggleTopNav as toggleNav } from "@/src/redux/slice/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import GlobalModal from "./src/component/GlobalModal";
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
            <img src="/icons/chevron-up.svg" alt="" />
          </button>
        )}
        <SideNav />
        <div className="max-w-7xl w-full mx-auto">{children}</div>
        <GlobalModal />
      </div>
    </>
  );
};

export default DashboardLayout;
