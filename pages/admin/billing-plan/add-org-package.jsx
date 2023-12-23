import Layout from "@/components/Layout";
import Field from "@/components/Field";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";

const AddOrgPkg = () => {
  return (
    <Layout title="Organization Package / New" back>
      <AddOrgQ />
    </Layout>
  );
};
export default AddOrgPkg;

const AddOrgQ = () => {
  const [thumbnail, setThumbnail] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "validation",
  });
  useEffect(() => {
    append({ title: "", saving: "", cost: "", quantity: "" });
  }, [append]);

  // upload Package
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail[0]);

    const finalData = {
      premium_practice_access: data?.premium_practice_access,
      mocktest_access: data?.mocktest_access,
      title: data?.title,
      validity: data?.validity,
      validation: [],
      thumbnail: thumbnail[0],
    };

    try {
      const res = await axios.post("/package/organization", finalData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
        <div className="bg-white dark:bg-black p-5 w-full flex items-center justify-between">
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
        <div className="w-full bg-white dark:bg-black p-5 flex items-center gap-x-8">
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
            <p className="text-sm font-bold mb-3">Thumbnail</p>
            <label
              htmlFor="uploadThumbnail"
              className=" inline-block py-5 px-6 text-center space-y-2 border cursor-pointer"
            >
              <BiSolidCloudUpload className="text-xl inline-block" />
              <p className="text-xs font-bold">Upload</p>
              <input
                onChange={(e) => setThumbnail(e.target.files)}
                id="uploadThumbnail"
                className="hidden"
                type="file"
              />
            </label>
          </div>
          <p className="text-base font-bold">File : {thumbnail[0]?.name}</p>
        </div>
        <div className="w-full">
          <button className="w-full bg-primary py-3 px-4 flex items-center justify-center text-base font-bold">
            Create Package
          </button>
        </div>
      </div>
    </form>
  );
};
