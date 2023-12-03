import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
const ReadingFillTheBlanks = () => {
  const [formData, setFormData] = useState({
    title: "",
    sentence: [],
    appeared: 0,
    prediction: false,
    options: [],
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

  const optionss = [
    { label: "Generic" },
    { label: "Theory" },
    { label: "query" },
    { label: "type your option" },
  ];
  const [value, setValue] = useState("");

  // fill the blanks
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const contentEditableRef = useRef(null);
  const [buttonCounter, setButtonCounter] = useState(65); // ASCII code for 'A'

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
        { id: buttonText, text: "" },
      ]);
    }
  };

  const handleTextAreaChange = (id, e) => {
    // Update the state with the text from the textarea
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, text: e.target.value } : option
      )
    );
  };

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // Extract text content from parsed document, excluding button text
    const paragraphs = Array.from(doc.body.childNodes)
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
      answers: options,
    }));
  }, [options, text]);
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
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center h-16 p-5 bg-white my-3 border-n-1 rounded-sm dark:border-white">
          <div className="mr-auto text-sm font-bold">Blanks Number</div>
          <div className="flex items-center shrink-0 ml-4">
            <div className="min-w-[2.5rem] text-center text-xs font-bold">
              {options?.length}
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
        {/* select every option */}

        <div>
          {options.map((option, i) => (
            <div key={i} className="my-4">
              <h2 className="font-bold my-2 text-sm">
                Answer blank {option?.id}
              </h2>
              <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
                {optionss?.map((option, i) => (
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
          ))}
        </div>

        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2"
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2  bg-white flex items-center pl-4">
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
