/* eslint-disable @next/next/no-img-element */
import EditCounter from "./EditCounter";
import LoadingButton from "@/components/LoadingButton";
import Icon from "@/components/Icon";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const RepeatSentence = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemObj = JSON.parse(item);
  const [appeared, setAppeared] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Set initial form values based on itemObj
    if (itemObj) {
      setValue("title", itemObj?.title);
      setValue("reference_text", itemObj?.reference_text);
      setValue("prediction", itemObj?.prediction);
      setAppeared(itemObj.appeared || 0);
      setImage(itemObj?.image);
      setImageSrc(itemObj?.image);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    if (image) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("reference_text", data?.reference_text);
        formData.append("prediction", data?.prediction);

        if (image instanceof File) {
          formData.append("image", image);
        }
        formData.append("appeared", appeared);
        const config = { headers: { "content-type": "multipart/form-data" } };
        const response = await axios.put(
          `/describe_image/${itemObj?.id}/update`,
          formData,
          config
        );
        toast.success("Create question successfully");
        if (response?.data) {
          router.back();
        }
      } catch (error) {
        console.error("Error create question:", error);
        toast.error("Something went wrong, try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You need provide data successfully!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setImage(file);
    } else {
      setImageSrc(null);
      setImage(null);
    }
  };
  const handleDeleteImage = () => {
    setImageSrc(null);
    setImage(null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="title" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
          />
        </div>

        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">question image</h4>
          {!image?.name && !imageSrc ? (
            <label className="border w-28 flex flex-col items-center px-4 py-6 cursor-pointer">
              <Icon
                className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="upload"
              />
              <span className="mt-2 text-base leading-normal">Upload</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="flex gap-5">
              <div className="border relative w-28 flex flex-col items-center cursor-pointer">
                <div
                  onClick={handleDeleteImage}
                  className="absolute top-0 right-0"
                >
                  <Icon
                    className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                    name="cross"
                  />
                </div>
                <img
                  src={imageSrc}
                  alt={image?.name}
                  className="mt-5 w-16 h-12 object-contain"
                />
                <span className="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                  {image?.name}
                </span>
              </div>
            </div>
          )}
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
              required: "reference_text is required",
            })}
          />
        </div>
        <div className="flex justify-between gap-6">
          <EditCounter
            className="bg-white w-1/2 dark:bg-white/20 "
            title="Appeared Times"
            value={appeared}
            setValue={setAppeared}
          />
          <div className="w-1/2 bg-white flex items-center pl-4 dark:bg-white/20 ">
            <input
              id="prediction"
              type="checkbox"
              className="text-green-500 focus-visible:outline-none"
              {...register("prediction", {
                defaultChecked: itemObj?.prediction,
              })}
            />
            <label for="prediction" className="text-sm font-bold ml-2">
              Prediction
            </label>
          </div>
        </div>
        {!loading ? (
          <button
            type="submit"
            className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
          >
            Update Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default RepeatSentence;
