import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import useTextToAudio from "../../utils/textToAudio";
import AudioVisualizer from "../AudioVisualizer";
const SummerizeSpoken = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);
  const [appeared, setAppeared] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audio, setAudio] = useState(null);

  const { register, handleSubmit, setValue, watch, setError, formState } = useForm();

  useEffect(() => {
    // Set initial form values based on itemObj

    if (itemObj) {
      setValue("title", itemObj.title);
      setValue("reference_text", itemObj.reference_text);
      setValue("prediction", itemObj.prediction);
      setAppeared(itemObj.appeared || 0);
      setAudio(itemObj?.audio);
      setAudioSrc(itemObj?.audio);
    }
  }, [item, setValue]);

  const onsubmit = async (data) => {
    if (audio) {
      try {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("reference_text", data?.reference_text);
        formData.append("prediction", data?.prediction);
        if (formData.audio instanceof Blob || formData.audio instanceof File) {
          newForm.append("audio", formData.audio, "recorded.wav");
        }
        formData.append("appeared", appeared);
        const config = { headers: { "content-type": "multipart/form-data" } };

        const response = await axios.put(`/spoken/summarize/${itemObj?.id}/update`, formData, config);
        toast.success("update question successfully");
        if (response?.data) {
          router.back();
        }
      } catch (error) {
        console.error("Error update question:", error);
        toast.error("Something went wrong, try again later.");
      }
    } else {
      toast.error("You need provide data successfully!");
    }
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSrc(URL.createObjectURL(file));
      setAudio(file);
    } else {
      setAudioSrc(null);
      setAudio(null);
    }
  };
  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudio(null);
  };

  //!generate reference audio staff
  const [enableGenerateBtn, setEnableGenerateBtn] = useState(false);
  useEffect(() => {
    if (watch().reference_text !== "") {
      setEnableGenerateBtn(true)
    } else {
      setEnableGenerateBtn(false)
    }
  }, [watch()])

  const { getAudio, generatedAudio, generatedAudioSrc, audioLoading, audioError
  } = useTextToAudio();
  useEffect(() => {
    if (generatedAudio) {
      setAudio(generatedAudio);
      setAudioSrc(generatedAudioSrc);
    }
    if (audioError) {
      toast.error('Failed to fetch audio from API');
      console.error('Error fetching audio from API:', audioError);
    }
  }, [audioError, generatedAudio, generatedAudioSrc])

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="title" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div className="flex flex-col gap-2 my-5">
          <label for="reference_text" className="font-bold text-sm">
            Reference Text
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm "
            id="reference_text"
            type="text"
            {...register("reference_text", {
              required: "reference text is required",
            })}
          />
        </div>
        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">Sentence Voice</h4>
          {!audio?.name && !audioSrc ? (
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
                  {audio?.name}
                </span>
              </div>
              <div className="w-full">
                <AudioVisualizer selectedFile={audioSrc} />

              </div>
            </div>
          )}
          <button
            onClick={async (e) => {
              e.preventDefault()
              await getAudio(watch().reference_text)
            }}
            disabled={!enableGenerateBtn}
            className="mr-3 flex items-center  text-white mt-4 h-10 px-6 text-sm font-bold last:mb-0 bg-yellow-600 transition-colors hover:bg-yellow-800 disabled:bg-yellow-300 dark:hover:bg-white/20">
            <Icon className="-mt-0.25 mr-3 fill-white" name="bolt" />
            {audioLoading ? <LoaderIcon /> : "Generate Reference audio"}
          </button>
        </div>


        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2"
            title="Appeared Times"
            value={appeared}
            setValue={setAppeared}
          />
          <div className="w-1/2 border bg-white flex items-center pl-4">
            <input
              id="prediction"
              type="checkbox"
              className="text-green-500 focus-visible:outline-none"
              {...register("prediction")}
            />
            <label for="prediction" className="text-sm font-bold ml-2">
              Prediction
            </label>
          </div>
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

export default SummerizeSpoken;
