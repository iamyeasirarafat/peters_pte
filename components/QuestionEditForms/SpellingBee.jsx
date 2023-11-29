import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useState } from "react";
const SpellingBee = () => {
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

  const [value, setValue] = useState(false);
  const options = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
    { label: "write option" },
  ];
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

        {/* need change */}

        <div className="mt-5">
          <h3 className="font-bold text-sm">MCQ options</h3>
          <div className="grid grid-cols-4 gap-6">
            {options?.map((option, i) => (
              <label
                key={i}
                className={`group relative inline-flex items-center gap-2 select-none cursor-pointer tap-highlight-color bg-white  py-3 px-2`}
              >
                <div>
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
                </div>
                <input
                  type="text"
                  placeholder="type your answer"
                  className="border-b border-t-0 w-full border-r-0 border-l-0 border-gray-500 focus:outline-none focus:border-indigo-500 pl-0 ml-2"
                />
              </label>
            ))}
          </div>
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

export default SpellingBee;
