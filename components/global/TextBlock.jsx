import { useState } from "react";
import { RxSpeakerLoud } from "react-icons/rx";

const TextBlock = ({ highlight, multiple, data, readAloud = true }) => {
  const [talking, setTalking] = useState(false);
  //text to speech function
  let synth = typeof window !== "undefined" ? window?.speechSynthesis : null;
  //handle speak function
  const handleSpeak = () => {
    if (synth && (data?.content || data?.question)) {
      const utterance = new SpeechSynthesisUtterance(
        data?.content || data?.question
      );
      synth.speak(utterance);
      setTalking(true);
    }
  };

  //handle stop function
  const handleStop = () => {
    synth.pause();
    setTalking(false);
  };

  // highlight functionalities 
  const [selectedText, setSelectedText] = useState([]);
  // Function to handle highlighting
  const handleHighlight = (word, index) => {
    const wordObject = { word, index };
    if (multiple) {
      const existingIndex = selectedText.findIndex(
        (item) => item.word === word && item.index === index
      );
      if (existingIndex !== -1) {
        const updatedSelectedText = [...selectedText];
        updatedSelectedText.splice(existingIndex, 1);
        setSelectedText(updatedSelectedText);
      } else {
        setSelectedText([...selectedText, wordObject]);
      }
    } else {
      setSelectedText([wordObject]);
    }
  };
  // Get the content or question
  const text = data?.content || data?.question || '';
  // Split the text into an array of words
  const words = typeof text === 'string' ? text.split(' ') : [];

  return (
    <div className="border border-primary rounded-[15px] p-2 md:p-4">
      <p className="text-xl flex gap-x-1 flex-wrap">
        {words.map((item, index) => {
          const isHighlighted = selectedText.some(
            (selectedItem) => selectedItem.word === item && selectedItem.index === index
          );
          return (
            <span
              onClick={highlight ? () => handleHighlight(item, index) : undefined}
              className={`${isHighlighted ? 'text-primary' : ''} ${highlight ? 'cursor-pointer' : ''
                }`}
              key={index}
            >
              {item}
            </span>
          );
        })}
      </p>
      {/*  */}
      {
        readAloud && <div className="mt-[40px] flex justify-end">
          {data?.id && (
            <button
              onClick={() => {
                if (talking) {
                  handleStop();
                } else {
                  handleSpeak();
                }
              }}
            >
              <RxSpeakerLoud className="text-base md:text-xl" />
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default TextBlock;
