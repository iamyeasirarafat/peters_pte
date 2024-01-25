import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const CardItems = () => {
  const [itemNumber, setItemNumber] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/superadmin/test/counts");
        setItemNumber(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log("itemNumber", itemNumber);

  const Speaking = [
    {
      title: "Read Aloud",
      items: itemNumber?.read_aloud,
      bg: "#CF8800",
      link: "read-aloud",
      text: "RA",
    },
    {
      title: "Repeat Sentence",
      items: itemNumber?.repeat_sentence,
      bg: "#CF8800",
      link: "repeat-sentence",
      text: "RS",
    },
    {
      title: "Describe Image",
      items: itemNumber?.describe_image,
      bg: "#CF8800",
      link: "describe-image",
      text: "DI",
    },
    {
      title: "Answer Short Question",
      items: itemNumber?.short_question,
      bg: "#CF8800",
      link: "answer-short-question",
      text: "ASQ",
    },
    {
      title: "Re-Tell Lecture",
      items: itemNumber?.retell_sentence,
      bg: "#CF8800",
      link: "re-tell-lecture",
      text: "RL",
    },
  ];
  const Writing = [
    {
      title: "Summarize Written Text",
      items: itemNumber?.summarize_written,
      bg: "#F2B277",
      link: "summarize-written-text",
      text: "SWT",
    },
    {
      title: "Write Essay",
      items: itemNumber?.write_easy,
      bg: "#F2B277",
      link: "write-essay",
      text: "WE",
    },
  ];
  const reading = [
    {
      title: "Reading & Writing: FIB",
      items: itemNumber?.read_write_blank,
      bg: "#4399FF",
      link: "reading-&-writing:-FIB",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Multiple)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#4399FF",
      link: "reading:-MCM",
      text: "MCM",
    },
    {
      title: "Re-order Paragraphs",
      items: itemNumber?.reorder_paragraph,
      bg: "#4399FF",
      link: "re-order-paragraphs",
      text: "RP",
    },
    {
      title: "Reading: Fill in the Blanks",
      items: itemNumber?.blank_reading,
      bg: "#4399FF",
      link: "Reading: Fill in the Blanks",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Single)",
      items: itemNumber?.multi_choice_single_answer,
      bg: "#4399FF",
      link: "reading:-MCS",
      text: "MCS",
    },
  ];
  const Speaking2 = [
    {
      title: "Summarize Spoken Text",
      items: itemNumber?.summarize_spoken,
      bg: "#5F646D",
      link: "summarize-spoken-text",
      text: "SST",
    },
    {
      title: "Multiple Choice (Multiples)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#5F646D",
      link: "listening:-MCM",
      text: "MCM",
    },
    {
      title: "Highlight Correct Summary",
      items: itemNumber?.highlight_summary,
      bg: "#5F646D",
      link: "highlight-correct-summary",
      text: "HCR",
    },
    {
      title: "Fill in the Blanks",
      items: itemNumber?.blank_listening,
      bg: "#5F646D",
      link: "fill-in-the-blanks",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Singles)",
      items: itemNumber?.multi_choice_reading_single_answer,
      bg: "#5F646D",
      link: "listening:-MCS",
      text: "MCS",
    },
    {
      title: "Select Missing Word",
      items: itemNumber?.missing_word,
      bg: "#5F646D",
      link: "select-missing-word",
      text: "SMW",
    },
    {
      title: "Highlight Incorrect Words",
      items: itemNumber?.highlight_incorrect_word,
      bg: "#5F646D",
      link: "Highlight Incorrect Words",
      text: "HIW",
    },
    {
      title: "Write From Dictation",
      items: itemNumber?.dictation,
      bg: "#5F646D",
      link: "write-from-dictation",
      text: "WFD",
    },
  ];
  const MiniGame = [
    {
      title: "spelling-bee",
      items: "233",
      bg: "#AE7AFF",
      link: "spelling-bee",
      text: "SB",
    },
    {
      title: "Speaking Spell",
      items: "233",
      bg: "#AE7AFF",
      link: "Speaking Spell",
      text: "SP",
    },
    {
      title: "Listening Frenzy",
      items: "233",
      bg: "#AE7AFF",
      link: "Listening Frenzy",
      text: "LF",
    },
  ];
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-3">Speaking Test</h2>
        <div className="grid   grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {Speaking?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Writing Test</h2>
        <div className="grid   grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {Writing?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Reading Test</h2>
        <div className="grid  grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {reading?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Listening Test</h2>
        <div className="grid   grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {Speaking2?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Mini Game</h2>
        <div className="grid   grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {MiniGame?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardItems;
