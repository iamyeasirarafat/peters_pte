"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ReactMic } from "react-mic";
import Pagination from "../global/Pagination";

const RecordBlock = ({ setResult }) => {
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
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    timerId = setTimeout(handleStopRecording, 35000);
    setAudioData(null);
    setResult(null);
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

  //progressbar width
  const progressBarWidth = (recordingTime / 35000) * 1000;

  // handle submit function
  const params = useSearchParams();
  const id = params.get("que_no");
  const HandleSubmit = async () => {
    setIsLoading(true);
    if (audioData) {
      try {
        const formData = new FormData();
        formData.append("audio", audioData, "recorded.wav"); // Append the audioData as is
        formData.append("read_aloud", id);
        const config = {
          headers: {
            "content-type": "multipart/form-data", // Use lowercase for header keys
          },
        };

        const { data } = await axios.post(
          "/practice/read_alouds/answer",
          formData,
          config
        );
        setResult(data);
        setIsLoading(false);
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
  return (
    <>
      <div className="border border-primary rounded-[15px] mt-3 ml-8 mr-5 p-4 flex flex-col items-center justify-center">
        <button
          onClick={() => {
            if (isRecording) {
              handleStopRecording();
            } else {
              handleStartRecording();
            }
          }}
          className="w-[70px]  h-[70px] bg-primary rounded-full flex items-center justify-center"
        >
          <div className="w-[28px] h-[44px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/icons/mic.svg"
                alt="grow icon"
                fill
              />
            </div>
          </div>
        </button>
        <ReactMic
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
        {isRecording && (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base text-gray">
                0:{Math.floor(recordingTime / 1000)}
              </p>
              <p className="text-base text-gray">0:35</p>
            </div>
            <div className="relative bg-secondary w-full h-2 rounded-[13px]">
              <div
                style={{
                  width: progressBarWidth,
                }}
                className={` h-full absolute left-0 top-0 bg-primary rounded-[13px]`}
              ></div>
            </div>
          </div>
        )}
      </div>
      {audioData && (
        <div className="mt-6 px-8">
          <audio controls>
            <source src={URL.createObjectURL(audioData)} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {/* Pagination */}
      <Pagination
        isLoading={isLoading}
        handleStartRecording={handleStartRecording}
        audioData={audioData}
        HandleSubmit={HandleSubmit}
      />
    </>
  );
};

export default RecordBlock;
