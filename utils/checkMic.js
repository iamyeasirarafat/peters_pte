export const checkMicrophonePermission = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length === 0) {
    return false;
  }
  return true;
};
