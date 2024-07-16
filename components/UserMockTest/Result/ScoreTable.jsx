const ScoreTable = ({ data, activeTab }) => {
  const tableHeader = [
    "Section",
    "Item",
    "Contribute",
    "Contributed Scores",
    "My Correctness",
    "Target",
    "Status",
  ];

  const QuestionCategory = {
    read_aloud: { code: "RA", section: "speaking" },
    repeat_sentence: { code: "RS", section: "speaking" },
    describe_image: { code: "DI", section: "speaking" },
    retell_sentence: { code: "RL", section: "speaking" },
    short_question: { code: "ASQ", section: "speaking" },
    summarize: { code: "SWT", section: "writing" },
    write_essay: { code: "WE", section: "writing" },
    summarize_spoken: { code: "SST", section: "listening" },
    blank: { code: "FIB-L", section: "listening" },
    highlight_summary: { code: "HCS", section: "listening" },
    missing_word: { code: "SMW", section: "listening" },
    highlight_incorrect_word: {
      code: "HIW",
      section: "listening",
    },
    multi_choice_multi_answer: { code: "MCM", section: "listening" },
    multi_choice_single_answer: { code: "MCS", section: "listening" },
    dictation: { code: "WFD", section: "listening" },
    reading_writting_blank: { code: "FIB-RW", section: "reading" },
    blank_reading: { code: "FIB-R", section: "reading" },
    reorder_paragraph: { code: "RO", section: "reading" },
    multi_choice_reading_multi_answer: {
      code: "MCM",
      section: "reading",
    },
    multi_choice_reading_single_answer: {
      code: "MCS",
      section: "reading",
    },
  };

  const scoreData = data?.score?.report?.[activeTab];
  const allQuestions = Object?.keys(scoreData) || {};
  const tableData = allQuestions?.map((item) => {
    if (item === "total") {
      return {
        section: "Total",
        contribute: "100%",
        max_score: scoreData[item].max_score,
        score: scoreData[item].score,
        correctness: scoreData[item].correctness,
      };
    } else {
      return {
        section: QuestionCategory?.[item]?.section,
        code: QuestionCategory?.[item]?.code,
        contribute: "33%",
        max_score: scoreData[item].max_score,
        score: scoreData[item].score,
        correctness: scoreData[item].correctness,
        target: "86.0%",
        status: "Bad",
      };
    }
  });
  console.log("tableData", tableData);

  return (
    <>
      <table className="w-full divide-y-1 divide-secondary">
        <tr>
          {tableHeader.map((item, i) => (
            <th
              key={i}
              className="text-sm text-gray font-semibold py-4 text-start capitalize"
            >
              {item}
            </th>
          ))}
        </tr>
        {/* data */}
        {tableData?.map((item, i) => (
          <tr key={i} className="border-t">
            <td className="text-sm text-gray py-4  capitalize">
              {item?.section}
            </td>
            <td className="text-sm text-gray py-4 ">
              {item?.code && item?.code}
            </td>
            <td className="text-sm text-gray py-4 ">{item?.contribute}</td>
            <td className="text-sm text-gray py-4 ">
              {item?.score} / {item?.max_score}
            </td>
            <td className="text-sm text-gray py-4 ">{item?.correctness}</td>
            <td className="text-sm text-gray py-4 ">86.0%</td>
            <td className="text-sm text-gray py-4 ">
              <span className="bg-red text-white p-1 rounded-md">Bad</span>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
export default ScoreTable;
