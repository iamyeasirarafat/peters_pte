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
    return (
        <Layout title="Student Package / New" back>
            <StudentPackForm />
        </Layout>
    );
};

export default AddOrgPkg;

const StudentPackForm = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [image, setImage] = useState(null);
    const router = useRouter();

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
        formState: { errors },
        control,
        reset,
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "text",
    });
    useEffect(() => {
        append({ premium_feature: "" });
    }, [append]);

    // post data
    const onSubmit = async (data) => {
        console.log("data", data);
        if (image) {
            const formData = new FormData();
            formData.append("thumbnail", image);
            formData.append("premium_practice_access", data?.premium_practice_access);
            formData.append("mocktest_access", data?.mocktest_access);
            formData.append("title", data.title);
            formData.append("validity", data.validity);
            formData.append("text", JSON.stringify(data.text));
            formData.append("cost", data.cost);
            formData.append("pre_price", data.pre_price);

            console.log("formData", formData);
            try {
                const res = await axios.post("/package/student", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("res", res);
                reset();
                toast.success("Successfully created package");
                router.push("admin/billing-plan/students_package");
            } catch (error) {
                toast.error("Error creating package");
                console.error("Error:", error);
            }
        } else {
            toast.error("Image required");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    errors={errors}
                    className="mb-5"
                    label="Package Name"
                    placeholder="7 Days Premium Access"
                    required
                    register={register}
                    name="title"
                />
                <Field
                    errors={errors}
                    className="mb-5"
                    label="Validity In Days"
                    placeholder="7"
                    required
                    type="number"
                    register={register}
                    name="validity"
                />
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
                        <label className="text-xs font-bold cursor-pointer" htmlFor="Mocktest">
                            Mocktest
                        </label>
                    </div>
                </div>
                {/* const price  */}
                <div className="flex items-center gap-x-8 mt-5">
                    <Field
                        errors={errors}
                        className="w-full"
                        label="Cost"
                        placeholder="1500 BDT"
                        required
                        register={register}
                        name="cost"
                    />
                    <Field
                        errors={errors}
                        className="w-full"
                        label="Pre Price"
                        placeholder="1500 BDT"
                        required
                        type="number"
                        register={register}
                        name="pre_price"
                    />
                </div>
                <div className="bg-white dark:bg-black p-5 w-full flex items-center justify-between mt-5">
                    <p className="text-sm font-bold">Text Line Number</p>
                    <div className="flex items-center gap-x-4">
                        <FiMinusCircle
                            onClick={() => remove(fields?.length - 1)}
                            className="text-lg text-black cursor-pointer dark:text-white"
                        />
                        <p className="text-sm font-bold">{fields?.length}</p>
                        <GoPlusCircle
                            onClick={() => append({ premium_feature: "" })}
                            className="text-lg text-black cursor-pointer dark:text-white"
                        />
                    </div>
                </div>
                <div className="w-full mt-5 space-y-5">
                    {fields?.map((item, index) => (
                        <Field
                            key={item.id}
                            errors={errors}
                            className="w-full"
                            label={`Premium Feature ${index + 1}`}
                            placeholder={`Premium Feature ${index + 1}`}
                            required
                            type="text"
                            register={register}
                            name={`text.[${index}].premium_feature`}
                        />
                    ))}
                </div>
                {/*  */}
                <div className="flex items-end gap-x-8">
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
                        <button className="w-full bg-primary py-3 px-4 flex items-center justify-center text-base font-bold">
                            Create Package
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
