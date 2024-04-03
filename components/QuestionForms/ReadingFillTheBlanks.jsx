import EditCounter from "@/components/EditCounter";
import Icon from "@/components/Icon";
import LoadingButton from "@/components/LoadingButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const ReadingFillTheBlanks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    sentence: [],
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

  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const contentEditableRef = useRef(null);
  const [buttonCounter, setButtonCounter] = useState(65); // ASCII code for 'A'

  // add blank option
  const handleButtonClick = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Check if the range is within the contentEditable div
    if (
      contentEditableRef.current &&
      contentEditableRef.current.contains(range.commonAncestorContainer)
    ) {
      const buttonText = String.fromCharCode(buttonCounter);
      setButtonCounter(buttonCounter + 1);
      const buttonElement = document.createElement("button");
      buttonElement.innerHTML = `<b>${buttonText}</b>`;
      buttonElement.className = "px-4 bg-orange-400 mb-3 mx-3";
      buttonElement.contentEditable = false;

      // Insert the button element at the current caret position
      range.deleteContents();
      range.insertNode(buttonElement);

      // Move the caret after the inserted button
      range.setStartAfter(buttonElement);
      range.setEndAfter(buttonElement);

      // Update the state with the new HTML content
      setText(contentEditableRef.current.innerHTML);

      // Initialize the option in the state as an object with an empty string
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          index: buttonText,
          options: [""],
          answer: "",
        },
      ]);
    }
  };

  const handleTextAreaChange = (optionIndex, insideIndex, e) => {
    // Update options in the state
    const newOptions = options.map((option) => {
      if (option.index === optionIndex) {
        return {
          ...option,
          options: option.options.map((item, idx) =>
            idx === insideIndex ? e.target.value : item
          ),
        };
      }
      return option;
    });
    setOptions(newOptions);
  };

  useEffect(() => {
    // Extract text content from parsed document, excluding button text
    const paragraphs = Array.from(contentEditableRef.current.childNodes)
      .map((node) => {
        if (node.nodeName === "BUTTON") {
          return ""; // Exclude button text
        }
        return node.textContent.trim();
      })
      .filter((sentence) => sentence !== ""); // Remove empty strings

    setFormData((prevFormData) => ({
      ...prevFormData,
      sentence: paragraphs,
      options: options,
    }));
  }, [options, text]);

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/read-write/blank", formData);
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

  const handleSelectOption = (index, ans) => {
    const newOptions = options.map((option) => {
      if (option.index === index) {
        return { ...option, answer: ans };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleInsideButtonClick = (index, counterValue) => {
    const optionIndex = options?.findIndex((item) => item.index === index);

    if (counterValue > options[optionIndex].options.length) {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.index === index
            ? {
              ...option,
              options: [...option.options, ""],
            }
            : option
        )
      );
    }
    if (counterValue < options[optionIndex].options.length) {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.index === index
            ? {
              ...option,
              options: option.options.slice(0, -1),
            }
            : option
        )
      );
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
        <div className="flex items-center h-16 p-5 bg-white my-3 border-n-1 rounded-sm dark:border-white dark:bg-white/20 ">
          <div className="mr-auto text-sm font-bold">Blanks Number</div>
          <div className="flex items-center shrink-0 ml-4">
            <div className="min-w-[2.5rem] text-center text-xs font-bold">
              {options.length}
            </div>
            <button
              className="group"
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick();
              }}
            >
              <Icon
                className="icon-18 transition-colors group-hover:fill-purple-2 dark:fill-white"
                name="plus-circle"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-5 relative">
          <label for="paragraph" className="font-bold text-sm">
            Question Paragraph
          </label>
          <div
            className="w-full h-32 border p-5 overflow-y-scroll overflow-x-hidden"
            ref={contentEditableRef}
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: text }}
            placeholder="Type your text here..."
            id="paragraph"
          />
        </div>

        {options.map((option) => (
          <div
            key={option.index}
            className="flex justify-between items-center w-full"
          >
            <div>
              <h1>Answer Blank {option.index}</h1>
              <div className="grid grid-cols-4 gap-2 my-5 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
                {/* options of option */}
                {option?.options.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between  items-center bg-white dark:bg-white/20 "
                  >
                    <label
                      className={`group ml-3 relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white `}
                    >
                      <input
                        className="absolute top-0 left-0 opacity-0 invisible"
                        type="checkbox"
                        value={option.index}
                        onChange={() => handleSelectOption(option?.index, item)}
                        checked={option.answer === item && option.answer !== ""}
                      />
                      <span
                        className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${option.answer === item && option.answer !== ""
                          ? "bg-green-1 border-green-1 dark:!border-green-1"
                          : "bg-transparent border-n-1 dark:border-white"
                          }`}
                      >
                        <Icon
                          className={`fill-white transition-opacity ${option.answer === item && option.answer !== ""
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                          name="check"
                        />
                      </span>
                    </label>
                    <input
                      type="text"
                      value={
                        option.options.length > 0 ? option.options[idx] : ""
                      }
                      onChange={(e) =>
                        handleTextAreaChange(option.index, idx, e)
                      }
                      placeholder="write your text"
                      className="border-none py-4 dark:bg-white/20 "
                    />
                  </div>
                ))}
              </div>
            </div>
            <EditCounter
              className=""
              value={option.options.length}
              setValue={(counterValue) =>
                handleInsideButtonClick(option.index, counterValue)
              }
            />
          </div>
        ))}

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
            Create Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default ReadingFillTheBlanks;
