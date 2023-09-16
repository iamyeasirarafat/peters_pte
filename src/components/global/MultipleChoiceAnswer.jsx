import React from "react";

function MultipleChoiceAnswer({ register, answers }) {
  return (
    <div className="p-5 rounded-[15px] border border-primary">
      <p className="text-lg text-center">
        Based on the audio, which of the following is a true statement about
        short story writing?
      </p>
      <div className="space-y-2 mt-2">
        {answers.map((answer, i) => (
          <Answer key={i} answer={answer} register={register} />
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceAnswer;

export const Answer = ({ answer, register }) => {
  return (
    <label className="bg-secondary rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer">
      <input
        {...register(`${answer?.serial}`)}
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        name=""
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{answer?.serial}.</span>
        <span className="text-base">{answer?.answer}</span>
      </p>
    </label>
  );
};
