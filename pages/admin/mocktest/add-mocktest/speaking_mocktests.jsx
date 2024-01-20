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

function FullMocktest() {
  return (
    <Layout title="SMT / New Mocktest" back>
      <SpeakingTestForm />
    </Layout>
  );
}

export default FullMocktest;

const SpeakingTestForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRa, setSelectedRa] = useState([]);
  const [readAlouds, setReadAlouds] = useState([]);
  const [repeatSentence, setRepeatSentence] = useState([]);
  const [repeatSentences, setRepeatSentences] = useState([]);
  const [describeImage, setDescribeImage] = useState([]);
  const [describeImages, setDescribeImages] = useState([]);
  const [retellSentence, setRetellSentence] = useState([]);
  const [retellSentences, setRetellSentences] = useState([]);
  const [shortQuestion, setShortQuestion] = useState([]);
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
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const MockTestData = {
      title: data?.title,
      read_aloud: selectedRa?.map((item) => item.id),
      repeat_sentence: repeatSentence?.map((item) => item.id),
      describe_image: describeImage?.map((item) => item.id),
      retell_sentence: retellSentence?.map((item) => item.id),
      short_question: shortQuestion?.map((item) => item.id),
    };
    try {
      const res = await axios.post("/speaking_mocktest", MockTestData);
      toast.success("mocktest added successfully");
      reset();
      setIsLoading(false);
      router.back();
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.title[0] &&
        toast.error(error?.response?.data?.title[0]);
    }
  };
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
        <MockTestSelectMulti
          dataArray={readAlouds}
          selectedValue={selectedRa}
          setSelectedValue={setSelectedRa}
          label="Read Aloud"
        />
        <MockTestSelectMulti
          dataArray={repeatSentences}
          selectedValue={repeatSentence}
          setSelectedValue={setRepeatSentence}
          label="Repeat Sentence"
        />
        <MockTestSelectMulti
          dataArray={describeImages}
          selectedValue={describeImage}
          setSelectedValue={setDescribeImage}
          label="Describe Image"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestSelectMulti
          dataArray={shortQuestions}
          selectedValue={shortQuestion}
          setSelectedValue={setShortQuestion}
          label="Answer Short Question"
        />
        <MockTestSelectMulti
          dataArray={retellSentences}
          selectedValue={retellSentence}
          setSelectedValue={setRetellSentence}
          label="Re-Tell Lecture"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="p-4 rounded-sm bg-primary w-full  font-extrabold flex items-center justify-center gap-x-2"
      >
        {isLoading && <Spinner className="w-5 h-5" />}Create Mocktest
      </button>
    </form>
  );
};
