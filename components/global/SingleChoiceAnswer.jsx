import { useState } from "react";

function SingleChoiceAnswer({ answers, result, api, setReFetch }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  console.log("selectedAnswer", [selectedAnswer]);
  //submit data
  const handelSubmit = async () => {
    try {
      const res = await axios.post(api, {
        answer: [selectedAnswer],
      });
      toast.success(res.data.message || "Submitted Successfully");
      setReFetch((prev) => !prev);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="p-5 rounded-[15px] border border-primary">
      <p className="text-lg text-center">
        Based on the audio, which of the following is a true statement about
        short story writing?
      </p>
      <div>
        <div className="space-y-2 mt-2">
          {answers?.map((answer, i) => (
            <Answer
              key={i}
              answer={answer}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handelSubmit}
            className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
            type="submit"
          >
            {result ? "Re-Submit" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleChoiceAnswer;

export const Answer = ({ answer, selectedAnswer, setSelectedAnswer }) => {
  return (
    <label
      className={`${
        selectedAnswer === answer?.answer ? "bg-secondary" : "bg-white"
      } rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        checked={answer?.answer === selectedAnswer}
        onClick={() =>
          setSelectedAnswer(
            answer?.answer === selectedAnswer ? null : answer?.answer
          )
        }
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{answer?.index}.</span>
        <span className="text-base">{answer?.answer}</span>
      </p>
    </label>
  );
};
