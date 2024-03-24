import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
// import { navItems } from "../../DashboardLayout/SideNav";

const navItems = {
  "Speaking Test": [
    {
      name: "Read Aloud",
      path: "/app/practice/speaking_test/read_aloud?que_no=1",
      ai: true,
      icon: "RA",
      bg: "#CF8800",
    },
    {
      name: "Repeat Sentence",
      path: "/app/practice/speaking_test/repeat_sentence",
      ai: true,
      icon: "RS",
      bg: "#CF8800",
    },
    {
      name: "Describe Image",
      path: "/app/practice/speaking_test/describe_image",
      ai: true,
      icon: "DI",
      bg: "#CF8800",
    },
    {
      name: "Re-Tell Lecture",
      path: "/app/practice/speaking_test/retell_lecture",
      ai: true,
      icon: "RL",
      bg: "#CF8800",
    },
    {
      name: "Answer Short Question",
      path: "/app/practice/speaking_test/answer_short_question",
      ai: true,
      icon: "ASQ",
      bg: "#CF8800",
    },
  ],
  "Writing Test": [
    {
      name: "Summarize Written Text",
      path: "/app/practice/writing_test/summarize_written?que_no=1",
      ai: true,
      icon: "SWT",
      bg: "#F2B277",
    },
    {
      name: "Write Essay",
      path: "/app/practice/writing_test/write_essay",
      ai: true,
      icon: "WE",
      bg: "#F2B277",
    },
  ],
  "Reading Test": [
    {
      name: "Reading & Writing Fill in the blanks",
      path: "/app/practice/reading_test/fill_blanks",
      ai: false,
      icon: "FIB",
      bg: "#7DD8FF",
    },
    {
      name: "Multiple Choice (Multiple)",
      path: "/app/practice/reading_test/multiple_answers?que_no=3",
      ai: false,
      icon: "MCM",
      bg: "#7DD8FF",
    },
    {
      name: "Re-order Paragraphs",
      path: "/app/practice/reading_test/reorder_paragraphs",
      ai: false,
      icon: "RP",
      bg: "#7DD8FF",
    },
    {
      name: "Reading Fill in the Blanks",
      path: "/app/practice/reading_test/fill_blanks?que_no=6",
      ai: false,
      icon: "FIB",
      bg: "#7DD8FF",
    },
    {
      name: "Multiple Choice (Single)",
      path: "/app/practice/reading_test/single_answer?que_no=5",
      ai: false,
      icon: "MCS",
      bg: "#7DD8FF",
    },
  ],
  "Listening Test": [
    {
      name: "Summarize Spoken Text",
      path: "/app/practice/listening_test/spoken_text?que_no=1",
      ai: true,
      icon: "SST",
    },
    {
      name: "Multiple Choice (Multiple)",
      path: "/app/practice/listening_test/multiple_answers?que_no=1",
      ai: false,
      icon: "MCM",
      bg: "#949494",
    },
    {
      name: "Fill in the Blanks",
      path: "/app/practice/listening_test/fill_blanks?que_no=1",
      ai: false,
      icon: "FIB",
      bg: "#949494",
    },
    {
      name: "Highlight Correct Summary",
      path: "/app/practice/listening_test/highlight_summary?que_no=1",
      ai: false,
      icon: "HCS",
      bg: "#949494",
    },
    {
      name: "Multiple Choice (Single)",
      path: "/app/practice/listening_test/single_answer?que_no=2",
      ai: false,
      icon: "MCS",
      bg: "#949494",
    },
    {
      name: "Select Missing Word",
      path: "/app/practice/listening_test/missing_word?que_no=1",
      ai: false,
      icon: "SMW",
      bg: "#949494",
    },
    {
      name: "Highlight Incorrect Words",
      path: "/app/practice/listening_test/highlight_incorrect_words",
      ai: false,
      icon: "HIW",
      bg: "#949494",
    },
    {
      name: "Write From Dictation",
      path: "/app/practice/listening_test/write_dictation",
      ai: true,
      icon: "WFD",
      bg: "#949494",
    },
  ],
};

const PracticeSlider = () => {
  const carouselRef = useRef(null);
  const carouselItemRef = useRef(null);

  const moveCarousel = (direction) => {
    const scrollAmount = carouselItemRef.current.offsetWidth + 10; // Adjust 10 for gap
    if (direction === "left") {
      carouselRef.current.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="relative flex w-full h-[143px] justify-between items-center">
      {/* here row carousel bar goes */}
      <button
        onClick={() => moveCarousel("left")}
        className="absolute top-1/2 -left-7 cursor-pointer pr-[5px] z-2"
      >
        <BsArrowLeftCircle className="h-7 w-7 md:h-10 md:w-10 bg-white/50 rounded-full" />
      </button>
      {/* all items of carousel bar */}
      <div ref={carouselRef} className="flex gap-10 overflow-auto no-scrollbar">
        {Object.keys(navItems).length > 0 &&
          Object.keys(navItems)?.map((item, index) => {
            return (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <div ref={carouselItemRef} className="carousel-item">
                  <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                    {item}
                  </h4>
                  <hr className="border border-[#616161] my-2" />
                  <div className="flex gap-2">
                    {navItems[item]?.map((subItem, index) => {
                      return (
                        <Link key={index} href={subItem?.path}>
                          <button
                            style={{ backgroundColor: subItem.bg }}
                            className={`relative w-[55px] h-[55px] rounded-[13px] text-white`}
                          >
                            {subItem?.ai && (
                              <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                                AI
                              </span>
                            )}
                            <span className="text-[20px] font-semibold">
                              {subItem?.icon}
                            </span>
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Suspense>
            );
          })}
      </div>
      <button
        onClick={() => moveCarousel("right")}
        className="absolute top-1/2 -right-7 cursor-pointer pl-[5px] z-2"
      >
        <BsArrowRightCircle className="h-7 w-7 md:h-10 md:w-10 bg-white/50 rounded-full" />
      </button>
    </div>
  );
};

export default PracticeSlider;
