import Layout from "@/components/Layout";
import Field from "@/components/Field";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
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
    <Layout title={`LMT / ${id ? `#${id}` : "New Mocktest"}`} back>
      <ListeningTestForm id={id} />
    </Layout>
  );
}

export default FullMocktest;

const ListeningTestForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rwblanks, setRwblanks] = useState([]);
  const [listeningMcqs, setListeningMcqs] = useState([]);
  const [reorderParagraphs, setReorderParagraphs] = useState([]);
  const [listeningBlancks, setListeningBlancks] = useState([]);
  const [listeningMcqSingles, setListeningMcqSingles] = useState([]);
  useEffect(() => {
    getQuestion("/read-write/blanks", setRwblanks);
    getQuestion("/multi_choices", setListeningMcqs);
    getQuestion("/reorder_paragraphs", setReorderParagraphs);
    getQuestion("/blanks", setListeningBlancks);
    getQuestion("/multi_choices/single-answer", setListeningMcqSingles);
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
    const formData = {
      title: data?.title,
      reading_writting_blank: data?.reading_writting_blank || [],
      multi_choice_multi_answer: data?.multi_choice_multi_answer || [],
      multi_choice_single_answer: data?.multi_choice_single_answer || [],
      reorder_paragraph: data?.reorder_paragraph || [],
      blank: data?.blank || [],
    };
    try {
      const res = id
        ? await axios.put(`listening_mocktest/${id}`, formData)
        : await axios.post("/listening_mocktest", formData);
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
  const listeningMcqsOptions = optionFormatter(listeningMcqs);
  const reorderParagraphsOptions = optionFormatter(reorderParagraphs);
  const listeningMcqSinglesOptions = optionFormatter(listeningMcqSingles);
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
