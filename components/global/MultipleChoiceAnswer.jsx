import axios from "axios";
import { use, useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

function MultipleChoiceAnswer({ answers, result, api, setReFetch }) {
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState([]);
  console.log("answerData", answerData);
  //submit data
  const handelSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(api, {
        answer: answerData,
      });
      toast.success(res.data.message || "Submitted Successfully");
      setReFetch((prev) => !prev);
      setLoading(false);
      setAnswerData([]);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="p-5 rounded-[15px] border border-primary">
        <p className="text-lg text-center">
          Based on the audio, which of the following is a true statement about
          short story writing?
        </p>
        <div className="space-y-2 mt-2">
          {answers?.map((answer, i) => (
            <Answer
              key={i}
              answer={answer}
              answerData={answerData}
              setAnswerData={setAnswerData}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handelSubmit}
          disabled={loading}
          className="py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-blue text-white font-semibold text-lg"
          type="submit"
        >
          {loading && <LoaderIcon />}{" "}
          {result?.self?.user ? "Re-Submit" : "Submit"}
        </button>
      </div>
    </>
  );
}

export default MultipleChoiceAnswer;

export const Answer = ({ answer, answerData, setAnswerData }) => {
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (isCheck) {
      setAnswerData((prev) => [...prev, answer?.value]);
    } else {
      setAnswerData((prev) => prev.filter((item) => item !== answer?.value));
    }
  }, [isCheck, answer?.value, setAnswerData]);

  const isChecked = answerData.includes(answer?.value);
  const labelClass = isChecked ? "bg-secondary" : "bg-white";

  return (
    <label
      htmlFor={answer?.index}
      className={`${labelClass} rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        id={answer?.index}
        onChange={() => setIsCheck(!isCheck)}
        checked={isChecked}
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{answer?.index}.</span>
        <span className="text-base">{answer?.value}</span>
      </p>
    </label>
  );
};
