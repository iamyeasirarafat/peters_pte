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
        {answers?.map((answer, i) => (
          <Answer
            key={i}
            serial={i}
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

const Answer = ({
  register,
  answer,
  serial,
  setSelectedAnswer,
  selectedAnswer,
}) => {
  const obj = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
  };
  console.log(selectedAnswer);
  return (
    <label
      className={`${
        selectedAnswer === answer ? "bg-secondary" : "bg-white"
      } rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        {...register(`${answer}`)}
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        checked={selectedAnswer === answer}
        onChange={() => {
          setSelectedAnswer(`${answer}`);
        }}
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{obj[serial + 1]}.</span>
        <span className="text-base">{answer}</span>
      </p>
    </label>
  );
};
