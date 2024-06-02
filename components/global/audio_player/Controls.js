import { useCallback, useEffect, useRef, useState } from "react";

// icons
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from "react-icons/io";

const Controls = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  progressBarRef,
  duration,
  setTimeProgress,
  setAlreadyPlayed,
  setAutoPlayTriggered,
}) => {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setAlreadyPlayed(true);
  };

  const playAnimationRef = useRef();
  const repeat = useCallback(() => {
    const currentTime = audioRef?.current?.currentTime;
    setTimeProgress(currentTime);
    if (progressBarRef.current) {
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper self-center mb-4 w-44 ">
      <div className="controls flex justify-center mt-4">
        <button
          className="bg-primary rounded-full w-14 text-white h-14 flex items-center justify-center"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <IoPauseSharp className="text-4xl" />
          ) : (
            <IoPlaySharp className=" text-4xl" />
          )}
        </button>
      </div>
      <p className="uppercase text-lg">
        Click To {isPlaying ? "Stop" : "Listen"}
      </p>
      <div className="volume flex items-center gap-2 ">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff className="text-primary" />
          ) : volume < 40 ? (
            <IoMdVolumeLow className="text-primary" />
          ) : (
            <IoMdVolumeHigh className="text-primary" />
          )}
        </button>
        <input
          className="volume_range"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
