import React, { useEffect, useRef, useState } from "react";
import { VscDebugPause, VscDebugStart } from "react-icons/vsc";
import WaveSurfer from "wavesurfer.js";

function AudioVisualizer({ selectedFile }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [volume, setVolume] = useState(1); // 1 is the default value (100% volume)
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "gray",
      progressColor: "black",
      height: 70,
    });

    if (selectedFile) {
      wavesurfer.current.load(selectedFile);
    }

    wavesurfer.current.on("play", () => {
      setIsPlaying(true);
    });

    wavesurfer.current.on("pause", () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.current.destroy();
    };
  }, [selectedFile]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVolume);
    }
    setVolume(newVolume);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className=" text-[1.7rem] w-[60px] h-[50px] rounded-full bg-primary font-bold flex justify-center items-center mx-2"
          onClick={handlePlayPause}
        >
          {isPlaying ? <VscDebugPause /> : <VscDebugStart className="text-white" />}
        </button>
        <div className="w-full">
          <div ref={waveformRef} />
        </div>
        <input
          className="w-12 mx-3"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default AudioVisualizer;
