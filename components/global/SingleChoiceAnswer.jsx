function SingleChoiceAnswer({
  register,
  answers,
  selectedAnswer,
  setSelectedAnswer,
  setGivenAnswer,
}) {
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
            answer={answer}
            serial={i}
            register={register}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            setGivenAnswer={setGivenAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default SingleChoiceAnswer;

export const Answer = ({
  answer,
  register,
  serial,
  setSelectedAnswer,
  selectedAnswer,
  setGivenAnswer,
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
  return (
    <label
      className={`${
        selectedAnswer === answer ? "bg-secondary" : "bg-white"
      } rounded-[15px] border border-primary p-3 flex items-center gap-x-3 cursor-pointer`}
    >
      <input
        {...register(`${serial}`)}
        className="border-2 border-primary focus:ring-transparent cursor-pointer w-7 h-7 rounded-md text-primary"
        type="checkbox"
        checked={selectedAnswer === answer}
        onClick={() => {
          setSelectedAnswer(answer);
          setGivenAnswer([serial]);
        }}
      />
      <p className="text-gray flex items-center gap-x-5 text-xl">
        <span className="capitalize">{obj[serial + 1]}.</span>
        <span className="text-base">{answer}</span>
      </p>
    </label>
  );
};
