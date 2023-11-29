import Counter from "@/components/Counter";
import { useState } from "react";
const FibReading = () => {
  const [formData, setFormData] = useState({
    name: "",
    paragraph: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <Counter
          className="bg-white w-full mt-4"
          title="Blanks Number"
          value={formData.appeared}
          setValue={(value) => setFormData({ ...formData, appeared: value })}
        />
        <div className="flex flex-col gap-2 my-5 relative">
          <label for="paragraph" className="font-bold text-sm">
            Question Paragraph
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm "
            id="paragraph"
            type="text"
            value={formData.paragraph}
            onChange={handleInputChange}
          />
          <div className="flex gap-5 absolute top-10 left-38">
            <span className="px-4 border">A</span>
            <span className="px-4 border">B</span>
            <span className="px-4 border">C</span>
            <span className="px-4 border">D</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 my-5">
          <div>
            <h3 className="text-sm font-bold mb-2">Correct A</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Correct B</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Correct C</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Correct D</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
        </div>

        <Counter
          className="bg-white w-full mt-8"
          title="Extra Option Number"
          value={formData.appeared}
          setValue={(value) => setFormData({ ...formData, appeared: value })}
        />

        <div className="grid grid-cols-4 gap-2 my-5 mb-12">
          <div>
            <h3 className="text-sm font-bold mb-2">Extra option A</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Extra option B</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Extra option C</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Extra option D</h3>
            <input
              type="text"
              placeholder="write your text"
              className="border-none py-4"
            />
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2"
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2 border bg-white flex items-center pl-4">
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
        <button
          type="submit"
          className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          Create Question
        </button>
      </form>
    </div>
  );
};

export default FibReading;
