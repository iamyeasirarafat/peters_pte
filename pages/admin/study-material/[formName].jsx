import Layout from "@/components/Layout";
import { BiSolidCloudUpload } from "react-icons/bi";
import { RiRadioButtonFill } from "react-icons/ri";
import { CgRadioCheck } from "react-icons/cg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
function AddStudyMaterial() {
  const [fileType, setFiletype] = useState("premium");
  const router = useRouter();
  const { formName } = router.query;
  const formPage = formName?.split("-")[1];
  console.log("formName", formPage);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const fileData = new FormData();
    fileData.append("title", data?.title);
    fileData.append("category", formPage);
    fileData.append("file", data?.file[0]);
    fileData.append("premium", fileType === "premium" ? true : false);
    const res = await axios.post("study_material/add", fileData);
    if (res?.status === 201) {
      reset();
      toast.success("File uploaded successfully");
    }
  };

  return (
    <Layout title={`${formPage?.replace(/[-,._]/g, " ")} / New File`} back>
      <Toaster />
      <FileForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        setFiletype={setFiletype}
        fileType={fileType}
      />
    </Layout>
  );
}

export default AddStudyMaterial;

const FileForm = ({
  register,
  handleSubmit,
  onSubmit,
  fileType,
  setFiletype,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold">File Name</p>
        <p className="text-xs font-bold">File Id #785263891</p>
      </div>
      <input
        {...register("title", { required: "File name is required" })}
        className="bg-white dark:bg-black dark:placeholder:text-gray px-5 py-6 w-full outline-none border-0 focus:ring-0  placeholder:text-[#5F646D] rounded-1"
        placeholder="Bill On The Hill"
        type="text"
      />
      <div className="space-y-3">
        <p className="text-xs font-bold">File Upload</p>
        <label
          htmlFor="uploadFile"
          className="flex flex-col gap-y-4 items-center justify-center w-full border py-5 cursor-pointer"
        >
          <BiSolidCloudUpload className="text-xl" />
          <p className="text-xs font-bold">Upload</p>
          <input
            {...register("file", { required: "File is required" })}
            id="uploadFile"
            className="hidden"
            type="file"
            accept=".pdf"
          />
        </label>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => setFiletype("premium")}
          type="button"
          className="flex items-center gap-x-2 text-xs font-bold"
        >
          {fileType === "premium" ? (
            <RiRadioButtonFill className="text-xl text-[#98E9AB]" />
          ) : (
            <CgRadioCheck className="text-xl text-black dark:text-white" />
          )}
          Premium
        </button>
        <button
          onClick={() => setFiletype("free")}
          type="button"
          className="flex items-center gap-x-2 text-xs font-bold"
        >
          {fileType === "free" ? (
            <RiRadioButtonFill className="text-xl text-[#98E9AB]" />
          ) : (
            <CgRadioCheck className="text-xl text-black dark:text-white" />
          )}
          Free
        </button>
      </div>
      <button
        type="submit"
        className="bg-primary py-4 text-base font-semibold w-full text-center rounded-1"
      >
        Create File
      </button>
    </form>
  );
};
