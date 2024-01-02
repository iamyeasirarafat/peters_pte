import Layout from "@/components/Layout";
import { BiSolidCloudUpload } from "react-icons/bi";
import { RiRadioButtonFill } from "react-icons/ri";
import { CgRadioCheck } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Select from "@/components/Select";
function AddStudyMaterial() {
  const [loading, setLoading] = useState(false);
  const [studyFile, setStudyFile] = useState(null);
  const [topic, setTopic] = useState({});
  const [fileType, setFiletype] = useState("premium");
  const router = useRouter();
  const { formName } = router.query;
  const formPage = formName?.split("-")[1];
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const fileData = new FormData();
    fileData.append("title", data?.title);
    fileData.append("category", formPage);
    fileData.append("file", studyFile[0]);
    fileData.append("premium", fileType === "premium" ? true : false);
    formName === "add-study_material" &&
      fileData.append(
        "topic",
        formName === "add-study_material" ? topic?.id : ""
      );
    try {
      const res = await axios.post("study_material/add", fileData);
      if (res?.status === 201) {
        reset();
        toast.success("File uploaded successfully");
        setLoading(false);
        setStudyFile(null);
        router.push(`/admin/study-material/${formPage}`);
      }
    } catch (error) {
      toast.error(
        (error?.response?.data?.title && error?.response?.data?.title[0]) ||
          (error?.response?.data?.topic && "topic field is required") ||
          "soothing went wrong"
      );
      setLoading(false);
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
        studyFile={studyFile}
        setStudyFile={setStudyFile}
        loading={loading}
        formName={formName}
        topic={topic}
        setTopic={setTopic}
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
  studyFile,
  setStudyFile,
  loading,
  formName,
  topic,
  setTopic,
}) => {
  const [topics, setTopics] = useState({});
  useEffect(() => {
    const getTopic = async () => {
      const { data } = await axios.get("/topic");
      setTopics(data);
      setTopic(data?.results?.[0]);
    };
    getTopic();
  }, [setTopic]);
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
      {formName === "add-study_material" && (
        <Select
          label="Topic"
          className="mb-2"
          items={topics?.results}
          value={topic}
          onChange={setTopic}
        />
      )}
      <div className="space-y-3">
        <p className="text-xs font-bold">File Upload</p>
        <label
          htmlFor="uploadFile"
          className="flex flex-col gap-y-3 items-center justify-center w-full border py-5 cursor-pointer"
        >
          {studyFile && (
            <p className="text-base font-semibold text-center">
              File: {studyFile[0]?.name}
            </p>
          )}
          <BiSolidCloudUpload className="text-xl" />
          <p className="text-xs font-bold">Upload</p>
          <input
            {...register("file", { required: "File is required" })}
            onChange={(e) => setStudyFile(e.target.files)}
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
        disabled={loading}
        className="bg-primary py-4 text-base font-semibold w-full rounded-1 flex items-center justify-center gap-x-3"
      >
        {loading && (
          <div className="animate-spin w-5 h-5 rounded-full border-r-2 border-t-2 border-white" />
        )}
        Create File
      </button>
    </form>
  );
};
