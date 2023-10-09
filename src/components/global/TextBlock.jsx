import Image from "next/image";
import { useState } from "react";
import { RxSpeakerLoud } from "react-icons/rx";

const TextBlock = ({ data }) => {
  const [talking, setTalking] = useState(false);
  //text to speech function
  let synth = typeof window !== "undefined" && window?.speechSynthesis;
  //handle speak function
  const handleSpeak = () => {
    if (synth && data?.content) {
      const utterance = new SpeechSynthesisUtterance(data?.content);
      synth.speak(utterance);
      setTalking(true);
    }
  };

  //handle stop function
  const handleStop = () => {
    synth.pause();
    setTalking(false);
  };

  return (
    <div className="border border-primary rounded-[15px] p-2 md:p-4">
      <p className="text-xl">{data?.content}</p>
      {/*  */}
      <div className="mt-[40px] flex justify-end">
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
      </div>
    </div>
  );
};

export default TextBlock;
