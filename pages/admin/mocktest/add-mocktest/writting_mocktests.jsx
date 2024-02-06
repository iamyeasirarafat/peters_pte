import Layout from "@/components/Layout";
import Field from "@/components/Field";
import { useForm } from "react-hook-form";
import { getQuestion } from "./full_mocktests";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { useRouter } from "next/router";
import MockTestMultiSelector from "./MockTestMultiSelector";
function FullMocktest() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout title={`WMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <WritingTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const WritingTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [summarizes, setSummarizes] = useState([]);
  const [writeEasys, setWriteEasys] = useState([]);
  useEffect(() => {
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/write_easies", setWriteEasys);
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const MockTestData = {
      title: data?.title,
      summarize: data?.summarize || [],
      write_essay: data?.write_essay || [],
    };
    try {
      const res = id
        ? await axios.put(`writting_mocktest/${id}`, MockTestData)
        : await axios.post("/writting_mocktest", MockTestData);
      toast.success(`Mocktest ${id ? "update" : "added"} successfully`);
      reset();
      setIsLoading(false);
      router.back();
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.title[0] &&
        toast.error(error?.response?.data?.title[0] || "Something went wrong");
    }
  };
  // set Default data
  useEffect(() => {
    if (id) {
      const getMocktest = async () => {
        try {
          const { data } = await axios.get(`/writting_mocktest/${id}`);
          reset(data);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };
      router?.isReady && getMocktest();
    }
  }, [id, router?.isReady, reset]);
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Field
        errors={errors}
        label="Question Name"
        placeholder="Question Name"
        required
        register={register}
        name="title"
      />
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={summarizes}
          control={control}
          name="summarize"
          placeholder="Select Summarize Written Text"
          label="Summarize Written Text"
        />
        <MockTestMultiSelector
          options={writeEasys}
          control={control}
          name="write_essay"
          placeholder="Select Write Essay"
          label="Write Essay"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="p-4 rounded-sm bg-primary w-full  font-extrabold flex items-center justify-center gap-x-2"
      >
        {isLoading && <Spinner className="w-5 h-5" />}
        {id ? "Update" : "Create"} Mocktest
      </button>
    </form>
  );
};
