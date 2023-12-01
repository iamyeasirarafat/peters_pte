import axios from "axios";

const audioToText = () => {
  let loading = false;
  let error = false;
  const getText = async (audio) => {
    console.log("ss");
    loading = true;
    const formData = new FormData();
    formData.append("audio", audio);
    const config = { headers: { "content-type": "multipart/form-data" } };
    try {
      const response = await axios.post("/audio_to_text", formData, config);
      loading = false;
      return response.data;
    } catch (error) {
      loading = false;
      error = error;
    }
  };
  return [getText, loading, error];
};
export default audioToText;
