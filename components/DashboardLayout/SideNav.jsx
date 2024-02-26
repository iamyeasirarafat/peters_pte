"use client";
import { toggleSideNav } from "@/redux/slice/layoutSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

// side navigation items
export const navItems = {
  "Speaking Test": [
    {
      name: "Read Aloud",
      path: "/app/practice/speaking_test/read_aloud?que_no=1",
      ai: true,
      icon: "RA",
      bg: "gold",
    },
    {
      name: "Repeat Sentence",
      path: "/app/practice/speaking_test/repeat_sentence",
      ai: true,
      icon: "RS",
      bg: "gold",
    },
    {
      name: "Describe Image",
      path: "/app/practice/speaking_test/describe_image",
      ai: true,
      icon: "DI",
      bg: "gold",
    },
    {
      name: "Re-Tell Lecture",
      path: "/app/practice/speaking_test/retell_lecture",
      ai: true,
      icon: "RL",
      bg: "gold",
    },
    {
      name: "Answer Short Question",
      path: "/app/practice/speaking_test/answer_short_question",
      ai: true,
      icon: "ASQ",
      bg: "gold",
    },
  ],
  "Writing Test": [
    {
      name: "Summarize Written Text",
      path: "/app/practice/writing_test/summarize_written?que_no=1",
      ai: true,
      icon: "SWT",
      bg: "primary",
    },
    {
      name: "Write Essay",
      path: "/app/practice/writing_test/write_essay",
      ai: true,
      icon: "WE",
      bg: "primary",
    },
  ],
  "Reading Test": [
    {
      name: "Reading & Writing Fill in the blanks",
      path: "/app/practice/reading_test/fill_blanks",
      ai: false,
      icon: "FIB",
      bg: "cream",
    },
    {
      name: "Multiple Choice (Multiple)",
      path: "/app/practice/reading_test/multiple_answers?que_no=3",
      ai: false,
      icon: "MCM",
      bg: "cream",
    },
    {
      name: "Re-order Paragraphs",
      path: "/app/practice/reading_test/reorder_paragraphs",
      ai: false,
      icon: "RP",
      bg: "cream",
    },
    {
      name: "Reading Fill in the Blanks",
      path: "/app/practice/reading_test/fill_blanks?que_no=6",
      ai: false,
      icon: "FIB",
      bg: "cream",
    },
    {
      name: "Multiple Choice (Single)",
      path: "/app/practice/reading_test/single_answer?que_no=5",
      ai: false,
      icon: "MCS",
      bg: "cream",
    },
  ],
  "Listing Test": [
    {
      name: "Summarize Spoken Text",
      path: "/app/practice/listing_test/spoken_text?que_no=1",
      ai: true,
      icon: "SST",
      bg: "primary",
    },
    {
      name: "Multiple Choice (Multiple)",
      path: "/app/practice/listing_test/multiple_answers?que_no=1",
      ai: false,
      icon: "MCM",
      bg: "primary",
    },
    {
      name: "Fill in the Blanks",
      path: "/app/practice/listing_test/fill_blanks?que_no=1",
      ai: false,
      icon: "FIB",
      bg: "primary",
    },
    {
      name: "Highlight Correct Summary",
      path: "/app/practice/listing_test/highlight_summary?que_no=1",
      ai: false,
      icon: "HCS",
      bg: "primary",
    },
    {
      name: "Multiple Choice (Single)",
      path: "/app/practice/listing_test/single_answer?que_no=2",
      ai: false,
      icon: "MCS",
      bg: "primary",
    },
    {
      name: "Select Missing Word",
      path: "/app/practice/listing_test/missing_word?que_no=1",
      ai: false,
      icon: "SMW",
      bg: "primary",
    },
    {
      name: "Highlight Incorrect Words",
      path: "/app/practice/listing_test/highlight_incorrect_words",
      ai: false,
      icon: "HIW",
      bg: "primary",
    },
    {
      name: "Write From Dictation",
      path: "/app/practice/listing_test/write_dictation",
      ai: true,
      icon: "WFD",
      bg: "primary",
    },
  ],
};

const SideNav = () => {
  const { topNav, sideNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleNav = () => {
    dispatch(toggleSideNav());
  };
  return (
    <div
      className={`${sideNav ? "w-0" : "w-[300px]"} flex-shrink-0 ${!topNav ? "h-screen" : "h-[calc(100vh-5.5rem)]"
        } transition-all relative duration-300 ease-linear bg-secondary md:hidden block`}
    >
      {/* side Nav container */}
      <SideMenuContainer topNav={topNav} />

      {/* todo box */}
      <TodoPanel />
      <button
        onClick={toggleNav}
        className="top-2/4 absolute h-14 w-5 bg-secondary -right-[20px] rounded-tr-3xl rounded-br-3xl "
      >
        <Image
          className={`object-cover ${sideNav ? "rotate-180" : ""}`}
          src="/icons/chevrons-left-double.svg"
          width={16}
          height={16}
          alt="icon"
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
      className={`w-full transition-all relative duration-300 ease-linear overflow-y-auto  nav-scrollbar  ${topNav ? "h-[calc(100%-9.5rem)]" : "h-[calc(100%-11rem)]"
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
            className={`font-avantt font-semibold text-gray ${sideNav ? "text-xl" : "text-base"
              }`}
          >
            {sideNav ? data : data.split(" ")[0]}
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoIosArrowDown
              className={`text-gray text-base duration-200 ${isOpen ? "rotate-180" : ""
                }`}
            />
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

export const SingleItem = ({ data, open }) => {
  const { sideNav } = useSelector((state) => state.layout);
  return (
    <Link
      href={data?.path}
      style={{
        marginTop: open ? "12px" : "-80px",
      }}
      className={` flex gap-x-2 items-center  transition-all duration-300  ease-linear`}
    >
      <div className="relative h-14 w-14 flex-shrink-0">
        <div
          className={`bg-${data?.bg} rounded-xl w-full h-full flex items-center justify-center text-xl text-white font-semibold`}
        >
          {data?.icon}
        </div>
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
