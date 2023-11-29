import Layout from "@/components/Layout";
import Field from "@/components/Field";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
import { useForm } from "react-hook-form";
import { getQuestion } from "./full_mocktests";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function FullMocktest() {
  return (
    <Layout title="SMT / New Mocktest" back>
      <SpeakingTestForm />
    </Layout>
  );
}

export default FullMocktest;

const SpeakingTestForm = () => {
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
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const MockTestData = {
      title: data?.title,
      read_aloud: selectedRa?.map((item) => item.id),
      repeat_sentence: repeatSentence?.map((item) => item.id),
      describe_image: describeImage?.map((item) => item.id),
      retell_sentence: retellSentence?.map((item) => item.id),
      short_question: shortQuestion?.map((item) => item.id),
    };
    const res = axios.post("/speaking_mocktest", MockTestData);
    console.log(res);
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
        type="submit"
        className="p-5 rounded-sm bg-primary text-center w-full  font-extrabold"
      >
        Create Mocktest
      </button>
    </form>
  );
};
