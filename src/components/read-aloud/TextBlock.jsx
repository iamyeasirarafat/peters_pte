import Image from "next/image";

const TextBlock = ({ data }) => {
  //text to speech function
  const synth = window.speechSynthesis;

  const handleSpeak = () => {
    if (synth && data?.content) {
      const utterance = new SpeechSynthesisUtterance(data?.content);
      synth.speak(utterance);
    }
  };
  return (
    <div className="border border-primary rounded-[15px] mt-6 ml-8 mr-5 pt-3 pb-4 px-5">
      <p className="text-xl">{data?.content}</p>
      {/*  */}
      <div className="mt-[40px] flex justify-end">
        <button onClick={handleSpeak} className="w-[34px] h-[27px]">
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
