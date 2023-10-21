// "use client";
// import AudioPlayer from "@/src/components/global/audio_player/AudioPlayer";
// import { useRef } from "react";
// import { useState } from "react";

const Index = () => {
  return (
    <div className="border border-white w-full p-2">
      <h2 className="text-2xl dark:text-white text-black">app</h2>
      {/* <p>Audio Recorder</p> */}
      {/* <AudioRecorderR />
      <AudioRecorder /> */}
    </div>
  );
};

export default Index;

// const AudioRecorder = () => {
//   const [audioData, setAudioData] = useState([]);
//   const mediaRecorder = useRef(null);
//   const audioPlayer = useRef(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [isRecording, setIsRecording] = useState(false);

//   console.log("audioData", audioData);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder.current = new MediaRecorder(stream);

//       mediaRecorder.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setAudioChunks((prevChunks) => [...prevChunks, event.data]);
//         }
//       };
//       mediaRecorder.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current && isRecording) {
//       mediaRecorder.current.stop();
//       setIsRecording(false);
//     }
//   };
//   mediaRecorder.current.onstop = () => {
//     const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//     const audioUrl = URL.createObjectURL(audioBlob);
//     setAudioData(audioUrl);
//     audioPlayer.current.src = audioUrl;
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//       <audio controls ref={audioPlayer}></audio>
//     </div>
//   );
// };

// function AudioRecorderR() {
//   const [audioData, setAudioData] = useState([]);
//   const mediaRecorder = useRef(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [isRecording, setIsRecording] = useState(false);

//   console.log("audioData", audioData, "audioChunks", audioChunks);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder.current = new MediaRecorder(stream);

//       mediaRecorder.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setAudioChunks((prevChunks) => [...prevChunks, event.data]);
//         }
//       };

//       mediaRecorder.current.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         setAudioData(audioBlob);
//         // const audioData = [];
//         // const reader = new FileReader();

//         // reader.onload = (e) => {
//         //   audioData.push(e.target.result);
//         // };

//         // reader.readAsArrayBuffer(audioBlob);

//         // Now 'audioData' contains the audio data as an ArrayBuffer.
//       };

//       mediaRecorder.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current && isRecording) {
//       mediaRecorder.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//       {<AudioPlayer data={audioData} />}
//     </div>
//   );
// }
