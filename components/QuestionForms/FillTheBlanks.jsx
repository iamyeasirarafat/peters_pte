import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useEffect, useRef, useState } from "react";
import AudioVisualizer from "../AudioVisualizer";
const FillTheBlanks = () => {
  const [formData, setFormData] = useState({
    title: "",
    paragraph: "",
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

  const [audioSrc, setAudioSrc] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSrc(URL.createObjectURL(file));
      setAudioName(file?.name);
    } else {
      setAudioSrc(null);
      setAudioName(null);
    }
  };

  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudioName(null);
  };

  // handle fill the blanks
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
      buttonElement.className = "px-4 bg-orange-400 my-3 mx-3";
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      paragraph: text,
      options: options,
    }));
  }, [options, text]);
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

        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">Sentence Voice</h4>
          {!audioName && !audioSrc ? (
            <label class=" border w-28 flex flex-col items-center px-4 py-6  cursor-pointe">
              <Icon
                className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="upload"
              />
              <span class="mt-2 text-base leading-normal">Upload</span>
              <input
                type="file"
                class="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex gap-5">
              <div class="border relative w-28 flex flex-col items-center  cursor-pointer">
                <div onClick={handleDeleteAudio} class="absolute top-0 right-0">
                  <Icon
                    class="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                    name="cross"
                  />
                </div>
                <Icon
                  className="icon-20 mt-5 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                  name="pause"
                />
                <span class="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                  {audioName}
                </span>
              </div>
              <div className="w-full">
                <AudioVisualizer selectedFile={audioSrc} />
              </div>
            </div>
          )}
        </div>

        {/* counter */}
        <div className="flex items-center h-16 p-5 bg-white my-3 border-n-1 rounded-sm dark:border-white">
          <div className="mr-auto text-sm font-bold">Blanks Number</div>
          <div className="flex items-center shrink-0 ml-4">
            <div className="min-w-[2.5rem] text-center text-xs font-bold">
              {options?.length}
            </div>
            <button
              className="group"
              // onClick={(e) => {
              //   e.preventDefault();
              //   handleIncrement();
              // }}
              onClick={handleButtonClick}
            >
              <Icon
                className="icon-18 transition-colors group-hover:fill-purple-2 dark:fill-white"
                name="plus-circle"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-5">
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

        <div className="grid grid-cols-4 gap-2 my-5">
          {options.map((option) => (
            <div key={option.id}>
              <h3 className="text-sm font-bold mb-2">Correct {option?.id}</h3>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleTextAreaChange(option.id, e)}
                placeholder="write your text"
                className="border-none py-4"
              />
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

export default FillTheBlanks;
