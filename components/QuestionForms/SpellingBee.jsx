import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const SpellingBee = () => {
  const [loading, setLoading] = useState(false);
  const [rightAnswer, setRightAnswer] = useState({ id: null, answer: "" });
  const { register, handleSubmit, watch, reset } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      right_option: rightAnswer?.answer,
    };
    try {
      setLoading(true);
      const res = await axios.post("/games/spelling_bee", newData);
      toast.success("Question created successfully");
      setLoading(false);
      reset();
      setRightAnswer({ id: null, answer: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };
  const options = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
    { label: "option3" },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            {...register("title", { required: true })}
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            type="text"
          />
        </div>
        <div className="mt-5">
          <h3 className="font-bold text-sm">MCQ options</h3>
          <div className="grid grid-cols-4 gap-6 mt-3">
            {options?.map((_, index) => (
              <label
                key={index}
                className={`group relative inline-flex items-center gap-2 select-none cursor-pointer tap-highlight-color bg-white  py-3 px-2`}
              >
                <input
                  checked={rightAnswer?.id === index}
                  onChange={() =>
                    setRightAnswer({
                      id: index,
                      answer: watch(`options.${index}`),
                    })
                  }
                  className="border-2 border-green-500 text-green-500 ring-transparent focus:ring-transparent w-5 h-5 cursor-pointer"
                  type="checkbox"
                />
                <input
                  {...register(`options.${index}`, { required: true })}
                  type="text"
                  placeholder="type your answer"
                  className="border-b border-t-0 w-full border-r-0 border-l-0 border-gray-500 focus:outline-none  appearance-none focus:ring-0 pl-0 ml-2"
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-10 flex items-center gap-x-3 justify-center w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          {loading && (
            <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
          )}
          Create Question
        </button>
      </form>
    </div>
  );
};

export default SpellingBee;
