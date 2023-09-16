import Image from "next/image";
import { useState } from "react";

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
    <div className="border border-primary rounded-[15px] p-5">
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
          className="w-[34px] h-[27px]"
        >
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src="/icons/speker.svg"
              alt="grow icon"
              fill
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TextBlock;
