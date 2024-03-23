import { useEffect, useRef, useState } from "react";

// import components
import getBlobDuration from "../../../utils/getBlobDuration";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ apiAudio, data }) => {
  // states
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (data && apiAudio) {
      setCurrentTrack(data?.audio);
    } else {
      setCurrentTrack(data);
    }
  }, [data, apiAudio]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const onLoadedMetadata = async () => {
    const seconds = apiAudio
      ? audioRef.current.duration
      : await getBlobDuration(data);
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  useEffect(() => {
    if (currentTrack instanceof Blob && !apiAudio) {
      const audioUrl = URL.createObjectURL(currentTrack);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack, apiAudio]);

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
