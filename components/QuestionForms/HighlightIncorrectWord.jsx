import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useEffect, useRef, useState } from "react";
import AudioVisualizer from "../AudioVisualizer";
import LoadingButton from "@/components/LoadingButton";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useTextToAudio from "../../utils/textToAudio";
const HighlightIncorrectWord = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const { register, watch } = useForm();
  const [formData, setFormData] = useState({
    title: "",
    sentence: [],
    appeared: 0,
    prediction: false,
    audio: null,
    answers: [],
  });

  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const [audioSrc, setAudioSrc] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSrc(URL.createObjectURL(file));
      setAudioName(file?.name);
      setFormData((prev) => ({
        ...prev,
        audio: file,
      }));
    } else {
      setAudioSrc(null);
      setAudioName(null);
      setFormData((prev) => ({
        ...prev,
        audio: null,
      }));
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
      buttonElement.innerHTML = `<b class="indButton">${buttonText}</b>`;
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
        { index: buttonText, value: "", wrong: "" },
      ]);
    }
  };

  const handleTextAreaChange = (index, e) => {
    // Update the state with the text from the textarea
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.index === index ? { ...option, value: e.target.value } : option
      )
    );
  };
  const handelWrongAnswerChange = (index, e) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.index === index ? { ...option, wrong: e.target.value } : option
      )
    );
  };

  /////////////////// sentence and options in form data ///////////////////////
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
      answers: options,
    }));
  }, [options, text]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.audio || audio) {
      const answersJson = JSON.stringify(formData?.answers);
      try {
        setLoading(true);
        const newForm = new FormData();
        newForm.append("audio", formData.audio || audio, "recorded.wav"); // Append the audioData as is
        newForm.append("title", formData?.title);

        formData.sentence.forEach((item) => newForm.append("sentence", item));
        newForm.append("answers", answersJson);

        newForm.append("appeared", formData?.appeared);
        newForm.append("prediction", formData?.prediction);
        const config = {
          headers: {
            "content-type": "multipart/form-data", // Use lowercase for header keys
          },
        };
        const { data } = await axios.post(
          "/highlight_incorrect_word",
          newForm,
          config
        );
        toast.success("Create question successfully");
        if (data) {
          router.back();
        }
      } catch (error) {
        console.error("Error create question:", error);
        toast.error("Something went wrong, try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You need provide data successfuly!");
    }
  };
  //!generate reference audio staff
  const [enableGenerateBtn, setEnableGenerateBtn] = useState(false);
  useEffect(() => {
    if (watch().reference_text !== "") {
      setEnableGenerateBtn(true);
    } else {
      setEnableGenerateBtn(false);
    }
  }, [watch()]);
  // generate text to audio
  const {
    getAudio,
    generatedAudio,
    generatedAudioSrc,
    audioLoading,
    audioError,
    SelectSpeedCompo,
  } = useTextToAudio();
  useEffect(() => {
    if (generatedAudio) {
      setAudio(generatedAudio);
      setAudioSrc(generatedAudioSrc);
    }
    if (audioError) {
      toast.error("Failed to fetch audio from API");
      console.error("Error fetching audio from API:", audioError);
    }
  }, [audioError, generatedAudio, generatedAudioSrc]);
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
          <label for="reference_text" className="font-bold text-sm">
            Reference Text
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="reference_text"
            type="text"
            {...register("reference_text", {
              required: "reference text is required",
            })}
          />
        </div>
        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">Sentence Voice</h4>
          {!audioName && !audioSrc ? (
            <label className=" border w-28 flex flex-col items-center px-4 py-6  cursor-pointe">
              <Icon
                className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="upload"
              />
              <span className="mt-2 text-base leading-normal">Upload</span>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex gap-5">
              <div className="border relative w-28 flex flex-col items-center  cursor-pointer">
                <div
                  onClick={handleDeleteAudio}
                  className="absolute top-0 right-0"
                >
                  <Icon
                    className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                    name="cross"
                  />
                </div>
                <Icon
                  className="icon-20 mt-5 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                  name="pause"
                />
                <span className="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                  {audioName}
                </span>
              </div>
              <div className="w-full">
                <AudioVisualizer selectedFile={audioSrc} />
              </div>
            </div>
          )}
          {/* select speaker and select speed drop down */}
          <SelectSpeedCompo />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await getAudio(watch().reference_text);
            }}
            disabled={!enableGenerateBtn}
            className="mr-3 flex items-center  text-white mt-4 h-10 px-6 text-sm font-bold last:mb-0 bg-yellow-600 transition-colors hover:bg-yellow-800 disabled:bg-yellow-300 dark:hover:bg-white/20"
          >
            <Icon className="-mt-0.25 mr-3 fill-white" name="bolt" />
            {audioLoading ? <LoaderIcon /> : "Generate Reference audio"}
          </button>
        </div>

        {/* counter */}
        <div className="flex items-center h-16 p-5 bg-white my-3 border-n-1 rounded-sm dark:border-white dark:bg-white/20 ">
          <div className="mr-auto text-sm font-bold">Incorrect word Number</div>
          <div className="flex items-center shrink-0 ml-4">
            <div className="min-w-[2.5rem] text-center text-xs font-bold">
              {options?.length}
            </div>
            <div className="flex items-center gap-x-2">
              <button
                className="group"
                onClick={(e) => {
                  e.preventDefault();
                  setOptions((prevOptions) => prevOptions.slice(0, -1));
                  setButtonCounter((prev) => prev - 1);
                }}
              >
                <Icon
                  className="icon-18 transition-colors group-hover:fill-purple-2 dark:fill-white"
                  name="minus-circle"
                />
              </button>
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

        <div className="grid grid-cols-2 mb-3 gap-3">
          {options.map((option) => (
            <div className="flex items-center gap-x-3" key={option.index}>
              <div className="w-full">
                <h3 className="text-sm font-bold mb-2">
                  Correct {option?.index}
                </h3>
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => handleTextAreaChange(option.index, e)}
                  placeholder="write your text"
                  className="border-none py-4 dark:bg-white/20 w-full"
                />
              </div>
              <div className="w-full">
                <h3 className="text-sm font-bold mb-2">
                  Wrong {option?.index}
                </h3>
                <input
                  type="text"
                  value={option.wrong}
                  onChange={(e) => handelWrongAnswerChange(option.index, e)}
                  placeholder="write your text"
                  className="border-none py-4 dark:bg-white/20 w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2 dark:bg-white/20 "
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

export default HighlightIncorrectWord;
