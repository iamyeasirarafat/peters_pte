import Field from "@/components/Field";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import MockTestMultiSelector from "./MockTestMultiSelector";
import { getQuestion } from "./full_mocktests";
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
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [dictations, setDictations] = useState([]);
  const [rwblanks, setRwblanks] = useState([]);
  const [listeningBlancks, setListeningBlancks] = useState([]);

  useEffect(() => {
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/write_easies", setWriteEasys);
    getQuestion("/spoken/summarizes", setSpokenSummarizes);
    getQuestion("/dictations", setDictations);
    getQuestion("/read-write/blanks", setRwblanks);
    getQuestion("/blanks", setListeningBlancks);
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
    // const MockTestData = {
    //   title: data?.title,
    //   summarize: data?.summarize || [],
    //   write_essay: data?.write_essay || [],
    // };
    try {
      id
        ? await axios.put(`writting_mocktest/${id}`, data)
        : await axios.post("/writting_mocktest", data);
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
          console.log(data);
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
      <div className="grid grid-cols-3 gap-5">
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
        <MockTestMultiSelector
          options={spokenSummarizes}
          control={control}
          name="summarize_spoken"
          placeholder="Select Summarize Spoken Text"
          label="Summarize Spoken Text"
        />
        <MockTestMultiSelector
          options={dictations}
          control={control}
          name="dictation"
          placeholder="Select Write From Dictations"
          label="Write From Dictations"
        />
        <MockTestMultiSelector
          options={rwblanks}
          control={control}
          name="reading_writting_blank"
          placeholder="Select Reading & Writing: FIB"
          label="Reading & Writing: FIB"
        />
        <MockTestMultiSelector
          options={listeningBlancks}
          control={control}
          name="blank"
          placeholder="Select Reading: Fill in the Blanks"
          label="Reading: Fill in the Blanks"
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
