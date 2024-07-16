"use client";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const items = [
  {
    name: "Read Aloud",
    bg: "#FF8412",
    path: "/app/practice/speaking_test/read_aloud?que_no=1",
    uv: 4000,
    pv: 2400,
    abbr: "RA",
  },
  {
    name: "Repeat Sentence",
    bg: "#FF8412",
    path: "/app/practice/speaking_test/repeat_sentence",
    uv: 3000,
    pv: 1398,
    abbr: "RS",
  },
  {
    name: "Describe Image",
    bg: "#FF8412",
    path: "/app/practice/speaking_test/describe_image",
    uv: 2000,
    pv: 9800,
    abbr: "DI",
  },
  {
    name: "Re-Tell Lecture",
    bg: "#FF8412",
    path: "/app/practice/speaking_test/retell_lecture",
    uv: 2780,
    pv: 3908,
    abbr: "RTL",
  },
  {
    name: "Answer Short Question",
    bg: "#FF8412",
    path: "/app/practice/speaking_test/answer_short_question",
    uv: 1890,
    pv: 4800,
    abbr: "ASQ",
  },
  {
    name: "Summarize Written Text",
    bg: "#F2B277",
    path: "/app/practice/writing_test/summarize_written?que_no=1",
    uv: 2390,
    pv: 3800,
    abbr: "SWT",
  },
  {
    name: "Write Essay",
    bg: "#F2B277",
    path: "/app/practice/writing_test/write_essay",
    uv: 3490,
    pv: 4300,
    abbr: "WE",
  },
  {
    name: "Writing Fill in the blanks",
    bg: "#4399FF",
    path: "/app/practice/reading_test/fill_blanks",
    uv: 4000,
    pv: 2400,
    abbr: "WFIB",
  },
  {
    name: "Multiple Choice Multiple Reading",
    bg: "#4399FF",
    path: "/app/practice/reading_test/multiple_answers?que_no=3",
    uv: 3000,
    pv: 1398,
    abbr: "MCMR",
  },
  {
    name: "Re-order Paragraphs",
    bg: "#4399FF",
    path: "/app/practice/reading_test/reorder_paragraphs",
    uv: 2000,
    pv: 9800,
    abbr: "RP",
  },
  {
    name: "Reading Fill in the Blanks",
    bg: "#4399FF",
    path: "/app/practice/reading_test/fill_blanks?que_no=6",
    uv: 2780,
    pv: 3908,
    abbr: "RFIB",
  },
  {
    name: "Multiple Choice Single Answer",
    bg: "#4399FF",
    path: "/app/practice/reading_test/single_answer?que_no=5",
    uv: 1890,
    pv: 4800,
    abbr: "MCSA",
  },
  {
    name: "Summarize Spoken Text",
    bg: "#616161",
    path: "/app/practice/listening_test/spoken_text?que_no=1",
    uv: 2390,
    pv: 3800,
    abbr: "SST",
  },
  {
    name: "Multiple Choice Multiple Question",
    bg: "#616161",
    path: "/app/practice/listening_test/multiple_answers?que_no=1",
    uv: 3490,
    pv: 4300,
    abbr: "MCMQ",
  },
  {
    name: "Fill in the Blanks",
    bg: "#616161",
    path: "/app/practice/listening_test/fill_blanks?que_no=1",
    uv: 4000,
    pv: 2400,
    abbr: "LFIB",
  },
  {
    name: "Highlight Correct Summary",
    bg: "#616161",
    path: "/app/practice/listening_test/highlight_summary?que_no=1",
    uv: 3000,
    pv: 1398,
    abbr: "HCS",
  },
  {
    name: "Multiple Choice (Single)",
    bg: "#616161",
    path: "/app/practice/listening_test/single_answer?que_no=2",
    uv: 2000,
    pv: 9800,
    abbr: "LMCS",
  },
  {
    name: "Select Missing Word",
    bg: "#616161",
    path: "/app/practice/listening_test/missing_word?que_no=1",
    uv: 2780,
    pv: 3908,
    abbr: "SMW",
  },
  {
    name: "Highlight Incorrect Words",
    bg: "#616161",
    path: "/app/practice/listening_test/highlight_incorrect_words",
    uv: 1890,
    pv: 4800,
    abbr: "HIW",
  },
  {
    name: "Write From Dictation",
    bg: "#616161",
    path: "/app/practice/listening_test/write_dictation",
    uv: 2390,
    pv: 3800,
    abbr: "WFD",
  },
];
export default function BarChartPTE() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" bg-secondary rounded-t-lg p-4">
      <div className="flex flex-wrap gap-5 text-[#949494] mb-4 ml-4">
        <p className="flex gap-1 justify-start items-center">
          <span className="w-3 h-3 rounded-full bg-[#FF8412]" />
          Speaking
        </p>
        <p className="flex gap-1 justify-start items-center">
          <span className="w-3 h-3 rounded-full bg-[#F2B277]" />
          Writing
        </p>
        <p className="flex gap-1 justify-start items-center">
          <span className="w-3 h-3 rounded-full bg-[#4399FF]" />
          Reading
        </p>
        <p className="flex gap-1 justify-start items-center">
          <span className="w-3 h-3 rounded-full bg-[#616161]" />
          Listening
        </p>
      </div>
      <div className="h-[300px] md:h-[500px] w-full bg-white rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            key="unique-chart-key"
            data={items}
            margin={{ top: 60, bottom: 20, left: 20, right: 20 }}
          >
            <XAxis
              dataKey="abbr"
              axisLine={false}
              tick={<CustomizedAxisTick />}
            />
            <YAxis axisLine={false} hide={isMobile} />
            <Tooltip
              cursor={{
                fill: "transparent",
              }}
              content={<CustomTooltip payload={items} />}
            />
            <CartesianGrid vertical={false} />
            <Bar dataKey="pv" background={{ fill: "#FFF4EB" }} barSize={30}>
              {items.map((item, i) => (
                <Cell key={`cell-${i}`} fill={item.bg} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        y={4}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ payload }) => {
  if (payload?.length) {
    return (
      <>
        {payload.map((element, i) => (
          <div
            key={i}
            className="border border-[#FF8412] rounded-lg bg-white p-3 shadow-sm"
          >
            <p>{element.payload.name}</p>
            <p>{element.payload.pv}</p>
          </div>
        ))}
      </>
    );
  }
};
