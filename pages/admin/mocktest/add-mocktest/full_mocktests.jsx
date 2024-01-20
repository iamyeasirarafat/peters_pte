import Layout from "@/components/Layout";
// import Select from "@/components/AddStudentSelect";
import MockTestSelect from "@/components/MockTestSelect";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
import Field from "@/components/Field";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // speaking
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
  // witting
  const [summarize, setSummarize] = useState([]);
  const [summarizes, setSummarizes] = useState([]);
  const [writeEasy, setWriteEasy] = useState([]);
  const [writeEasys, setWriteEasys] = useState([]);
  // listening
  const [rwblank, setRwblank] = useState([]);
  const [rwblanks, setRwblanks] = useState([]);
  const [listeningMcq, setListeningMcq] = useState([]);
  const [listeningMcqs, setListeningMcqs] = useState([]);
  const [reorderParagraph, setReorderParagraph] = useState([]);
  const [reorderParagraphs, setReorderParagraphs] = useState([]);
  const [listeningBlanck, setListeningBlanck] = useState([]);
  const [listeningBlancks, setListeningBlancks] = useState([]);
  const [listeningMcqSingle, setListeningMcqSingle] = useState([]);
  const [listeningMcqSingles, setListeningMcqSingles] = useState([]);
  // reading
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
    // speaking
    getQuestion("/practice/read_alouds", setReadAlouds);
    getQuestion("/repeat_sentences", setRepeatSentences);
    getQuestion("/describe_images", setDescribeImages);
    getQuestion("/short_questions", setShortQuestions);
    getQuestion("/retell_sentences", setRetellSentences);
    // witting
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/write_easies", setWriteEasys);
    // Listening
    getQuestion("/read-write/blanks", setRwblanks);
    getQuestion("/multi_choices", setListeningMcqs);
    getQuestion("/reorder_paragraphs", setReorderParagraphs);
    getQuestion("/blanks", setListeningBlancks);
    getQuestion("/multi_choices/single-answer", setListeningMcqSingles);
    // reading
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
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const fullMockTestData = {
      title: data?.title,
      read_aloud: selectedRa?.map((item) => item.id),
      repeat_sentence: repeatSentence?.map((item) => item.id),
      describe_image: describeImage?.map((item) => item.id),
      retell_sentence: retellSentence?.map((item) => item.id),
      short_question: shortQuestion?.map((item) => item.id),
      //
      summarize: summarize?.map((item) => item.id),
      write_essay: writeEasy?.map((item) => item.id),
      //
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
      //
      reading_writting_blank: rwblank?.map((item) => item.id),
      multi_choice_multi_answer: listeningMcq?.map((item) => item.id),
      multi_choice_single_answer: listeningMcqSingle?.map((item) => item.id),
      reorder_paragraph: reorderParagraph?.map((item) => item.id),
      blank: listeningBlanck?.map((item) => item.id),
    };
    try {
      const res = await axios.post("/full_mocktest", fullMockTestData);
      toast.success("mocktest added successfully");
      reset();
      setIsLoading(false);
      router.back();
    } catch (error) {
      error?.response?.data?.title[0] &&
        toast.error(error?.response?.data?.title[0]);
      setIsLoading(false);
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
          dataArray={listeningMcqs}
          selectedValue={listeningMcq}
          setSelectedValue={setListeningMcq}
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
          dataArray={listeningBlancks}
          selectedValue={listeningBlanck}
          setSelectedValue={setListeningBlanck}
          label="Reading: Fill in the Blanks"
        />
        <MockTestSelectMulti
          dataArray={listeningMcqSingles}
          selectedValue={listeningMcqSingle}
          setSelectedValue={setListeningMcqSingle}
          label="Reading: Fill in the Blanks"
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
        disabled={isLoading}
        type="submit"
        className="p-4 rounded-sm bg-primary w-full  font-extrabold flex items-center justify-center gap-x-2"
      >
        {isLoading && <Spinner className="w-5 h-5" />}Create Mocktest
      </button>
    </form>
  );
};
