function getBlobDuration(blob) {
  return new Promise((resolve, reject) => {
    const audioContext = new AudioContext();
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      const arrayBuffer = fileReader.result;
      audioContext
        .decodeAudioData(arrayBuffer)
        .then((decodedData) => {
          const duration = decodedData.duration;
          resolve(duration);
        })
        .catch((error) => {
          reject(error);
        });
    };

    fileReader.readAsArrayBuffer(blob);
  });
}
export default getBlobDuration;
