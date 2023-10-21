import { useEffect, useRef, useState } from "react";

// import components
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ data }) => {
  // states
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (data?.audio) {
      setCurrentTrack(data?.audio);
    }
  }, [data]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div className="h-[180px] w-full">
      <div className={`audio-player ${duration || "hidden"}`}>
        <div className="inner flex flex-col justify-center w-full">
          <audio
            src={currentTrack}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
            // onEnded={handleNext}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
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
