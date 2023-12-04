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
function FullMocktest() {
  return (
    <Layout title="WMT / New Mocktest" back>
      <WritingTestForm />
    </Layout>
  );
}

export default FullMocktest;

const WritingTestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summarize, setSummarize] = useState([]);
  const [summarizes, setSummarizes] = useState([]);
  const [writeEasy, setWriteEasy] = useState([]);
  const [writeEasys, setWriteEasys] = useState([]);
  useEffect(() => {
    getQuestion("/summarizes", setSummarizes);
    getQuestion("/write_easies", setWriteEasys);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const MockTestData = {
      title: data?.title,
      summarize: summarize?.map((item) => item.id),
      write_essay: writeEasy?.map((item) => item.id),
    };
    try {
      const res = await axios.post("/witting_mocktest", MockTestData);
      toast.success("mocktest added successfully");
      reset();
      setIsLoading(false);
    } catch (error) {
      error?.response?.data?.title[0] &&
        toast.error(error?.response?.data?.title[0]);
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
