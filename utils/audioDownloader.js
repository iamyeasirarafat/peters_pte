const AudioDownloader = () => {
  const downloadAudio = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "recording.mp3");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          resolve();
        })
        .catch((error) => {
          console.error("Error during audio download:", error);
          reject(error);
        });
    });
  };

  return downloadAudio;
};

export default AudioDownloader;
