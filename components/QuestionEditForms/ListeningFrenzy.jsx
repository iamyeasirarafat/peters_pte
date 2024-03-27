import axios from "axios";
import Icon from "@/components/Icon";
import { useState,useEffect } from "react";
import AudioVisualizer from "../AudioVisualizer";

import toast from "react-hot-toast";
import { useRouter } from "next/router";
const ListeningFrenzy = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);

 
  const [formData, setFormData] = useState({
    title: "",
    audio: null,
  });
 
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSrc(URL.createObjectURL(file));
      setAudioName(file?.name);
      setFormData((prev) => ({
        ...prev,
        audio: file,
      }));
    } else {
      setAudioSrc(null);
      setAudioName(null);
      setFormData((prev) => ({
        ...prev,
        audio: null,
      }));
    }
  };

  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudioName(null);
  };

  useEffect(() => {
    // Set initial form values based on itemObj
    if (itemObj) {
      setFormData({
        title:itemObj?.word,
        audio:itemObj?.audio
      })
      
      setAudioSrc(itemObj?.audio);
    }
  }, [item]);

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.audio) {
      console.log(formData)
      try {
        const newForm = new FormData();
        newForm.append("word", formData?.title);
        if (formData.audio instanceof Blob || formData.audio instanceof File) {
          newForm.append("audio", formData.audio, "recorded.wav");
        }
        const config = { headers: { "content-type": "multipart/form-data" } };

        console.log(formData);
        const response = await axios.put(`/games/listening_frenzy/${itemObj?.id}/update`, newForm, config);
        toast.success("update question successfully");
        if (response?.data) {
          router.back();
        }

      } catch (error) {
        console.error("Error create question:", error);
        toast.error("Something went wrong, try again later.");
      }
    } else {
      toast.error("You need provide data successfully!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Listening Word
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="name"
            type="text"
            value={formData.title}
            onChange={({ target }) =>
              setFormData((prev) => ({
                ...prev,
                title: target.value,
              }))
            }
          />
        </div>

        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">Sentence Voice</h4>
          {!audioName && !audioSrc ? (
            <label className=" border w-28 flex flex-col items-center px-4 py-6  cursor-pointe">
              <Icon
                className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="upload"
              />
              <span className="mt-2 text-base leading-normal">Upload</span>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex gap-5">
              <div className="border relative w-28 flex flex-col items-center  cursor-pointer">
                <div
                  onClick={handleDeleteAudio}
                  className="absolute top-0 right-0"
                >
                  <Icon
                    className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                    name="cross"
                  />
                </div>
                <Icon
                  className="icon-20 mt-5 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                  name="pause"
                />
                <span className="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                  {audioName}
                </span>
              </div>
              <div className="w-full">
                <AudioVisualizer selectedFile={audioSrc} />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          Update Questions
        </button>
      </form>
    </div>
  );
};

export default ListeningFrenzy;
