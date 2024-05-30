import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsFillMicFill } from "react-icons/bs";

// Dynamically import the AudioPlayer component
const AudioPlayer = dynamic(
  () => import("../../../../components/global/audio_player/AudioPlayer"),
  {
    ssr: false,
  }
);

// Dynamically import the ReactMic component
const DynamicReactMic = dynamic(
  () => import("react-mic").then((module) => module.ReactMic),
  {
    ssr: false,
  }
);

const GameRecorder = ({ audioData, setAudioData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [beepAudio, setBeepAudio] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0); // Track recording time
  let timerId;

  useEffect(() => {
    // Initialize beep audio in useEffect to ensure it's only used client-side
    setBeepAudio(new Audio("/beep.mp3"));
  }, []);

  const handleStartRecording = () => {
    setRecordingTime(0);
    beepAudio && beepAudio.play();
    setIsRecording(true);
    setAudioData(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAudioStop = (recordedBlob) => {
    setAudioData(recordedBlob.blob);
  };

  useEffect(() => {
    if (isRecording) {
      timerId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRecording]);

  // Progress bar width calculation
  const progressBarWidth = (recordingTime / 40000) * 100;

  return (
    <div className="bg-white md:bg-transparent px-6 md:px-0 relative">
      {audioData && (
        <button
          onClick={() => setAudioData(null)}
          className="py-1 px-3 text-white bg-blue font-semibold absolute top-4 right-4 rounded-[10px] z-50"
        >
          Reset
        </button>
      )}
      <div className="border border-primary rounded-[15px] md:mt-3 pt-7 md:pt-4 p-4 flex flex-col items-center justify-center relative">
        {!audioData && (
          <>
            <button
              onClick={() => {
                if (isRecording) {
                  handleStopRecording();
                } else {
                  handleStartRecording();
                }
              }}
              className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] bg-primary rounded-full flex items-center justify-center absolute md:static -top-8 left-1/2 -translate-x-1/2 md:translate-x-0"
            >
              <BsFillMicFill className="text-white text-2xl md:text-5xl" />
            </button>
            {/* //!warning */}
            <DynamicReactMic
              className="hidden"
              record={isRecording}
              onStop={handleAudioStop}
              mimeType="audio/wav"
            />
            <p className="text-base text-gray">
              Click To {isRecording ? "Stop" : "Start"}
            </p>
          </>
        )}
        {audioData && <AudioPlayer data={audioData} />}
        {isRecording && (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base text-gray">
                0:{Math.floor(recordingTime / 1000)}
              </p>
            </div>
            <div className="relative bg-secondary w-full h-2 rounded-[13px]">
              <div
                style={{
                  width: `${progressBarWidth}%`,
                }}
                className={`h-full absolute left-0 top-0 bg-primary rounded-[13px]`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRecorder;
