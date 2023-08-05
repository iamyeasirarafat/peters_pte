"use client";
import { toggleSideNav } from "@/src/redux/slice/layoutSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// side navigation items
const navItems = {
  "Speaking Test": [
    {
      name: "Read Aloud",
      path: "#",
      ai: true,
      icon: "",
    },
    {
      name: "Repeat Sentence",
      path: "#",
      ai: true,
      icon: "",
    },
    {
      name: "Describe Image",
      path: "#",
      ai: true,
      icon: "",
    },
    {
      name: "Re-Tell Lecture",
      path: "#",
      ai: true,
      icon: "",
    },
    {
      name: "Answer Short Question",
      path: "#",
      ai: true,
    },
  ],
  "Writing Test": [
    {
      name: "Summarize Written Text",
      path: "#",
      ai: true,
      icon: "",
    },
    {
      name: "Write Essay",
      path: "#",
      ai: true,
      icon: "",
    },
  ],
  "Reading Test": [],
  "Listing Test": [],
};

const SideNav = () => {
  const { topNav, sideNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleNav = () => {
    dispatch(toggleSideNav());
  };
  return (
    <div
      className={`${sideNav ? "w-72" : "w-[134px]"} flex-shrink-0 ${
        !topNav ? "h-screen" : "h-[calc(100vh-5.5rem)]"
      } transition-all relative duration-300 ease-linear  bg-secondary`}
    >
      {/* side Nav container */}
      <SideMenuContainer topNav={topNav} />

      {/* todo box */}
      <TodoPanel />
      <button
        onClick={toggleNav}
        className="top-2/4 absolute h-14 w-5 bg-secondary -right-[20px] rounded-tr-3xl rounded-br-3xl "
      >
        <img
          className={`${sideNav ? "" : "rotate-180"}`}
          src="/icons/chevrons-left-double.svg"
        />
      </button>
    </div>
  );
};

export default SideNav;

const TodoPanel = () => {
  return <div className="w-full h-44  bg-tertiary"></div>;
};

const SideMenuContainer = ({ topNav }) => {
  return (
    <div
      className={`w-full transition-all relative duration-300 ease-linear overflow-y-auto  nav-scrollbar  ${
        topNav ? "h-[calc(100%-9.5rem)]" : "h-[calc(100%-11rem)]"
      }`}
    >
      {/* menu items */}
      {Object.keys(navItems).map((item) => (
        <SideMenu key={item} data={item} />
      ))}
    </div>
  );
};

const SideMenu = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { sideNav } = useSelector((state) => state.layout);
  return (
    <div className="mt-5 ">
      <div className="pb-2 mb-1 border-b border-primary">
        <div className="pl-9 w-full  flex items-center justify-between pr-3">
          <h1
            className={`font-avantt font-semibold text-gray ${
              sideNav ? "text-xl" : "text-base"
            }`}
          >
            {sideNav ? data : data.split(" ")[0]}
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src="/icons/chevron-up.svg" />
          </button>
        </div>
      </div>
      {/* inner items */}
      <div className={`pl-9 pr-3 overflow-hidden`}>
        {navItems[data].map((item, i) => (
          <SingleItem key={i} data={item} open={isOpen} />
        ))}
      </div>
    </div>
  );
};

const SingleItem = ({ data, open }) => {
  const { sideNav } = useSelector((state) => state.layout);
  return (
    <Link
      href={data?.path}
      className={`mt-3 flex gap-1 items-center ${
        open ? "" : "-mt-20"
      } transition-all duration-300  ease-linear`}
    >
      <div className="relative h-14 w-14">
        <div className="bg-white rounded-xl w-full h-full"></div>
        {data?.ai && (
          <div className="absolute h-5 w-5 flex items-center justify-center text-white -top-1 -right-1 bg-blue rounded-full text-xs font-cabin ">
            AI
          </div>
        )}
      </div>
      {sideNav && (
        <h2 className="font-cabin text-lg leading-tight text-gray">
          {data?.name}
        </h2>
      )}
    </Link>
  );
};
