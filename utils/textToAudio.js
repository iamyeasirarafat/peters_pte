import axios from "axios";
import { useState } from "react";

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
  const getAudio = async (text) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/text_to_audio", {
        text: text,
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
  console.log(loading, "loading");
  return {
    getAudio,
    generatedAudio: audio,
    generatedAudioSrc: audioSrc,
    audioLoading: loading,
    audioError: error,
  };
};
export default useTextToAudio;
