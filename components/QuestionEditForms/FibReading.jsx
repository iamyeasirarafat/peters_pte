import LoadingButton from "@/components/LoadingButton";
import EditCounter from "@/components/EditCounter";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
const FibReading = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);
  const [loading, setLoading] = useState(false);
  const [extraOption, setExtraOption] = useState(0);
  const [extraAnswers, setExtraAnswers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    sentence: [],
    appeared: 0,
    prediction: false,
    answers: [],
    extra_answers: [],
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
      buttonElement.className =
        "px-4 bg-orange-400 mb-3 mx-3 disabled:cursor-not-allowed";
      buttonElement.contentEditable = false;
      buttonElement.disabled = true;

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
        { index: buttonText, value: "" },
      ]);
    }
  };

  const handleTextAreaChange = (id, e) => {
    // Update the state with the text from the textarea
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.index === id ? { ...option, value: e.target.value } : option
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
      extra_answers: extraAnswers,
    }));
  }, [extraAnswers, options, text]);

  const handleExtraInputChange = (index, value) => {
    const newExtraAnswers = [...extraAnswers];
    const existingAnswer = newExtraAnswers.find(
      (answer) => answer.index === index
    );

    if (existingAnswer) {
      existingAnswer.value = value;
    } else {
      newExtraAnswers.push({ index, value });
    }

    setExtraAnswers(newExtraAnswers);
  };

  useEffect(() => {
    const getDetails = async (id) => {
      try {
        const response = await axios.get(`/reading_blank/${id}`);
        if (response?.data) {
          // Set button counter based on the last index in the answers array
          const lastAnswerIndex = response?.data?.answers.length
            ? response?.data?.answers[response?.data?.answers.length - 1].index
            : "A"; // Default to 'A' if there are no answers

          setButtonCounter(lastAnswerIndex.charCodeAt(0) + 1);
          // text format
          const formattedText = response?.data?.sentence.reduce(
            (acc, sentence, index) => {
              const answer = response?.data?.answers[index];
              return (
                acc +
                sentence +
                (answer
                  ? `<button class="px-4 bg-orange-400 mb-3 mx-3 disabled:cursor-not-allowed" contenteditable="false" disabled=""><b>${answer.index}</b></button>`
                  : "")
              );
            },
            ""
          );

          setFormData(response?.data);
          setText(formattedText);
          setOptions(response?.data?.answers);
          setExtraAnswers(response?.data?.extra_answers);
          setExtraOption(response?.data?.extra_answers.length);
        }
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    };
    getDetails(itemObj.id);
  }, [item]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `/reading_blank/${formData?.id}/update`,
        formData
      );
      toast.success("Question Edit successfully");
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

  const renderInputFields = () => {
    const inputFields = [];

    for (let i = 0; i < extraOption; i++) {
      const index = String.fromCharCode(65 + i); // Convert 0-based index to letters (A, B, C, ...)
      const inputValue =
        extraAnswers.find((answer) => answer.index === index)?.value || "";

      inputFields.push(
        <div key={index}>
          <h3 className="text-sm font-bold mb-2">{`Extra option ${index}`}</h3>
          <input
            type="text"
            placeholder="write your text"
            className="border-none py-4 dark:bg-white/20 "
            value={inputValue}
            onChange={(e) => handleExtraInputChange(index, e.target.value)}
          />
        </div>
      );
    }

    return inputFields;
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
        <div className="grid grid-cols-4 gap-2 my-5 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {options?.map((option) => (
            <div key={option.id}>
              <h3 className="text-sm font-bold mb-2">
                Correct {option?.index}
              </h3>
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleTextAreaChange(option.index, e)}
                placeholder="write your text"
                className="border-none py-4 dark:bg-white/20 "
              />
            </div>
          ))}
        </div>

        <EditCounter
          className="bg-white w-full mt-8 dark:bg-white/20 "
          title="Extra Option Number"
          value={extraOption}
          setValue={setExtraOption}
        />

        <div className="grid grid-cols-4 gap-2 my-5 mb-12 lg:grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-4">
          {renderInputFields()}
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
            {/* Create Question */}
            Update Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default FibReading;
