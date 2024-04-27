import axios from "axios";
import { useRouter } from "next/router";
import LoadingButton from "@/components/LoadingButton";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import EditCounter from "./EditCounter";
const SummerizeWritten = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    appeared: 0,
    prediction: false,
  });
  useEffect(() => {
    setFormData(itemObj);
  }, [item]);
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `/summarize/${itemObj?.id}/update`,
        formData
      );
      toast.success("Updated summarize question successfully");
      if (response?.data) {
        router.back();
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="title" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-5">
          <label for="content" className="font-bold text-sm">
            Question Paragraph
          </label>
          <textarea
            required
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="content"
            type="text"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between gap-6">
          <EditCounter
            className="bg-white w-1/2 dark:bg-white/20 "
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2 bg-white flex items-center pl-4 dark:bg-white/20 ">
            <input
              id="prediction"
              type="checkbox"
              className="text-green-500 focus-visible:outline-none"
              checked={formData.prediction}
              onChange={handleInputChange}
            />
            <label for="prediction" className="text-sm font-bold ml-2">
              Prediction
            </label>
          </div>
        </div>
        {!loading ? (
          <button
            type="submit"
            className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
          >
            Update Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default SummerizeWritten;
