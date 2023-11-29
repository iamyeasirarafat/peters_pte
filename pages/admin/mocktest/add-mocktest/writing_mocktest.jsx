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
    <Layout title="WMT / New Mocktest" back>
      <WritingTestForm />
    </Layout>
  );
}

export default FullMocktest;

const WritingTestForm = () => {
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
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const MockTestData = {
      title: data?.title,
      summarize: summarize?.map((item) => item.id),
      write_essay: writeEasy?.map((item) => item.id),
    };
    const res = axios.post("/witting_mocktest", MockTestData);
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
        type="submit"
        className="p-5 rounded-sm bg-primary text-center w-full  font-extrabold"
      >
        Create Mocktest
      </button>
    </form>
  );
};
