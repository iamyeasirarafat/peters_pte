import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const CardItems = () => {
  const [itemNumber, setItemNumber] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/superadmin/test/counts");
        setItemNumber(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const Speaking = [
    {
      title: "Read Aloud",
      items: itemNumber?.read_aloud,
      bg: "#CF8800",
      link: "Read Aloud",
      text: "RA",
    },
    {
      title: "Repeat Sentence",
      items: itemNumber?.repeat_sentence,
      bg: "#CF8800",
      link: "Repeat Sentence",
      text: "RS",
    },
    {
      title: "Describe Image",
      items: itemNumber?.describe_image,
      bg: "#CF8800",
      link: "Describe Image",
      text: "DI",
    },
    {
      title: "Answer Short Question",
      items: itemNumber?.short_question,
      bg: "#CF8800",
      link: "Answer Short Question",
      text: "ASQ",
    },
    {
      title: "Re-Tell Lecture",
      items: itemNumber?.retell_sentence,
      bg: "#CF8800",
      link: "Re-Tell Lecture",
      text: "RL",
    },
  ];
  const Writing = [
    {
      title: "Summarize Written Text",
      items: itemNumber?.summarize_written,
      bg: "#F2B277",
      link: "Summarize Written Text",
      text: "SWT",
    },
    {
      title: "Write Essay",
      items: itemNumber?.write_easy,
      bg: "#F2B277",
      link: "Write Essay",
      text: "WE",
    },
  ];
  const reading = [
    {
      title: "Reading & Writing: FIB",
      items: itemNumber?.read_write_blank,
      bg: "#4399FF",
      link: "Reading & Writing: FIB",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Multiple)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#4399FF",
      link: "Reading: MCM",
      text: "MCM",
    },
    {
      title: "Re-order Paragraphs",
      items: itemNumber?.reorder_paragraph,
      bg: "#4399FF",
      link: "Re-order Paragraphs",
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
      link: "Reading: MCS",
      text: "MCS",
    },
  ];
  const Speaking2 = [
    {
      title: "Summarize Spoken Text",
      items: itemNumber?.summarize_spoken,
      bg: "#5F646D",
      link: "Summarize Spoken Text",
      text: "SST",
    },
    {
      title: "Multiple Choice (Multiples)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#5F646D",
      link: "Listening: MCM",
      text: "MCM",
    },
    {
      title: "Highlight Correct Summary",
      items: itemNumber?.highlight_summary,
      bg: "#5F646D",
      link: "Highlight Correct Summary",
      text: "HCR",
    },
    {
      title: "Fill in the Blanks",
      items: itemNumber?.blank_listening,
      bg: "#5F646D",
      link: "Fill in the Blanks",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Singles)",
      items: itemNumber?.multi_choice_reading_single_answer,
      bg: "#5F646D",
      link: "Listening: MCS",
      text: "MCS",
    },
    {
      title: "Select Missing Word",
      items: itemNumber?.missing_word,
      bg: "#5F646D",
      link: "Select Missing Word",
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
      link: "Write From Dictation",
      text: "WFD",
    },
  ];
  const MiniGame = [
    {
      title: "Spelling Bee",
      items: "233",
      bg: "#AE7AFF",
      link: "Spelling Bee",
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
