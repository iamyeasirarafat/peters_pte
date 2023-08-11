import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ReactMic } from "react-mic";
import Pagination from "../global/Pagination";

const RecordBlock = () => {
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

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAudioStop = (recordedBlob) => {
    setAudioData(recordedBlob.blob);
  };

  // handle submit function
  const params = useSearchParams();
  const id = params.get("que_no");
  const HandleSubmit = async () => {
    console.log("submitting...!!");
    if (audioData) {
      try {
        const formData = new FormData();
        formData.append("audio", audioData, "recorded.wav"); // Append the audioData as is
        formData.append("id", id);
        const config = {
          headers: {
            "content-type": "multipart/form-data", // Use lowercase for header keys
          },
        };

        const response = await axios.post(
          "/practice/read_alouds/answer",
          formData,
          config
        );

        console.log("Audio sent successfully:", response);
      } catch (error) {
        console.error("Error sending audio:", error);
      }
    } else {
      toast.error("You need to record yourself!");
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
          className="w-[70px] h-[70px] bg-primary rounded-full flex items-center justify-center"
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
        <p className="text-base text-gray">Click To Start</p>
        <p className="text-sm text-accent">
          <i>Beginning in {timeLeft.seconds} Sec...</i>
        </p>
        {isRecording && (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base text-gray">0:00</p>
              <p className="text-base text-gray">0:35</p>
            </div>
            <div className="relative bg-secondary w-full h-2 rounded-[13px]">
              <div className="w-[30%] h-full absolute left-0 top-0 bg-primary rounded-[13px]"></div>
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
      <Pagination HandleSubmit={HandleSubmit} />
    </>
  );
};

export default RecordBlock;
