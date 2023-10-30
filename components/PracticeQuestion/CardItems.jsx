import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

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
      link: "#",
      text: "RA",
    },
    {
      title: "Repeat Sentence",
      items: itemNumber?.repeat_sentence,
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Describe Image",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Answer Short Question",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Re-Tell Lecture",
      items: itemNumber?.retell_sentence,
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
  ];
  const Writing = [
    {
      title: "Summarize Written Text",
      items: itemNumber?.summarize_written,
      bg: "#F2B277",
      link: "#",
      text: "SWT",
    },
    {
      title: "Write Essay",
      items: itemNumber?.write_easy,
      bg: "#F2B277",
      link: "#",
      text: "SWT",
    },
  ];
  const reading = [
    {
      title: "Reading & Writing: FIB",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Multiple Choice (Multiple)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Re-order Paragraphs",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Reading: Fill in the Blanks",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Multiple Choice (Single)",
      items: itemNumber?.multi_choice_single_answer,
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
  ];
  const Speaking2 = [
    {
      title: "Summarize Spoken Text",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Multiple Choice (Multiples)",
      items: itemNumber?.multi_choice_multiple_answer,
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Highlight Correct Summary",
      items: itemNumber?.highlight_summary,
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Fill in the Blanks",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Multiple Choice (Singles)",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Select Missing Word",
      items: itemNumber?.missing_word,
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Highlight Incorrect Words",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Write From Dictation",
      items: itemNumber?.dictation,
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
  ];
  const MiniGame = [
    {
      title: "Spelling Bee",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
    },
    {
      title: "Speaking Spell",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
    },
    {
      title: "Listening Frenzy",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
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
