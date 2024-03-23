import { useEffect, useRef, useState } from "react";

// import components
import getBlobDuration from "../../../utils/getBlobDuration";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ data }) => {
  console.log("sssYeasir", data.audio);
  // states
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (data) {
      setCurrentTrack(data);
    }
  }, [data]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const onLoadedMetadata = async () => {
    const seconds = await getBlobDuration(data);
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  useEffect(() => {
    if (currentTrack instanceof Blob) {
      const audioUrl = URL.createObjectURL(currentTrack);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack]);

  return (
    <div className="h-[150px] w-full">
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
