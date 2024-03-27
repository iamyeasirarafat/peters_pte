import axios from "axios";
import { useState } from "react";
import Dropdown from "../components/TextToAudio/Dropdown";

const base64ToAudio = (base64String) => {
  const binaryString = atob(base64String);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  const url = URL.createObjectURL(blob);
  return { blob, url };
};

const useTextToAudio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);

  //Speeder component staff
  const audioSpeed = [
    { value: 0.5, label: "Very Slow" },
    { value: 0.9, label: "Slow" },
    { value: 1.0, label: "Normal" },
    { value: 1.1, label: "Fast" },
    { value: 1.2, label: "Very Fast" },
  ];
  const [selectedAudioSpeed, setSelectedAudioSpeed] = useState({
    value: 1.0,
    label: "Normal",
  });

  const audioSpeaker = [
    { value: 3, label: "Speaker 1" },
    { value: 1200, label: "Speaker 2" },
    { value: 6861, label: "Speaker 3" },
    { value: 3465, label: "Speaker 4" },
    { value: 5729, label: "Speaker 5" },
    { value: 2333, label: "Speaker 6" },
    { value: 4597, label: "Speaker 7" },
  ];
  const [selectedAudioSpeaker, setSelectedAudioSpeaker] = useState({
    value: 1200,
    label: "US Male",
  });
  // Main function to get audio from text
  const getAudio = async (text) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/text_to_audio", {
        text: text,
        speaker: selectedAudioSpeaker.value,
        speed: selectedAudioSpeed.value,
      });
      const { blob, url } = base64ToAudio(data?.audio);
      setAudio(blob);
      setAudioSrc(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const SelectSpeedCompo = () => {
    return (
      <div className="w-1/2 flex gap-2 my-4">
        <Dropdown
          defaultValue="Speaker"
          selectItem={selectedAudioSpeaker}
          setSelectItem={setSelectedAudioSpeaker}
          ListItem={audioSpeaker}
        />
        <Dropdown
          defaultValue="Speed"
          selectItem={selectedAudioSpeed}
          setSelectItem={setSelectedAudioSpeed}
          ListItem={audioSpeed}
        />
      </div>
    );
  };

  return {
    getAudio,
    generatedAudio: audio,
    generatedAudioSrc: audioSrc,
    audioLoading: loading,
    audioError: error,
    SelectSpeedCompo,
  };
};
export default useTextToAudio;
