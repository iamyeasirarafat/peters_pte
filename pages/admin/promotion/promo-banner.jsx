import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import { Switch as SwitchReact } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

function PromoBanner() {
  return (
    <Layout title="Promo Banner" back>
      <PromoForm />
    </Layout>
  );
}

export default PromoBanner;

const PromoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(false);
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", "Promo Banner");
      formData.append("link", data.link);
      formData.append("show_after", data.show_after);
      formData.append("active", value);
      try {
        setIsLoading(true);
        const res = await axios.put("/promo_banner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsLoading(false);
        toast.success("Promo Banner Created Successfully");
        reset();
        setImage(null);
        setImageSrc(null);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error?.response?.data?.massage || "Something went wrong");
      }
    } else {
      toast.error("Please select an image");
    }
  };
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="absolute top-5 right-4 z-50">
          <Switch value={value} setValue={setValue} />
        </div>

        <Field
          errors={errors}
          className="mb-4"
          placeholder="Promo Banner"
          register={register}
          name="title"
          isReadOnly={true}
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Promo Banner Link"
          placeholder="https://www.imagelink.com"
          required
          register={register}
          name="link"
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Shows After Visit in Seconf"
          placeholder="20"
          required
          register={register}
          name="show_after"
          type="number"
        />
        <div className="w-full flex items-center gap-x-5">
          <div>
            <h4 className="text-sm mt-3 mb-2 font-semibold">
              Promo Banner Image
            </h4>
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
                  <Image
                    className="mt-5 w-16 h-12 object-contain"
                    src={imageSrc}
                    width={500}
                    height={500}
                    alt={image?.name}
                  />
                  <span className="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                    {image?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-5">
          <button
            disabled={isLoading}
            className="w-full bg-primary py-3 px-4 flex items-center justify-center text-base font-bold gap-x-3"
          >
            {isLoading && (
              <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
            )}
            Update Banner
          </button>
        </div>
      </form>
    </div>
  );
};

const Switch = ({ className, value, setValue }) => (
  <div className={`inline-flex bg-secondary shrink-0 ${className}`}>
    <SwitchReact
      checked={value}
      onChange={setValue}
      className={`relative inline-flex items-center w-10 h-6 pl-0.75 cursor-pointer rounded-sm transition-colors outline-none  bg-secondary`}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          `pointer-events-none inline-block w-4 h-4 transition-all ${value ? "translate-x-4 bg-primary" : "translate-x-0 bg-black"
          }`
        )}
      />
    </SwitchReact>
  </div>
);
