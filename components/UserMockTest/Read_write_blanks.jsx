import React, { useState } from "react";
import { FillBlanksBlock } from "../../pages/app/practice/reading_test/read_write_blanks";
import { useRouter } from "next/router";

function Read_write_blanks({ question, aid }) {
  // const [answers, setAnswers] = useState([]);

  console.log("question", question);

  // //!Updating answer state
  // const updateAnswer = (index, value) => {
  //   const existingIndex = answers.findIndex((item) => item.index === index);
  //   if (existingIndex !== -1) {
  //     // If index exists, update its value
  //     setAnswers((prev) => [
  //       ...prev.slice(0, existingIndex),
  //       { index, value },
  //       ...prev.slice(existingIndex + 1),
  //     ]);
  //   } else {
  //     // If index does not exist, add a new entry
  //     setAnswers((prev) => [...prev, { index, value }]);
  //   }
  // };
  // //*submit function
  // const handelSubmit = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(api, {
  //       answers: [
  //         ...answers.map((item) => (item.value ? item.value : undefined)),
  //       ],
  //       time_taken: timeTakenInMinutes,
  //     });
  //     toast.success(res.data.message || "Submitted Successfully");
  //     setReFetch((prev) => !prev);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.response?.data?.message || "Something went wrong");
  //   }
  // };

  // const abc = {
  //   1: "A",
  //   2: "B",
  //   3: "C",
  //   4: "D",
  //   5: "E",
  //   6: "F",
  //   7: "G",
  //   8: "H",
  //   9: "I",
  //   10: "J",
  //   11: "K",
  //   12: "L",
  //   13: "M",
  //   14: "N",
  //   15: "O",
  //   16: "P",
  //   17: "Q",
  //   18: "R",
  //   19: "S",
  //   20: "T",
  //   21: "U",
  //   22: "V",
  //   23: "W",
  //   24: "X",
  //   25: "Y",
  //   26: "Z",
  // };
  const router = useRouter();
  const mockTestId = router?.query?.testId;
  const answerApi = `/mocktest/writting/${mockTestId}/answer/${aid}`;
  return (
    <>
      <p className="font-semibold mb-6">
        Below is a text with blanks. Click on each blank, a list of choices will
        appear. Select the appropriate answer choice for each blank.
      </p>
      <div>
        {/* doloribus ut rerum consectetur velit excepturi voluptatem, eius
        similique, consequuntur cum mollitia tempore accusamus dolorum. Itaque
        <div className="px-2 inline-block">
          <select
            // onBlur={onChange}
            // onChange={onChange}
            className="w-40 text-gray  text-center border border-x-0 border-t-0 border-b-gray outline-none focus:ring-transparent focus:border-gray p-0 m-0"
          >
            <option value="">Select Answer</option>
            <option value="Dolor">Dolor</option>
          </select>
        </div>
        exercitationem provident repellat autem nam neque voluptas accusantium,
        impedit illo. */}
        {/* <p className="text-xl font-medium">
          {Array.isArray(question) &&
            question.map((word, index) => {
              return (
                <span key={index}>
                  {word}
                  {index !== question.length - 1 && (
                    <FillBlankInput
                      options={
                        option_list.filter(
                          (item) => item.index === abc[index + 1]
                        )[0]?.options
                      }
                      onChange={(e) => updateAnswer(index, e.target.value)}
                    />
                  )}
                </span>
              );
            })}
        </p> */}
      </div>
    </>
  );
}

export default Read_write_blanks;

const FillBlankInput = ({ onChange, options }) => {
  return (
    <div className="px-2 inline-block">
      <select
        onBlur={onChange}
        // onChange={onChange}
        className="w-40 text-gray  text-center border border-x-0 border-t-0 border-b-gray outline-none focus:ring-transparent focus:border-gray p-0 m-0"
      >
        <option value="">Select Answer</option>
        {options?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
