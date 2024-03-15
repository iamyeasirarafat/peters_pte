import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const [count, setCount] = useState({});
  console.log(count);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/discussion/count");
      setCount(data);
    };
    fetchData();
  }, []);
  const DiscussionList = {
    Speaking_Test: [
      {
        name: "Read Aloud",
        icon: "RA",
        Items: count?.read_aloud || 0,
        bg: "#CF8800",
        url: "/admin/discussion/read_aloud",
      },
      {
        name: "Repeat Sentence",
        icon: "RS",
        Items: count?.repeat_sentence || 0,
        bg: "#CF8800",
        url: "/admin/discussion/repeat_sentence",
      },
      {
        name: "Describe Image",
        icon: "DI",
        Items: count?.describe_image || 0,
        bg: "#CF8800",
        url: "/admin/discussion/describe_image",
      },
      {
        name: "Answer Short Question",
        icon: "ASQ",
        Items: count?.short_question || 0,
        bg: "#CF8800",
        url: "/admin/discussion/short_question",
      },
      {
        name: "Re-Tell Lecture",
        icon: "RL",
        Items: count?.retell_sentence || 0,
        bg: "#CF8800",
        url: "/admin/discussion/retell_sentence",
      },
    ],
    Writing_Test: [
      {
        name: "Summarize Written Text",
        icon: "SWT",
        Items: count?.summarize_written || 0,
        bg: "#F2B277",
        url: "/admin/discussion/summarize_written",
      },
      {
        name: "Write Essay",
        icon: "WE",
        Items: count?.write_easy || 0,
        bg: "#F2B277",
        url: "/admin/discussion/write_easy",
      },
    ],
    Reading_Test: [
      {
        name: "Reading & Writing: FIB",
        icon: "FIB",
        Items: count?.read_write_blank || 0,
        bg: "#4399FF",
        url: "/admin/discussion/read_write_blank",
      },
      {
        name: "Multiple Choice (Multiple)",
        icon: "MCM",
        Items: count?.multi_choice_reading_multi_answer || 0,
        bg: "#4399FF",
        url: "/admin/discussion/multi_choice_reading_multi_answer",
      },
      {
        name: "Re-order Paragraphs",
        icon: "RP",
        Items: count?.reorder_paragraph || 0,
        bg: "#4399FF",
        url: "/admin/discussion/reorder_paragraph",
      },
      {
        name: "Reading: Fill in the Blanks",
        icon: "FIB",
        Items: count?.blank_reading || 0,
        bg: "#4399FF",
        url: "/admin/discussion/blank_reading",
      },
      {
        name: "Multiple Choice (Single)",
        icon: "MCS",
        Items: count?.multi_choice_reading_single_answer || 0,
        bg: "#4399FF",
        url: "/admin/discussion/multi_choice_reading_single_answer",
      },
    ],
    Listening_Test: [
      {
        name: "Summarize Spoken Text",
        icon: "SST",
        Items: count?.summarize_spoken || 0,
        bg: "#5F646D",
        url: "/admin/discussion/summarize_spoken",
      },
      {
        name: "Multiple Choice (Multiple)",
        icon: "MCM",
        Items: count?.multi_choice_multi_answer || 0,
        bg: "#5F646D",
        url: "/admin/discussion/multi_choice_multi_answer",
      },
      {
        name: "Highlight Correct Summary",
        icon: "HCS",
        Items: count?.highlight_summary || 0,
        bg: "#5F646D",
        url: "/admin/discussion/highlight_summary",
      },
      {
        name: "Fill in the Blanks",
        icon: "FIB",
        Items: count?.blank_listening || 0,
        bg: "#5F646D",
        url: "/admin/discussion/blank_listening",
      },
      {
        name: "Multiple Choice (Single)",
        icon: "MCS",
        Items: count?.multi_choice_single_answer || 0,
        bg: "#5F646D",
        url: "/admin/discussion/multi_choice_single_answer",
      },
      {
        name: "Select Missing Word",
        icon: "SMW",
        Items: count?.missing_word || 0,
        bg: "#5F646D",
        url: "/admin/discussion/missing_word",
      },
      {
        name: "Highlight Incorrect Words",
        icon: "HIW",
        Items: count?.highlight_incorrect_word || 0,
        bg: "#5F646D",
        url: "/admin/discussion/highlight_incorrect_word",
      },
      {
        name: "Write From Dictation",
        icon: "WFD",
        Items: count?.dictation || 0,
        bg: "#5F646D",
        url: "/admin/discussion/dictation",
      },
    ],
  };
  return (
    <Layout title="Discussion">
      {Object.keys(DiscussionList)?.map((item, i) => (
        <DiscussionItem key={i} item={item} DiscussionList={DiscussionList} />
      ))}
    </Layout>
  );
};
export default Index;

const DiscussionItem = ({ item, DiscussionList }) => {
  return (
    <div>
      <p className="text-lg font-extrabold mb-3 mt-6">
        {item.replace("_", " ")}
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {DiscussionList[item]?.map((item, i) => (
          <DiscussionCart key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

const DiscussionCart = ({ item }) => {
  return (
    <Link
      href={`${item?.url}`}
      className="bg-white dark:bg-black rounded-sm flex justify-start items-center gap-5 p-6"
    >
      <div
        style={{ backgroundColor: item?.bg }}
        className={`w-[2.88rem] h-[2.88rem] rounded-sm flex justify-center items-center`}
      >
        <p className="text-white text-base font-bold">{item?.icon}</p>
      </div>
      <div>
        <p className="font-bold text-base">{item?.name}</p>
        <p className="text-sm flex items-center gap-x-2">
          <span className="font-bold">{item?.Items}</span> items
        </p>
      </div>
    </Link>
  );
};
