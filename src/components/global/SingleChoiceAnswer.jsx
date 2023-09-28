import { useState } from "react";

function SingleChoiceAnswer({ register, answers }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <div className="p-5 rounded-[15px] border border-primary">
      <p className="text-lg text-center">
        Based on the audio, which of the following is a true statement about
        short story writing?
      </p>
      <div className="space-y-2 mt-2">
        {answers.map((answer, i) => (
          <Answer
            key={i}
            answer={answer}
            register={register}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default SingleChoiceAnswer;

const Answer = ({ register, answer, setSelectedAnswer, selectedAnswer }) => {
  return (
    <label
      className={`${
        selectedAnswer === answer?.serial ? "bg-secondary" : "bg-white"
      } rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        {...register(`${answer?.serial}`)}
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        checked={selectedAnswer === answer?.serial}
        onChange={() => {
          setSelectedAnswer(`${answer?.serial}`);
        }}
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{answer?.serial}.</span>
        <span className="text-base">{answer?.answer}</span>
      </p>
    </label>
  );
};
