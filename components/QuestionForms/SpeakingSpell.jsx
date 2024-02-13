import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
const SpeakingSpell = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post("/games/speaking_spell", data);
      console.log(res);
      toast.success("Question created successfully");
      setLoading(false);
      reset();
      if (res?.data) {
        router.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Speaking Word
            </label>
            {/* <h3 className="text-sm font-semibold">Question Id #785263891</h3> */}
          </div>
          <input
            {...register("word", { required: true })}
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm"
            type="text"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full flex items-center justify-center gap-x-3 mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
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

export default SpeakingSpell;
