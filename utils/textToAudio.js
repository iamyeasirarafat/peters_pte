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

  // Speeder component staff
  const audioSpeed = [
    { value: 0.5, label: "Very Slow" },
    { value: 0.9, label: "Slow" },
    { value: 1.0, label: "Normal" },
    { value: 1.1, label: "Fast" },
    { value: 1.2, label: "Very Fast" },
  ];
  const audioSpeaker = [
    { value: "US(male).mp3", label: "US Male" },
    { value: "US(female).mp3", label: "US Female" },
    { value: "UK.mp3", label: "UK" },
    { value: "IN.mp3", label: "Indian" },
    { value: "AU.mp3", label: "Australian" },
    { value: "CA.mp3", label: "Canadian" },
  ];
  const [selectedAudioSpeed, setSelectedAudioSpeed] = useState({
    value: 1.0,
    label: "Normal",
  });
  const [selectedAudioSpeaker, setSelectedAudioSpeaker] = useState({
    value: "US(male).mp3",
    label: "US Male",
  });
  // Main function to get audio from text
  const getAudio = async (text) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/text_to_audio",
        {
          text: text,
          speaker: selectedAudioSpeaker.value,
          speed: selectedAudioSpeed.value,
        },
        {
          timeout: 600000, // 10 minutes in milliseconds
        }
      );
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
      <div className="w-full flex gap-x-3 my-4">
        <Dropdown
          label="Audio Speaker"
          defaultValue="Speaker"
          selectItem={selectedAudioSpeaker}
          setSelectItem={setSelectedAudioSpeaker}
          ListItem={audioSpeaker}
        />
        <Dropdown
          label="Audio Speed"
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
