import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillMicFill } from "react-icons/bs";
import { checkMicrophonePermission } from "../../utils/checkMic";
import Pagination from "../global/Pagination";
import AudioPlayer from "../global/audio_player/AudioPlayer";
const DynamicReactMic = dynamic(
  () => import("react-mic").then((module) => module.ReactMic),
  {
    ssr: false,
  }
);

const RecordBlock = ({ beginTimer = 35, beginText = true, setReFetch, api, data, stopTimer = 35, startRecord, startCountdown = true }) => {
  // countdown function
  let targetDate = new Date().getTime() + beginTimer * 1000;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    const timeLeft = {};

    if (difference > 0 && startCountdown) {
      timeLeft.seconds = Math.floor(difference / 1000);
    }
    return timeLeft;
  }

  useEffect(() => {
    if (data?.id) {
      targetDate = new Date().getTime() + (beginTimer + 2) * 1000;
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data, startCountdown]);

  //recording function...
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const beepAudio = new Audio("/beep.mp3");
  const [recordingTime, setRecordingTime] = useState(0); // Track recording time
  let timerId;

  //Checking microphone permission
  const [micPermission, setMicPermission] = useState(false);
  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkMicrophonePermission();
      if (!permission) {
        toast.error("Please allow microphone permission");
      } else {
        setMicPermission(true);
      }
    };
    checkPermission();
  }, []);

  const handleStartRecording = () => {
    if (!micPermission) {
      toast.error("Please allow microphone permission");
      return;
    }
    setRecordingTime(0);
    // beepAudio.play();
    setIsRecording(true);
    timerId = setTimeout(handleStopRecording, stopTimer * 1000);
    setAudioData(null);
  };

  //! start recording from another component
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      handleStartRecording()
    }
  }, [startRecord]);

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

  //progressbar width
  const progressBarWidth = (recordingTime / (stopTimer * 1000)) * 100;
  // handle submit function
  const router = useRouter();
  const id = router.query.que_no;
  const HandleSubmit = async () => {
    setIsLoading(true);
    if (audioData) {
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
    } else {
      toast.error("You need to record yourself!");
      setIsLoading(false);
    }
  };

  // if change question automatically removing old record function
  useEffect(() => {
    setAudioData(null);
  }, [id]);
  return (
    <div>
      <div className="whiteGd h-[50px] block md:hidden"></div>
      <div className="border-t-2 border-primary bg-white  w-full left-0 pb-4 block md:hidden " />
      <div className="bg-white md:bg-transparent px-6 md:px-0">
        <div className=" md:mt-3 pt-7 md:pt-4 p-4 flex flex-col items-center justify-center relative">
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
              {!isRecording && !audioData && beginText && (
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
                <p className="text-base text-gray">0:{stopTimer}</p>
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
        <Pagination
          isLoading={isLoading}
          handleStartRecording={handleStartRecording}
          audioData={audioData}
          HandleSubmit={HandleSubmit}
        />
      </div>
    </div>
  );
};

export default RecordBlock;



