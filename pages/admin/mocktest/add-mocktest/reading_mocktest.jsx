import Layout from "@/components/Layout";
import Field from "@/components/Field";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
import { useForm } from "react-hook-form";
import { getQuestion } from "./full_mocktest";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function FullMocktest() {
  return (
    <Layout title="RMT / New Mocktest" back>
      <ReadingTestForm />
    </Layout>
  );
}

export default FullMocktest;

const ReadingTestForm = () => {
  const [spokenSummarize, setSpokenSummarize] = useState([]);
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [spokenMcq, setSpokenMcq] = useState([]);
  const [spokenMcqs, setSpokenMcqs] = useState([]);
  const [highlightSummary, setHighlightSummary] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  const [readingBlanck, setReadingBlanck] = useState([]);
  const [readingBlancks, setReadingBlancks] = useState([]);
  const [spokenMcqSingle, setSpokenMcqSingle] = useState([]);
  const [spokenMcqSingles, setSpokenMcqSingles] = useState([]);
  const [missingWord, setMissingWord] = useState([]);
  const [missingWords, setMissingWords] = useState([]);
  const [incorrectWord, setIncorrectWord] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [dictation, setDictation] = useState([]);
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
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = {
      title: data?.title,
      summarize_spoken: spokenSummarize?.map((item) => item.id),
      highlight_summary: highlightSummary?.map((item) => item.id),
      multi_choice_reading_multi_answer: spokenMcq?.map((item) => item.id),
      missing_word: missingWord?.map((item) => item.id),
      highlight_incorrect_word: incorrectWord?.map((item) => item.id),
      dictation: dictation?.map((item) => item.id),
      reading_balnk: readingBlanck?.map((item) => item.id),
      multi_choice_reading_single_answer: spokenMcqSingle?.map(
        (item) => item.id
      ),
    };
    const res = axios.post("/reading_mocktest", formData);
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
          dataArray={spokenSummarizes}
          selectedValue={spokenSummarize}
          setSelectedValue={setSpokenSummarize}
          label="Summarize Spoken Text"
        />
        <MockTestSelectMulti
          dataArray={spokenMcqs}
          selectedValue={spokenMcq}
          setSelectedValue={setSpokenMcq}
          label="Multiple Choice (Multiple)"
        />
        <MockTestSelectMulti
          dataArray={highlightSummarys}
          selectedValue={highlightSummary}
          setSelectedValue={setHighlightSummary}
          label="Highlight Correct Summary"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestSelectMulti
          dataArray={readingBlancks}
          selectedValue={readingBlanck}
          setSelectedValue={setReadingBlanck}
          label="Fill in the Blanks"
        />
        <MockTestSelectMulti
          dataArray={spokenMcqSingles}
          selectedValue={spokenMcqSingle}
          setSelectedValue={setSpokenMcqSingle}
          label="Multiple Choice (Single)"
        />
        <MockTestSelectMulti
          dataArray={missingWords}
          selectedValue={missingWord}
          setSelectedValue={setMissingWord}
          label="Select Missing Word"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestSelectMulti
          dataArray={incorrectWords}
          selectedValue={incorrectWord}
          setSelectedValue={setIncorrectWord}
          label="Highlight Incorrect Words"
        />
        <MockTestSelectMulti
          dataArray={dictations}
          selectedValue={dictation}
          setSelectedValue={setDictation}
          label="Write From Dictation"
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
