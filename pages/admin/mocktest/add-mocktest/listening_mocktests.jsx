import Layout from "@/components/Layout";
import Field from "@/components/Field";
import MockTestSelectMulti from "@/components/MockTestSelectMulti";
import { useForm } from "react-hook-form";
import { getQuestion } from "./full_mocktests";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { useRouter } from "next/router";
function FullMocktest() {
  return (
    <Layout title="LMT / New Mocktest" back>
      <ListeningTestForm />
    </Layout>
  );
}

export default FullMocktest;

const ListeningTestForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      title: data?.title,
      reading_writting_blank: rwblank?.map((item) => item.id),
      multi_choice_multi_answer: listeningMcq?.map((item) => item.id),
      multi_choice_single_answer: listeningMcqSingle?.map((item) => item.id),
      reorder_paragraph: reorderParagraph?.map((item) => item.id),
      blank: listeningBlanck?.map((item) => item.id),
    };
    try {
      const res = await axios.post("/listening_mocktest", formData);
      toast.success("mocktest added successfully");
      reset();
      setIsLoading(false);
      router.back();
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.title[0] &&
        toast.error(error?.response?.data?.title[0] || "Something went wrong");
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
