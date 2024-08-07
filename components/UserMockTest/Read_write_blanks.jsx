import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

function Read_write_blanks({ question, aid }) {
  // const [answers, setAnswers] = useState([]);

  console.log("question", question);

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
        {/* =================================== */}
        <FillBlanksBlock
          typingTime={2}
          question={question}
          api={answerApi}
          sentence={question?.sentence}
          option_list={question?.options || []}
        />
      </div>
    </>
  );
}

export default Read_write_blanks;

const FillBlanksBlock = ({ question, sentence, option_list, api }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  //!Updating answer state
  const updateAnswer = (index, value) => {
    const existingIndex = answers.findIndex((item) => item.index === index);
    if (existingIndex !== -1) {
      // If index exists, update its value
      setAnswers((prev) => [
        ...prev.slice(0, existingIndex),
        { index, value },
        ...prev.slice(existingIndex + 1),
      ]);
    } else {
      // If index does not exist, add a new entry
      setAnswers((prev) => [...prev, { index, value }]);
    }
  };

  const getAnswer = () => {
    const answer = [];
    answers.forEach((item) => {
      if (item.value) {
        answer.push(item.value);
      }
    });
    return answer;
  };
  //*submit function
  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(api, {
        answers: getAnswer(),
        type: question?.type,
        id: question?.id,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const abc = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };

  // submiting function
  const summitButton = useRef(null);
  useEffect(() => {
    const layout_button = document.getElementById("submit_button");
    layout_button.addEventListener("click", () => {
      summitButton.current.click();
    });
  }, []);
  return (
    <>
      <div className="border border-primary rounded-lg p-2">
        <p className="text-xl font-medium">
          {Array.isArray(sentence) &&
            sentence.map((word, index) => {
              return (
                <span key={index}>
                  {word}
                  {index !== sentence.length - 1 && (
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
        </p>
      </div>
      <button onClick={handelSubmit} className="hidden" ref={summitButton} />
    </>
  );
};

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
