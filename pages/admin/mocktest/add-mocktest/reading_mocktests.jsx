import Field from "@/components/Field";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { getQuestion, optionFormatter } from "./full_mocktests";
import MockTestMultiSelector from "./MockTestMultiSelector";
function FullMocktest() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout title={`RMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <ListeningTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const ListeningTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [readAloud, setReadAloud] = useState([]);
  const [rwblanks, setRwblanks] = useState([]);
  const [readingMcqs, setReadingMcqs] = useState([]);
  const [reorderParagraphs, setReorderParagraphs] = useState([]);
  const [readingBlancks, setReadingBlancks] = useState([]);
  const [readingMcqSingles, setReadingMcqSingles] = useState([]);
  const [highlightIncorrect, setHighlightIncorrect] = useState([]);
  const [summarizes, setSummarizes] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  useEffect(() => {
    getQuestion("/practice/read_alouds", setReadAloud);
    getQuestion("/read-write/blanks", setRwblanks);
    getQuestion("/multi_choices/reading", setReadingMcqs);
    getQuestion("/reorder_paragraphs", setReorderParagraphs);
    getQuestion("/reading_blanks", setReadingBlancks);
    getQuestion("/multi_choices/reading/single-answer", setReadingMcqSingles);
    getQuestion("/highlight_incorrect_words", setHighlightIncorrect);
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/highlight_summarys", setHighlightSummarys);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = id
        ? await axios.put(`reading_mocktest/${id}`, data)
        : await axios.post("/reading_mocktest", data);
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
  const readingMcqsOptions = optionFormatter(readingMcqs);
  const reorderParagraphsOptions = optionFormatter(reorderParagraphs);
  const readingMcqSinglesOptions = optionFormatter(readingMcqSingles);
  const readWriteBlancksOptions = optionFormatter(rwblanks);
  const highlightSummarysOptions = optionFormatter(highlightSummarys);
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
      <div className="grid grid-cols-3 gap-5">
        <MockTestMultiSelector
          options={readAloud}
          control={control}
          name="read_aloud"
          placeholder="Select Read Aloud"
          label="Read Aloud"
        />
        <MockTestMultiSelector
          options={readWriteBlancksOptions}
          control={control}
          name="reading_writting_blank"
          placeholder="Select Reading & Writing: FIB"
          label="Reading & Writing: FIB"
        />
        <MockTestMultiSelector
          options={readingMcqsOptions}
          control={control}
          name="multi_choice_reading_multi_answer"
          placeholder="Select Multiple Choice (Multiple)"
          label="Multiple Choice (Multiple)"
        />
        <MockTestMultiSelector
          options={readingMcqSinglesOptions}
          control={control}
          name="multi_choice_reading_single_answer"
          placeholder="Select Multiple Choice (Single)"
          label="Multiple Choice (Single)"
        />
        <MockTestMultiSelector
          options={reorderParagraphsOptions}
          control={control}
          name="reorder_paragraph"
          placeholder="Select Re-order Paragraphs"
          label="Re-order Paragraphs"
        />
        <MockTestMultiSelector
          options={readingBlancks}
          control={control}
          name="reading_blank"
          placeholder="Select Reading: Fill in the Blanks"
          label="Reading: Fill in the Blanks"
        />
        <MockTestMultiSelector
          options={highlightIncorrect}
          control={control}
          name="highlight_incorrect_word"
          placeholder="Select Highlight Incorrect Words"
          label="Highlight Incorrect Words"
        />
        <MockTestMultiSelector
          options={summarizes}
          control={control}
          name="summarize"
          placeholder="Select Summarize Written Text"
          label="Summarize Written Text"
        />
        <MockTestMultiSelector
          options={highlightSummarysOptions}
          control={control}
          name="highlight_summary"
          placeholder="Select Highlight Correct Summary"
          label="Highlight Correct Summary"
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
