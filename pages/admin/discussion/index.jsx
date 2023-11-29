import Layout from "@/components/Layout";
import Link from "next/link";

const DiscussionList = {
  Speaking_Test: [
    {
      name: "Read Aloud",
      icon: "RA",
      Items: "3157",
      bg: "#CF8800",
      url: "/admin/discussion/read_aloud",
    },
    {
      name: "Repeat Sentence",
      icon: "RS",
      Items: "3157",
      bg: "#CF8800",
      url: "/admin/discussion/repeat_sentence",
    },
    {
      name: "Describe Image",
      icon: "DI",
      Items: "3157",
      bg: "#CF8800",
      url: "/admin/discussion/describe_image",
    },
    {
      name: "Answer Short Question",
      icon: "ASQ",
      Items: "3157",
      bg: "#CF8800",
      url: "/admin/discussion/answer_short_question",
    },
    {
      name: "Re-Tell Lecture",
      icon: "RL",
      Items: "3157",
      bg: "#CF8800",
      url: "/admin/discussion/re_tell_lecture",
    },
  ],
  Writing_Test: [
    {
      name: "Summarize Written Text",
      icon: "SWT",
      Items: "3157",
      bg: "#F2B277",
      url: "/admin/discussion/summarize_written_text",
    },
    {
      name: "Write Essay",
      icon: "WE",
      Items: "3157",
      bg: "#F2B277",
      url: "/admin/discussion/write_essay",
    },
  ],
  Reading_Test: [
    {
      name: "Reading & Writing: FIB",
      icon: "FIB",
      Items: "3157",
      bg: "#4399FF",
      url: "/admin/discussion/reading_&_writing",
    },
    {
      name: "Multiple Choice (Multiple)",
      icon: "MCM",
      Items: "3157",
      bg: "#4399FF",
      url: "/admin/discussion/reading_test_MCQ_(multiple)",
    },
    {
      name: "Re-order Paragraphs",
      icon: "RP",
      Items: "3157",
      bg: "#4399FF",
      url: "/admin/discussion/re-order_paragraphs",
    },
    {
      name: "Reading: Fill in the Blanks",
      icon: "FIB",
      Items: "3157",
      bg: "#4399FF",
      url: "/admin/discussion/reading:_fill_in_the_blanks",
    },
    {
      name: "Multiple Choice (Single)",
      icon: "MCS",
      Items: "3157",
      bg: "#4399FF",
      url: "/admin/discussion/reading_test_MCQ_(single)",
    },
  ],
  Listening_Test: [
    {
      name: "Summarize Spoken Text",
      icon: "SST",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/summarize_spoken_text",
    },
    {
      name: "Multiple Choice (Multiple)",
      icon: "MCM",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/listening_test_MCQ_(Multiple)",
    },
    {
      name: "Highlight Correct Summary",
      icon: "HCS",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/highlight_correct_summary",
    },
    {
      name: "Fill in the Blanks",
      icon: "FIB",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/fill_in_the_blanks",
    },
    {
      name: "Multiple Choice (Single)",
      icon: "MCS",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/listening_test_MCQ_(single)",
    },
    {
      name: "Select Missing Word",
      icon: "SMW",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/select_missing_word",
    },
    {
      name: "Highlight Incorrect Words",
      icon: "HIW",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/highlight_incorrect_words",
    },
    {
      name: "Write From Dictation",
      icon: "WFD",
      Items: "3157",
      bg: "#5F646D",
      url: "/admin/discussion/write_from_dictation",
    },
  ],
};

const Index = () => {
  return (
    <Layout title="Discussion">
      {Object.keys(DiscussionList)?.map((item, i) => (
        <DiscussionItem key={i} item={item} />
      ))}
    </Layout>
  );
};
export default Index;

const DiscussionItem = ({ item }) => {
  return (
    <div>
      <p className="text-lg font-extrabold mb-3 mt-6">
        {item.replace("_", " ")}
      </p>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
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
