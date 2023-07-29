"use client";
import { useSelector } from "react-redux";

const navItem = {
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
  const { topNav, SideNav } = useSelector((state) => state.layout);

  return (
    <div
      className={`w-[270px] ${
        !topNav ? "h-screen" : "h-[calc(100vh-4rem)]"
      } transition-all duration-300 ease-linear border bg-secondary`}
    >
      <SideMenu />
      <TodoPanel />
    </div>
  );
};

export default SideNav;

const TodoPanel = () => {
  return <div className="w-full h-44 bg-tertiary"></div>;
};

const SideMenu = () => {
  return <div className="w-full h-[calc(100%-11rem)]"></div>;
};
