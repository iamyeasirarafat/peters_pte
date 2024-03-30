import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";

const AddOrgPkg = () => {
  const [packData, setPackData] = useState(null);
  const router = useRouter();
  const { id } = router?.query || {};
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/package/organization/${id}/details`);
      setPackData(res?.data);
    };
    router?.isReady && id && getData();
  }, [id, router?.isReady]);
  return (
    <Layout title={`Organization Package / ${id ? `#${id}` : "New"}`} back>
      <AddOrgQ packData={packData} />
    </Layout>
  );
};
export default AddOrgPkg;

const AddOrgQ = ({ packData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const packId = packData?.id || "";
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "validation",
  });
  useEffect(() => {
    append({ title: "", saving: "", cost: 0, quantity: "" });
  }, [append]);

  // upload Package
  const onSubmit = async (data) => {
    if (image || packId) {
      const formData = new FormData();
      image && formData.append("thumbnail", image);
      formData.append("premium_practice_access", data?.premium_practice_access);
      formData.append("mocktest_access", data?.mocktest_access);
      formData.append("title", data.title);
      formData.append("validity", data.validity);
      formData.append("validation", JSON.stringify(data.validation));

      try {
        setIsLoading(true);
        if (packData === null) {
          const res = await axios.post("/package/organization", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Successfully created package");
          setIsLoading(false);
        }
        if (packData) {
          const res = await axios.put(
            `/package/organization/${packId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Successfully update package");
          setIsLoading(false);
        }
        reset();
        router.push("/admin/billing-plan/organization_package");
      } catch (error) {
        toast.error("Error creating package");
        console.error("Error:", error);
        setIsLoading(false);
      }
    } else {
      toast.error("Image required");
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
  // Set default Data
  useEffect(() => {
    if (packData) {
      setValue("title", packData?.title);
      setValue("validity", packData?.validity);
      setValue("premium_practice_access", packData?.premium_practice_access);
      setValue("mocktest_access", packData?.mocktest_access);
      reset({ validation: packData?.validation });
      setImageSrc(packData?.thumbnail);
    }
  }, [setValue, packData, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        errors={errors}
        className="mb-4"
        label="Package Name"
        placeholder="7 Days Premium Access"
        required
        register={register}
        name="title"
      />
      <Field
        errors={errors}
        className="mb-4"
        label="Validity In Days"
        placeholder="7"
        required
        type="number"
        register={register}
        name="validity"
      />
      {/* Variation */}
      <div className="flex items-center justify-between gap-x-5">
        <div className="bg-white dark:bg-white/20 p-5 w-full flex items-center justify-between">
          <p className="text-sm font-bold">Variation Number</p>
          <div className="flex items-center gap-x-4">
            <FiMinusCircle
              onClick={() => remove(fields?.length - 1)}
              className="text-lg text-black cursor-pointer dark:text-white"
            />
            <p className="text-sm font-bold">{fields?.length}</p>
            <GoPlusCircle
              onClick={() =>
                append({ title: "", saving: "", cost: "", quantity: "" })
              }
              className="text-lg text-black cursor-pointer dark:text-white"
            />
          </div>
        </div>
        {/* Access */}
        <div className="w-full bg-white dark:bg-white/20 p-5 flex items-center gap-x-8">
          <p className="text-sm font-bold">Access</p>
          {/*  Premium Practice */}
          <div className="space-x-2">
            <input
              {...register("premium_practice_access")}
              type="checkbox"
              id="PremiumPractice"
              className="border-2 border-green-500 text-green-500 ring-transparent focus:ring-transparent w-5 h-5 cursor-pointer"
            />
            <label
              className="text-xs font-bold cursor-pointer"
              htmlFor="PremiumPractice"
            >
              Premium Practice
            </label>
          </div>
          {/* Mocktest */}
          <div className="space-x-2">
            <input
              {...register("mocktest_access")}
              type="checkbox"
              id="Mocktest"
              className="border-2 border-green-500 text-green-500 ring-transparent focus:ring-transparent w-5 h-5 cursor-pointer"
            />
            <label
              className="text-xs font-bold cursor-pointer"
              htmlFor="Mocktest"
            >
              Mocktest
            </label>
          </div>
        </div>
      </div>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center gap-x-8 mt-4">
          <Field
            errors={errors}
            className="w-full"
            label={`Variation ${index + 1} Name`}
            placeholder="7 Bluk Account"
            required
            register={register}
            name={`validation[${index}].title`}
          />
          <Field
            errors={errors}
            className="w-full"
            label="Savings"
            placeholder="You Saved 250 TK"
            required
            type="number"
            register={register}
            name={`validation[${index}].saving`}
          />
          <Field
            errors={errors}
            className="w-full"
            label="Cost"
            placeholder="3750 BDT"
            required
            type="number"
            register={register}
            name={`validation[${index}].cost`}
          />
          <Field
            errors={errors}
            className="w-full"
            label="Quantity"
            placeholder="7"
            required
            type="number"
            register={register}
            name={`validation[${index}].quantity`}
          />
        </div>
      ))}

      <div className="mt-4 flex items-end gap-x-8">
        <div className="w-full flex items-center gap-x-5">
          <div>
            <h4 className="text-sm mt-5 mb-2 font-semibold">Thumbnail</h4>
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
        <div className="w-full">
          <button className="w-full bg-primary py-3 px-4 flex items-center justify-center text-base font-bold gap-x-3">
            {isLoading && (
              <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
            )}{" "}
            {packData ? "Update" : "Create"} Package
          </button>
        </div>
      </div>
    </form>
  );
};
