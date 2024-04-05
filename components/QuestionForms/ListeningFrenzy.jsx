import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import AudioVisualizer from "../AudioVisualizer";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import useTextToAudio from "../../utils/textToAudio";
const ListeningFrenzy = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [refText, setRefText] = useState("");
  const { handleSubmit, register, watch } = useForm();
  const [formDataState, setFormDataState] = useState({
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
      setFormDataState((prev) => ({
        ...prev,
        audio: file,
      }));
    } else {
      setAudioSrc(null);
      setAudioName(null);
      setFormDataState((prev) => ({
        ...prev,
        audio: null,
      }));
    }
  };
  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudioName(null);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", formDataState?.title);
    formData.append("audio", formDataState?.audio || audio);
    formData.append("word", refText);
    try {
      setLoading(true);
      const res = await axios.post("/games/listening_frenzy", formData);
      toast.success("Question created successfully");
      router?.back();
      setLoading(false);
      setAudioSrc(null);
      setAudioName(null);
      setFormDataState({
        title: "",
        audio: null,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  //!generate reference audio staff
  const [enableGenerateBtn, setEnableGenerateBtn] = useState(false);
  useEffect(() => {
    if (watch().reference_text !== "") {
      setEnableGenerateBtn(true);
    } else {
      setEnableGenerateBtn(false);
    }
  }, [watch()]);
  // generate text to audio
  const {
    getAudio,
    generatedAudio,
    generatedAudioSrc,
    audioLoading,
    audioError,
    SelectSpeedCompo,
  } = useTextToAudio();
  useEffect(() => {
    if (generatedAudio) {
      setAudio(generatedAudio);
      setAudioSrc(generatedAudioSrc);
    }
    if (audioError) {
      toast.error("Failed to fetch audio from API");
      console.error("Error fetching audio from API:", audioError);
    }
  }, [audioError, generatedAudio, generatedAudioSrc]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            onChange={({ target }) =>
              setFormDataState((prev) => ({
                ...prev,
                title: target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2 my-5">
          <label for="reference_text" className="font-bold text-sm">
            Reference Text
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="reference_text"
            type="text"
            {...register("reference_text", {
              required: "reference text is required",
            })}
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
          {/* select speaker and select speed drop down */}
          <SelectSpeedCompo />
          <button
            onClick={async (e) => {
              e.preventDefault();
              setRefText(watch().reference_text);
              await getAudio(watch().reference_text);
            }}
            disabled={!enableGenerateBtn}
            className="mr-3 flex items-center  text-white mt-4 h-10 px-6 text-sm font-bold last:mb-0 bg-yellow-600 transition-colors hover:bg-yellow-800 disabled:bg-yellow-300 dark:hover:bg-white/20"
          >
            <Icon className="-mt-0.25 mr-3 fill-white" name="bolt" />
            {audioLoading ? <LoaderIcon /> : "Generate Reference audio"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full flex items-center justify-center gap-x-3 mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          {loading && (
            <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
          )}
          Create Question
        </button>
      </form>
    </div>
  );
};

export default ListeningFrenzy;
