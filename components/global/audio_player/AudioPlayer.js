import { useEffect, useRef, useState } from "react";

// import components
import { useRouter } from "next/router";
import getBlobDuration from "../../../utils/getBlobDuration";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

// const AudioPlayer = ({ apiAudio, data }) => {
// states
const AudioPlayer = ({ data, apiAudio }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const audioRef = useRef();
  const progressBarRef = useRef();
  const playTimeoutRef = useRef();
  const countdownIntervalRef = useRef();

  useEffect(() => {
    if (data && apiAudio) {
      setCurrentTrack(data?.audio);
    } else {
      setCurrentTrack(data);
    }
  }, [data, apiAudio]);

  const onLoadedMetadata = async () => {
    if (audioRef.current) {
      const seconds = apiAudio
        ? audioRef.current.duration
        : await getBlobDuration(data);
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds;
      }
    }
  };

  useEffect(() => {
    if (currentTrack instanceof Blob && !apiAudio) {
      const audioUrl = URL.createObjectURL(currentTrack);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack, apiAudio]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
    clearTimeout(playTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    document.removeEventListener("click", handleUserInteraction);
  };

  useEffect(() => {
    const handlePlayEvent = () => {
      setAlreadyPlayed(true);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("play", handlePlayEvent);
    }

    if (audioRef.current && userInteracted) {
      playTimeoutRef.current = setTimeout(() => {
        if (alreadyPlayed) {
          return;
        } else {
          audioRef.current.play().catch((error) => {
            console.error("Autoplay failed:", error);
          });
          setIsPlaying(true);
        }
      }, 5000);

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(playTimeoutRef.current);
        clearInterval(countdownIntervalRef.current);
        if (audioRef.current) {
          audioRef.current.removeEventListener("play", handlePlayEvent);
        }
      };
    }
  }, [userInteracted, currentTrack, alreadyPlayed]);

  useEffect(() => {
    handleUserInteraction();
  }, []);

  const router = useRouter();
  useEffect(() => {
    setCountdown(5);
    setAlreadyPlayed(false);
  }, [router.query]);

  return (
    <div className="h-[150px] mb-4 w-full">
      <div className="flex flex-col  w-full gap-y-2">
        <div className="">
          {userInteracted && countdown !== 0 && (
            <p className="text-sm text-gray-500">Beginning in {countdown}</p>
          )}
        </div>
      </div>
      <div className={`audio-player ${duration || "hidden"}`}>
        <div className="inner flex flex-col justify-center w-full">
          <audio
            src={currentTrack}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              isPlaying,
              setIsPlaying,
              setAlreadyPlayed,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
