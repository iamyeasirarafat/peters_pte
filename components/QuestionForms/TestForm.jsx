import React, { useState, useRef, useEffect } from "react";

const QuestionForm = () => {
  const [text, setText] = useState("");
  const [modifiedString, setModifiedString] = useState("");

  useEffect(() => {
    setModifiedString(text.replace(/<button[^>]*>(.*?)<\/button>/g, "___"));
  }, [text]);

  const [options, setOptions] = useState([]);
  const contentEditableRef = useRef(null);
  const [buttonCounter, setButtonCounter] = useState(65);

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
      buttonElement.className = "px-4 bg-orange-500 mx-3";
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

  return (
    <>
      <div>
        <div
          ref={contentEditableRef}
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: text }}
          placeholder="Type your text here..."
        />
      </div>
      {options.map((option) => (
        <div key={option.id}>
          <textarea
            value={option.text}
            onChange={(e) => handleTextAreaChange(option.id, e)}
            placeholder={`Option ${option.id}`}
          />
        </div>
      ))}
      <button className="px-3 py-2 bg-orange-500" onClick={handleButtonClick}>
        +
      </button>
      <h2>{modifiedString}jfowjfoiwejo</h2>
    </>
  );
};

export default QuestionForm;
