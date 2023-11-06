import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const CardItems = () => {
  const [itemNumber, setItemNumber] = useState({});
  console.log(itemNumber);
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
      items: "233",
      bg: "#CF8800",
      link: "Describe Image",
      text: "DI",
    },
    {
      title: "Answer Short Question",
      items: "233",
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
      items: "233",
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
      items: "233",
      bg: "#4399FF",
      link: "Re-order Paragraphs",
      text: "RP",
    },
    {
      title: "Reading: Fill in the Blanks",
      items: "233",
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
      items: "233",
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
      items: "233",
      bg: "#5F646D",
      link: "Fill in the Blanks",
      text: "FIB",
    },
    {
      title: "Multiple Choice (Singles)",
      items: "233",
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
      items: "233",
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
        <div className="grid grid-cols-3 gap-5">
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
        <div className="grid grid-cols-3 gap-5">
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
        <div className="grid grid-cols-3 gap-5">
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
        <h2 className="text-lg font-bold mb-3 mt-5">Speaking Test</h2>
        <div className="grid grid-cols-3 gap-5">
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
        <div className="grid grid-cols-3 gap-5">
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
