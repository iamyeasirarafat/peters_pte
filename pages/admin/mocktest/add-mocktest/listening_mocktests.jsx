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
    <Layout title={`LMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <ReadingTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const ReadingTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [spokenSummarizes, setSpokenSummarizes] = useState([]);
  const [mcm, setMcm] = useState([]);
  const [highlightSummarys, setHighlightSummarys] = useState([]);
  const [blanks, setBlanks] = useState([]);
  const [mcmSingle, setMcmSingle] = useState([]);
  const [missingWords, setMissingWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [dictations, setDictations] = useState([]);
  const [repeatSentence, setRepeatSentence] = useState([]);
  const [retellLecture, setRetellLecture] = useState([]);
  const [shortQuestions, setShortQuestions] = useState([]);
  useEffect(() => {
    getQuestion("/spoken/summarizes", setSpokenSummarizes);
    getQuestion("/multi_choices", setMcm);
    getQuestion("/highlight_summarys", setHighlightSummarys);
    getQuestion("/blanks", setBlanks);
    getQuestion("/multi_choices/single-answer", setMcmSingle);
    getQuestion("/missing_words", setMissingWords);
    getQuestion("/highlight_incorrect_words", setIncorrectWords);
    getQuestion("/dictations", setDictations);
    getQuestion("/repeat_sentences", setRepeatSentence);
    getQuestion("/retell_sentences", setRetellLecture);
    getQuestion("/short_questions", setShortQuestions);
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
    try {
      const res = id
        ? await axios.put(`listening_mocktest/${id}`, data)
        : await axios.post("/listening_mocktest", data);
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
  const mcmOptions = optionFormatter(mcm);
  const highlightSummarysOptions = optionFormatter(highlightSummarys);
  const mcmSingleOptions = optionFormatter(mcmSingle);
  const missingWordsOptions = optionFormatter(missingWords);
  const inCorrectWordOptions = optionFormatter(incorrectWords);
  // set Default data
  useEffect(() => {
    if (id) {
      const getMocktest = async () => {
        try {
          const { data } = await axios.get(`/listening_mocktest/${id}`);
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
          options={spokenSummarizes}
          control={control}
          name="summarize_spoken"
          placeholder="Select Summarize Spoken Text"
          label="Summarize Spoken Text"
        />
        <MockTestMultiSelector
          options={mcmOptions}
          control={control}
          name="multi_choice_multi_answer"
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

        <MockTestMultiSelector
          options={blanks}
          control={control}
          name="blank"
          placeholder="Select Fill in the Blanks"
          label="Fill in the Blanks"
        />
        <MockTestMultiSelector
          options={mcmSingleOptions}
          control={control}
          name="multi_choice_single_answer"
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
        <MockTestMultiSelector
          options={repeatSentence}
          control={control}
          name="repeat_sentence"
          placeholder="Select Repeat Sentence"
          label="Repeat Sentence"
        />
        <MockTestMultiSelector
          options={retellLecture}
          control={control}
          name="retell_sentence"
          placeholder="Select Retell Lecture"
          label="Retell Lecture"
        />
        <MockTestMultiSelector
          options={shortQuestions}
          control={control}
          name="short_question"
          placeholder="Select Answer Short Question"
          label="Answer Short Question"
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
