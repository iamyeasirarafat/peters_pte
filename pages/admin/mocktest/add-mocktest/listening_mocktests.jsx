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
    <Layout title="LMT / New Mocktest" back>
      <ListeningTestForm />
    </Layout>
  );
}

export default FullMocktest;

const ListeningTestForm = () => {
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
  const [summarize, setSummarize] = useState([]);
  const [summarizes, setSummarizes] = useState([]);
  const [writeEasy, setWriteEasy] = useState([]);
  const [writeEasys, setWriteEasys] = useState([]);
  const [rwblank, setRwblank] = useState([]);
  const [rwblanks, setRwblanks] = useState([]);
  const [readingMcq, setReadingMcq] = useState([]);
  const [readingMcqs, setReadingMcqs] = useState([]);
  const [readingMcqSingle, setReadingMcqSingle] = useState([]);
  const [readingMcqSingles, setReadingMcqSingles] = useState([]);
  const [reorderParagraph, setReorderParagraph] = useState([]);
  const [reorderParagraphs, setReorderParagraphs] = useState([]);
  const [readingBlank, setReadingBlank] = useState([]);
  const [readingBlanks, setReadingBlanks] = useState([]);
  const [spokenSummarize, setSpokenSummarize] = useState([]);
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [spokenMcq, setSpokenMcq] = useState([]);
  const [spokenMcqs, setSpokenMcqs] = useState([]);
  const [spokenMcqSingle, setSpokenMcqSingle] = useState([]);
  const [spokenMcqSingles, setSpokenMcqSingles] = useState([]);
  const [highlightSummary, setHighlightSummary] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  const [listeningBlanck, setListeningBlanck] = useState([]);
  const [listeningBlancks, setListeningBlancks] = useState([]);
  const [missingWord, setMissingWord] = useState([]);
  const [missingWords, setMissingWords] = useState([]);
  const [incorrectWord, setIncorrectWord] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [dictation, setDictation] = useState([]);
  const [dictations, setDictations] = useState([]);
  useEffect(() => {
    getQuestion("/practice/read_alouds", setReadAlouds);
    getQuestion("/repeat_sentences", setRepeatSentences);
    getQuestion("/describe_images", setDescribeImages);
    getQuestion("/short_questions", setShortQuestions);
    getQuestion("/retell_sentences", setRetellSentences);
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/write_easies", setWriteEasys);
    getQuestion("/read-write/blanks", setRwblanks);
    getQuestion("/multi_choices/reading", setReadingMcqs);
    getQuestion("/reorder_paragraphs", setReorderParagraphs);
    getQuestion("/reading_blanks", setReadingBlanks);
    getQuestion("/multi_choices/reading/single-answer", setReadingMcqSingles);
    getQuestion("/spoken/summarizes", setSpokenSummarizes);
    getQuestion("/multi_choices", setSpokenMcqs);
    getQuestion("/highlight_summarys", setHighlightSummarys);
    getQuestion("/blanks", setListeningBlancks);
    getQuestion("/multi_choices/single-answer", setSpokenMcqSingles);
    getQuestion("/missing_words", setMissingWords);
    getQuestion("/dictations", setDictations);
    getQuestion("/highlight_incorrect_words", setIncorrectWords);
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};
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
          dataArray={rwblanks}
          selectedValue={rwblank}
          setSelectedValue={setRwblank}
          label="Reading & Writing: FIB"
        />
        <MockTestSelectMulti
          dataArray={readingMcqs}
          selectedValue={readingMcq}
          setSelectedValue={setReadingMcq}
          label="Multiple Choice (Multiple)"
        />
        <MockTestSelectMulti
          dataArray={reorderParagraphs}
          selectedValue={reorderParagraph}
          setSelectedValue={setReorderParagraph}
          label="Re-order Paragraphs"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestSelectMulti
          dataArray={readingBlanks}
          selectedValue={readingBlank}
          setSelectedValue={setReadingBlank}
          label="Reading: Fill in the Blanks"
        />
        <MockTestSelectMulti
          dataArray={readingMcqSingles}
          selectedValue={readingMcqSingle}
          setSelectedValue={setReadingMcqSingle}
          label="Multiple Choice (Single)"
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
