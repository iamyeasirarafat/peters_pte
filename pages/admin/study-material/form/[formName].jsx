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
import { getFileName } from "@/utils/getFileName";
function AddStudyMaterial() {
  const [loading, setLoading] = useState(false);
  const [studyFile, setStudyFile] = useState(null);
  const [topic, setTopic] = useState({});
  const [fileType, setFiletype] = useState("premium");
  const router = useRouter();
  const { formName } = router.query;
  const formPage = formName?.split("-")[1];
  const { register, handleSubmit, reset } = useForm();
  const { id } = router.query;

  const [dataDetails, setDataDetails] = useState({});
  console.log("dataDetails", dataDetails);

  // getDetails
  useEffect(() => {
    const getDetails = async () => {
      if (id) {
        const { data } = await axios.get(`/study_material/${id}`);
        setDataDetails(data);
      }
    };
    router?.isReady && id && getDetails();
  }, [id, reset, router?.isReady]);

  // getTopics
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getTopic = async () => {
      const { data } = await axios.get("/topic");
      setTopics(data);
      setTopic(data?.results?.[0]);
    };
    formName === "add-study_material" && getTopic();
  }, [setTopic, formName]);

  // set Default value
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(dataDetails?.file);
          const pdfBlob = await response.blob();
          const fileName = getFileName(dataDetails?.file);

          setStudyFile([{ file: pdfBlob, name: fileName }]);
          reset({
            title: dataDetails?.title,
          });
          setFiletype(dataDetails?.premium ? "premium" : "free");

          if (formName === "add-study_material") {
            const foundTopic = topics?.results?.find(
              (item) => item.id === dataDetails?.topic
            );
            setTopic(foundTopic || {});
          }
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      };

      fetchData();
    }
  }, [dataDetails, id, reset, formName, topics]);

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);
    const fileData = new FormData();
    fileData.append("title", data?.title);
    fileData.append("category", formPage);
    studyFile &&
      studyFile.length > 0 &&
      !id &&
      fileData.append("file", studyFile[0]);
    fileData.append("premium", fileType === "premium" ? true : false);
    formName === "add-study_material" &&
      fileData.append(
        "topic",
        formName === "add-study_material" ? topic?.id : ""
      );
    try {
      const res = id
        ? await axios.put(`/study_material/${id}/update`, fileData)
        : await axios.post("study_material/add", fileData);
      reset();
      toast.success(`${res?.data?.title} has been ${id ? "updated" : "added"}`);
      setLoading(false);
      setStudyFile(null);
      router.push(`/admin/study-material/${formPage}`);
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
    <Layout
      title={`${formPage?.replace(/[-,._]/g, " ")} / ${
        id ? `#${id}` : " New File"
      }`}
      back
    >
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
        topics={topics}
        topic={topic}
        setTopic={setTopic}
        id={id}
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
  topics,
  topic,
  setTopic,
  id,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold">File Name</p>
        {id && <p className="text-xs font-bold">File Id #{id}</p>}
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
          items={topics}
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
              File: {studyFile?.[0]?.name}
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
        {id ? "Update" : "Create"} File
      </button>
    </form>
  );
};
