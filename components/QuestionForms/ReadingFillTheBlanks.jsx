import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useState } from "react";
const ReadingFillTheBlanks = () => {
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

  const options = [
    { label: "Generic" },
    { label: "Theory" },
    { label: "query" },
    { label: "type your option" },
  ];
  const [value, setValue] = useState("");

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
        {/* select every option */}

        <div>
          <div className="my-4">
            <h2 className="font-bold my-2 text-sm">Answer blank A</h2>
            <div className="grid grid-cols-4 gap-6">
              {options?.map((option, i) => (
                <label
                  key={i}
                  className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                >
                  <input
                    className="absolute top-0 left-0 opacity-0 invisible"
                    type="checkbox"
                    value={value}
                    onChange={() => setValue(option.label)} // Update the selected value
                    checked={value === option.label}
                  />
                  <span
                    className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                      value == option.label
                        ? "bg-green-1 border-green-1 dark:!border-green-1"
                        : "bg-transparent border-n-1 dark:border-white"
                    }`}
                  >
                    <Icon
                      className={`fill-white transition-opacity ${
                        value == option.label ? "opacity-100" : "opacity-0"
                      }`}
                      name="check"
                    />
                  </span>
                  <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-bold my-2 text-sm">Answer blank B</h2>
            <div className="grid grid-cols-4 gap-6">
              {options?.map((option, i) => (
                <label
                  key={i}
                  className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                >
                  <input
                    className="absolute top-0 left-0 opacity-0 invisible"
                    type="checkbox"
                    value={value}
                    onChange={() => setValue(option.label)} // Update the selected value
                    checked={value === option.label}
                  />
                  <span
                    className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                      value == option.label
                        ? "bg-green-1 border-green-1 dark:!border-green-1"
                        : "bg-transparent border-n-1 dark:border-white"
                    }`}
                  >
                    <Icon
                      className={`fill-white transition-opacity ${
                        value == option.label ? "opacity-100" : "opacity-0"
                      }`}
                      name="check"
                    />
                  </span>
                  <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-bold my-2 text-sm">Answer blank C</h2>
            <div className="grid grid-cols-4 gap-6">
              {options?.map((option, i) => (
                <label
                  key={i}
                  className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                >
                  <input
                    className="absolute top-0 left-0 opacity-0 invisible"
                    type="checkbox"
                    value={value}
                    onChange={() => setValue(option.label)} // Update the selected value
                    checked={value === option.label}
                  />
                  <span
                    className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                      value == option.label
                        ? "bg-green-1 border-green-1 dark:!border-green-1"
                        : "bg-transparent border-n-1 dark:border-white"
                    }`}
                  >
                    <Icon
                      className={`fill-white transition-opacity ${
                        value == option.label ? "opacity-100" : "opacity-0"
                      }`}
                      name="check"
                    />
                  </span>
                  <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-bold my-2 text-sm">Answer blank D</h2>
            <div className="grid grid-cols-4 gap-6">
              {options?.map((option, i) => (
                <label
                  key={i}
                  className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                >
                  <input
                    className="absolute top-0 left-0 opacity-0 invisible"
                    type="checkbox"
                    value={value}
                    onChange={() => setValue(option.label)} // Update the selected value
                    checked={value === option.label}
                  />
                  <span
                    className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                      value == option.label
                        ? "bg-green-1 border-green-1 dark:!border-green-1"
                        : "bg-transparent border-n-1 dark:border-white"
                    }`}
                  >
                    <Icon
                      className={`fill-white transition-opacity ${
                        value == option.label ? "opacity-100" : "opacity-0"
                      }`}
                      name="check"
                    />
                  </span>
                  <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
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

export default ReadingFillTheBlanks;
