import Counter from "@/components/Counter";
import LoadingButton from "@/components/LoadingButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
const EssayQuestion = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    reference_text: "",
    appeared: 0,
    prediction: false,
  });
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await axios.post("/write_easy", formData);
      toast.success("Create essay question successfully");
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
            className="w-full border-none py-4 px-5 text-sm "
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mt-5 gap-2">
          <label for="question" className="font-bold text-sm">
            Essay Question
          </label>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            id="question"
            type="question"
            value={formData.question}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2 my-5">
          <label for="reference_text" className="font-bold text-sm">
            Question Paragraph
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm "
            id="reference_text"
            type="text"
            value={formData.reference_text}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2"
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2 bg-white flex items-center pl-4">
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
            Create Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default EssayQuestion;
