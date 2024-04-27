import Layout from "@/components/Layout";
import Field from "@/components/Field";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
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
    <Layout title={`SMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <SpeakingTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const SpeakingTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [readAlouds, setReadAlouds] = useState([]);
  const [repeatSentences, setRepeatSentences] = useState([]);
  const [describeImages, setDescribeImages] = useState([]);
  const [retellSentences, setRetellSentences] = useState([]);
  const [shortQuestions, setShortQuestions] = useState([]);
  useEffect(() => {
    getQuestion("/practice/read_alouds", setReadAlouds);
    getQuestion("/repeat_sentences", setRepeatSentences);
    getQuestion("/describe_images", setDescribeImages);
    getQuestion("/short_questions", setShortQuestions);
    getQuestion("/retell_sentences", setRetellSentences);
  }, []);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const MockTestData = {
      title: data?.title,
      read_aloud: data?.read_aloud || [],
      repeat_sentence: data?.repeat_sentence || [],
      describe_image: data?.describe_image || [],
      retell_sentence: data?.retell_sentence || [],
      short_question: data?.short_question || [],
    };
    try {
      const res = id
        ? await axios.put(`speaking_mocktest/${id}`, MockTestData)
        : await axios.post("/speaking_mocktest", MockTestData);
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
          const { data } = await axios.get(`/speaking_mocktest/${id}`);
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
          options={readAlouds}
          control={control}
          name="read_aloud"
          placeholder="Select Read Aloud"
          label="Read Aloud"
        />
        <MockTestMultiSelector
          options={repeatSentences}
          control={control}
          name="repeat_sentence"
          placeholder="Select Repeat Sentence"
          label="Repeat Sentence"
        />
        <MockTestMultiSelector
          options={describeImages}
          control={control}
          name="describe_image"
          placeholder="Select Describe Image"
          label="Describe Image"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={shortQuestions}
          control={control}
          name="short_question"
          placeholder="Select Answer Short Question"
          label="Answer Short Question"
        />
        <MockTestMultiSelector
          options={retellSentences}
          control={control}
          name="retell_sentence"
          placeholder="Select Re-Tell Lecture"
          label="Re-Tell Lecture"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="p-4 rounded-sm bg-primary w-full  font-extrabold flex items-center justify-center gap-x-2"
      >
        {isLoading && <Spinner className="w-5 h-5" />}{" "}
        {id ? "Update" : "Create"} Mocktest
      </button>
    </form>
  );
};
