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
import MockTestMultiSelector from "./MockTestMultiSelector";

function FullMocktest() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout title={`Full Mocktest / ${id ? `#${id}` : "New Mocktest"}`} back>
      <FullTestForm id={id} />
    </Layout>
  );
}
// handel question data get
export const getQuestion = async (api, setData) => {
  const { data } = await axios.get(api);
  setData(data?.results);
};
// mocktest data formate
export const optionFormatter = (options) => {
  return options?.map((item) => {
    return {
      title: item?.title,
      id: item?.id,
    };
  });
};
export default FullMocktest;
const FullTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // speaking
  const [readAlouds, setReadAlouds] = useState([]);
  const [repeatSentences, setRepeatSentences] = useState([]);
  const [describeImages, setDescribeImages] = useState([]);
  const [retellSentences, setRetellSentences] = useState([]);
  const [shortQuestions, setShortQuestions] = useState([]);
  // witting
  const [summarizes, setSummarizes] = useState([]);
  const [writeEasys, setWriteEasys] = useState([]);
  // listening
  const [rwblanks, setRwblanks] = useState([]);
  const [listeningMcqs, setListeningMcqs] = useState([]);
  const [reorderParagraphs, setReorderParagraphs] = useState([]);
  const [listeningBlancks, setListeningBlancks] = useState([]);
  const [listeningMcqSingles, setListeningMcqSingles] = useState([]);
  // reading
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [spokenMcqs, setSpokenMcqs] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  const [readingBlancks, setReadingBlancks] = useState([]);
  const [spokenMcqSingles, setSpokenMcqSingles] = useState([]);
  const [missingWords, setMissingWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
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
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const fullMockTestData = {
      title: data?.title,
      read_aloud: data?.read_aloud || [],
      repeat_sentence: data?.repeat_sentence || [],
      describe_image: data?.describe_image || [],
      retell_sentence: data?.retell_sentence || [],
      short_question: data?.short_question || [],
      //
      summarize: data?.summarize || [],
      write_essay: data?.write_essay || [],
      //
      reading_writting_blank: data?.reading_writting_blank || [],
      multi_choice_multi_answer: data?.multi_choice_multi_answer || [],
      multi_choice_single_answer: data?.multi_choice_single_answer || [],
      reorder_paragraph: data?.reorder_paragraph || [],
      blank: data?.blank || [],
      //
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
        ? await axios.put(`/full_mocktest/${id}`, fullMockTestData)
        : await axios.post("/full_mocktest", fullMockTestData);
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

  // data formate
  const listeningMcqsOptions = optionFormatter(listeningMcqs);
  const reorderParagraphsOptions = optionFormatter(reorderParagraphs);
  const listeningMcqSinglesOptions = optionFormatter(listeningMcqSingles);
  //
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
          const { data } = await axios.get(`/full_mocktest/${id}`);
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
      <hr className="my-5 border border-black" />
      <div className="grid grid-cols-3 gap-x-5">
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
      </div>
      <hr className="my-5 border border-black" />
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={rwblanks}
          control={control}
          name="reading_writting_blank"
          placeholder="Select Reading & Writing: FIB"
          label="Reading & Writing: FIB"
        />
        <MockTestMultiSelector
          options={listeningMcqsOptions}
          control={control}
          name="multi_choice_multi_answer"
          placeholder="Select Multiple Choice (Multiple)"
          label="Multiple Choice (Multiple)"
        />
        <MockTestMultiSelector
          options={reorderParagraphsOptions}
          control={control}
          name="reorder_paragraph"
          placeholder="Select Re-order Paragraphs"
          label="Re-order Paragraphs"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <MockTestMultiSelector
          options={listeningBlancks}
          control={control}
          name="blank"
          placeholder="Select Reading: Fill in the Blanks"
          label="Reading: Fill in the Blanks"
        />
        <MockTestMultiSelector
          options={listeningMcqSinglesOptions}
          control={control}
          name="multi_choice_single_answer"
          placeholder="Select Multiple Choice (Single)"
          label="Multiple Choice (Single)"
        />
      </div>
      <hr className="my-5 border border-black" />
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
