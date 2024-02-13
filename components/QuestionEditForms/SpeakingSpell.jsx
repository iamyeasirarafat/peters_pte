import Counter from "@/components/Counter";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const SpeakingSpell = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);

  useEffect(() => {
    const getDetails = async (id) => {
      try {
        const response = await axios.get(`/games/speaking_spell/${id}`);
        if (response?.data) {
          setTitle(response?.data?.word)
        }
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    };
    getDetails(itemObj.id);

  }, [item]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.put(
      `/games/speaking_spell/${itemObj.id}/update`,
      {word:title}
    );
    toast.success("Question updated successfully");
    if (res?.data) {
      router.back();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Speaking Word
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            id="name"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button
          type="submit"
          className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          Update Questions
        </button>
      </form>
    </div>
  );
};

export default SpeakingSpell;
