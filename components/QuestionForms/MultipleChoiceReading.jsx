import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import LoadingButton from "@/components/LoadingButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const MultipleChoiceReading = () => {
  const router = useRouter();
  const [optionNumber, setOptionNumber] = useState(4);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(
    Array.from({ length: optionNumber }, (_, index) => ({
      index: String.fromCharCode(65 + index),
      value: "",
    }))
  );
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (optionIndex) => {
    if (selectedOptions.includes(optionIndex)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item !== optionIndex)
      );
    } else {
      setSelectedOptions([...selectedOptions, optionIndex]);
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    options: options,
    right_options: selectedOptions.map((index) => {
      const option = options.find((opt) => opt.index === index);
      return option ? option.value : ""; // If an option is found, return its value, otherwise return an empty string.
    }),
    appeared: 0,
    prediction: false,
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      options: options,
      right_options: selectedOptions.map((index) => {
        const option = options.find((opt) => opt.index === index);
        return option ? option.value : "";
      }),
    }));
  }, [options, selectedOptions]);
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    setOptions((prevOptions) => {
      return Array.from({ length: optionNumber }, (_, index) => {
        if (index < prevOptions.length) {
          return prevOptions[index];
        } else {
          return {
            index: String.fromCharCode(65 + index),
            value: "",
          };
        }
      });
    });
  }, [optionNumber]);
  const handleTextAreaChange = (index, value) => {
    const updatedData = [...options];
    updatedData[index] = { ...updatedData[index], value };
    setOptions(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const optionsJson = JSON.stringify(formData?.options);
    // const rightOptionsJson = JSON.stringify(formData?.right_options);
    try {
      setLoading(true);
      const newForm = new FormData();
      newForm.append("title", formData?.title);
      newForm.append("content", formData?.content);
      newForm.append("text_content", formData?.text_content);
      newForm.append("options", optionsJson);
      formData.right_options.forEach((item) =>
        newForm.append("right_options", item)
      );
      // newForm.append("right_options", rightOptionsJson);
      newForm.append("appeared", formData?.appeared);
      newForm.append("prediction", formData?.prediction);
      newForm.append("single", false);
      const config = {
        headers: {
          "content-type": "multipart/form-data", // Use lowercase for header keys
        },
      };
      const response = await axios.post(
        "/multi_choice/reading",
        newForm,
        config
      );
      // const response = await axios.post("/multi_choice/reading", formData);
      toast.success("Create question successfully");
      if (response?.data) {
        router.back();
      }
    } catch (error) {
      toast.error("something went wrong");
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
          />
        </div>
        <div className="flex flex-col gap-2 my-5">
          <label for="content" className="font-bold text-sm">
            Question Paragraph
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="content"
            type="text"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        {/* question line */}
        <div className="flex flex-col gap-2 my-5">
          <label for="text_content" className="font-bold text-sm">
            Question Line
          </label>
          <textarea
            rows={2}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20"
            id="text_content"
            type="text"
            value={formData.text_content}
            onChange={handleInputChange}
          />
        </div>

        {/* more field */}
        <div className="flex justify-between gap-6 mt-5">
          <Counter
            className="bg-white w-1/2 dark:bg-white/20 "
            title="Option Number"
            value={optionNumber}
            setValue={(value) => setOptionNumber(value)}
          />
          <div className="w-1/2  bg-white flex items-center pl-4 dark:bg-white/20 ">
            <div className="grid grid-cols-4">
              {options?.map((option, i) => (
                <div key={i}>
                  <label
                    className={`className="group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12 dark:bg-white/20 "`}
                  >
                    <input
                      className="absolute top-0 left-0 opacity-0 invisible"
                      type="checkbox"
                      value={option.index}
                      onChange={() => handleCheckboxChange(option.index)}
                      checked={selectedOptions.includes(option.index)} // Use 'in' operator to check if the key exists
                    />
                    <span
                      className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                        selectedOptions.includes(option.index)
                          ? "bg-green-1 border-green-1 dark:!border-green-1"
                          : "bg-transparent border-n-1 dark:border-white"
                      }`}
                    >
                      <Icon
                        className={`fill-white transition-opacity ${
                          selectedOptions.includes(option.index)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        name="check"
                      />
                    </span>
                    <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                      {option?.index}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 my-6 gap-3">
          {options?.map((option, i) => (
            <div key={i}>
              <h3 className="font-semibold text-sm mb-2">
                Option {option.index}
              </h3>
              <textarea
                rows={5}
                placeholder="Start Typing..."
                className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
                id="paragraph"
                type="text"
                value={option?.value}
                onChange={(e) => handleTextAreaChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2 dark:bg-white/20"
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2  bg-white flex items-center pl-4 dark:bg-white/20 ">
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

export default MultipleChoiceReading;
