import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillMicFill } from "react-icons/bs";
import AudioPlayer from "../global/audio_player/AudioPlayer";
const DynamicReactMic = dynamic(
  () => import("react-mic").then((module) => module.ReactMic),
  {
    ssr: false,
  }
);

const RecordBlock = ({ setReFetch, api, data }) => {
  // countdown function
  const targetDate = new Date().getTime() + 35000;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    const timeLeft = {};

    if (difference > 0) {
      timeLeft.seconds = Math.floor(difference / 1000);
    }
    return timeLeft;
  }

  useEffect(() => {
    if (data?.id) {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  //recording function...
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const beepAudio = new Audio("/beep.mp3");
  const [recordingTime, setRecordingTime] = useState(0); // Track recording time
  let timerId;

  const handleStartRecording = () => {
    setRecordingTime(0);
    beepAudio.play();
    setIsRecording(true);
    timerId = setTimeout(handleStopRecording, 40000);
    setAudioData(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAudioStop = (recordedBlob) => {
    setAudioData(recordedBlob.blob);
  };

  // automatically start record after 35 second
  useEffect(() => {
    if (timeLeft?.seconds === 0 && !isRecording && !audioData) {
      handleStartRecording();
    }
  }, [timeLeft?.seconds, audioData, isLoading]);

  // automatically stop recording after 35 seconds
  useEffect(() => {
    if (isRecording) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timerId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1000); // Increment recording time every second
      }, 1000);
    } else {
      clearInterval(timerId); // Clear the timer if recording stops
    }

    return () => clearInterval(timerId); // Cleanup the timer on component unmount
  }, [isRecording]);
  console.log(audioData)
  //progressbar width
  const progressBarWidth = (recordingTime / 40000) * 100;
  // handle submit function
  const router = useRouter();
  const id = router.query.que_no;
  const HandleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioData, "recorded.wav"); // Append the audioData as is
      // formData.append("read_aloud", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data", // Use lowercase for header keys
        },
      };

      const { data } = await axios.post(api, formData, config);
      data && setReFetch((prev) => !prev);
      setIsLoading(false);
      setAudioData(null);
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Something went wrong, try again later.");
      setIsLoading(false);
    }
  };

  const summitButton = useRef(null);
  useEffect(() => {
    const layout_button = document.getElementById("submit_button");
    layout_button.addEventListener("click", () => {
      summitButton?.current?.click();
    });
  }, []);

  // if change question automatically removing old record function
  // useEffect(() => {
  //   setAudioData(null);
  // }, [id]);
  return (
    <div>
      <div className="whiteGd h-[50px] block md:hidden"></div>
      <div className="border-t-2 border-primary bg-white  w-full left-0 pb-4 block md:hidden " />
      <div className="bg-white md:bg-transparent px-6 md:px-0">
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
              {!isRecording && !audioData && (
                <p className="text-sm text-accent">
                  <i>Beginning in {timeLeft.seconds} Sec...</i>
                </p>
              )}
            </>
          )}
          {audioData && <AudioPlayer data={audioData} />}
          {isRecording && (
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <p className="text-base text-gray">
                  0:{Math.floor(recordingTime / 1000)}
                </p>
                <p className="text-base text-gray">0:40</p>
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
        {/* Pagination */}
        {/* <Pagination
          isLoading={isLoading}
          handleStartRecording={handleStartRecording}
          audioData={audioData}
          HandleSubmit={HandleSubmit}
        /> */}
        <button
          ref={summitButton}
          onClick={HandleSubmit} className="hidden"></button>
      </div>
    </div>
  );
};

export default RecordBlock;
