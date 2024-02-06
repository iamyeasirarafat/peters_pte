import Layout from "@/components/Layout";
import Field from "@/components/Field";
import { useForm } from "react-hook-form";
import { getQuestion, optionFormatter } from "./full_mocktests";
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
    <Layout title={`RMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <ReadingTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const ReadingTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [spokenMcqs, setSpokenMcqs] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  const [readingBlancks, setReadingBlancks] = useState([]);
  const [spokenMcqSingles, setSpokenMcqSingles] = useState([]);
  const [missingWords, setMissingWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [dictations, setDictations] = useState([]);
  useEffect(() => {
    getQuestion("/spoken/summarizes", setSpokenSummarizes);
    getQuestion("/multi_choices/reading", setSpokenMcqs);
    getQuestion("/highlight_summarys", setHighlightSummarys);
    getQuestion("/reading_blanks", setReadingBlancks);
    getQuestion("/multi_choices/reading/single-answer", setSpokenMcqSingles);
    getQuestion("/missing_words", setMissingWords);
    getQuestion("/highlight_incorrect_words", setIncorrectWords);
    getQuestion("/dictations", setDictations);
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      title: data?.title,
      summarize_spoken: data?.summarize_spoken || [],
      highlight_summary: data?.highlight_summary || [],
      multi_choice_reading_multi_answer:
        data?.multi_choice_reading_multi_answer || [],
      missing_word: data?.missing_word || [],
      highlight_incorrect_word: data?.highlight_incorrect_word || [],
      dictation: data?.dictation || [],
      reading_balnk: data?.reading_balnk || [],
      multi_choice_reading_single_answer:
        data?.multi_choice_reading_single_answer || [],
    };
    try {
      const res = id
        ? await axios.put(`reading_mocktest/${id}`, formData)
        : await axios.post("/reading_mocktest", formData);
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
  const spokenMcqOptions = optionFormatter(spokenMcqs);
  const highlightSummarysOptions = optionFormatter(highlightSummarys);
  const spokenMcqSinglesOptions = optionFormatter(spokenMcqSingles);
  const missingWordsOptions = optionFormatter(missingWords);
  const inCorrectWordOptions = optionFormatter(incorrectWords);
  // set Default data
  useEffect(() => {
    if (id) {
      const getMocktest = async () => {
        try {
          const { data } = await axios.get(`/reading_mocktest/${id}`);
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
          options={spokenSummarizes}
          control={control}
          name="summarize_spoken"
          placeholder="Select Summarize Spoken Text"
          label="Summarize Spoken Text"
        />
        <MockTestMultiSelector
          options={spokenMcqOptions}
          control={control}
          name="multi_choice_reading_multi_answer"
          placeholder="Select Multiple Choice (Multiple)"
          label="Multiple Choice (Multiple)"
        />
        <MockTestMultiSelector
          options={highlightSummarysOptions}
          control={control}
          name="highlight_summary"
          placeholder="Select Highlight Correct Summary"
          label="Highlight Correct Summary"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={readingBlancks}
          control={control}
          name="reading_balnk"
          placeholder="Select Fill in the Blanks"
          label="Fill in the Blanks"
        />
        <MockTestMultiSelector
          options={spokenMcqSinglesOptions}
          control={control}
          name="multi_choice_reading_single_answer"
          placeholder="Select Multiple Choice (Single)"
          label="Multiple Choice (Single)"
        />
        <MockTestMultiSelector
          options={missingWordsOptions}
          control={control}
          name="missing_word"
          placeholder="Select Select Missing Word"
          label="Select Missing Word"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={inCorrectWordOptions}
          control={control}
          name="highlight_incorrect_word"
          placeholder="Select Highlight Incorrect Words"
          label="Highlight Incorrect Words"
        />
        <MockTestMultiSelector
          options={dictations}
          control={control}
          name="dictation"
          placeholder="Select Write From Dictations"
          label="Write From Dictations"
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
