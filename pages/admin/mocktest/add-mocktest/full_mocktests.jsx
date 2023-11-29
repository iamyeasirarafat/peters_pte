import Layout from "@/components/Layout";
// import Select from "@/components/AddStudentSelect";
import MockTestSelect from "@/components/MockTestSelect";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
import Field from "@/components/Field";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

function FullMocktest() {
  return (
    <Layout title="Full Mocktest / New Mocktest" back>
      <FullTestForm />
    </Layout>
  );
}
// handel question data get
export const getQuestion = async (api, setData) => {
  const { data } = await axios.get(api);
  setData(data);
};
export default FullMocktest;
const FullTestForm = () => {
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

  const onSubmit = (data) => {
    const fullMockTestData = {
      title: data?.title,
      read_aloud: selectedRa?.map((item) => item),
      repeat_sentence: repeatSentence?.map((item) => item),
      describe_image: describeImage?.map((item) => item),
      retell_sentence: retellSentence?.map((item) => item),
      short_question: shortQuestion?.map((item) => item),
      summarize: summarize?.map((item) => item),
      write_essay: writeEasy?.map((item) => item),
      summarize_spoken: spokenSummarize?.map((item) => item),
      multi_choice_reading_multi_answer: readingMcq?.map((item) => item),
      multi_choice_reading_single_answer: readingMcqSingle?.map((item) => item),
      highlight_summary: highlightSummary?.map((item) => item),
      reading_balnk: readingBlank?.map((item) => item),
      missing_word: missingWord?.map((item) => item),
      highlight_incorrect_word: incorrectWord?.map((item) => item),
      dictation: dictation?.map((item) => item),
      reading_writting_blank: rwblank?.map((item) => item),
      multi_choice_multi_answer: spokenMcq?.map((item) => item),
      multi_choice_single_answer: spokenMcqSingle?.map((item) => item),
      reorder_paragraph: reorderParagraph?.map((item) => item),
      blank: listeningBlanck?.map((item) => item),
    };

    const res = axios.post("/full_mocktest", fullMockTestData);
    console.log("post data", res);
    console.log("fullMockTestData", fullMockTestData);
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
      <hr className="my-5 border border-black" />
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestSelectMulti
          dataArray={summarizes}
          selectedValue={summarize}
          setSelectedValue={setSummarize}
          label="Summarize Written Text"
        />
        <MockTestSelectMulti
          dataArray={writeEasys}
          selectedValue={writeEasy}
          setSelectedValue={setWriteEasy}
          label="Write Essay"
        />
      </div>
      <hr className="my-5 border border-black" />
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
      <hr className="my-5 border border-black" />
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
          dataArray={listeningBlancks}
          selectedValue={listeningBlanck}
          setSelectedValue={setListeningBlanck}
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
