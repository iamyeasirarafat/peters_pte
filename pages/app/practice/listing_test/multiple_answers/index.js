"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import ListenBlock from "@/components/global/ListenBlock";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import MultipleChoiceAnswer from "@/components/global/MultipleChoiceAnswer";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TranscriptModal from "@/components/spoken_text/TranscriptModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";
import DashboardLayout from "../../../layout";

function Page() {
  const [givenAnswer, setGivenAnswer] = useState([]);
  const { register, handleSubmit } = useForm();
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openTranscriptModal, setOpenTranscriptModal] = useState(false);
  const [apiData, setData] = useState({});
  const [result, setResult] = useState(null);

  // get data
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/multi_choice/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Multiple Choices",
    api: "/multi_choices",
  };

  //submit data
  const onSubmit = async (data) => {
    // filtering answer data
    let ans = [];
    let given = [];
    Object.keys(data).forEach((i) => {
      if (data[i] === true) {
        given.push(i);
        ans.push(apiData?.options[i]);
      }
    });
    setGivenAnswer(given);
    console.log(given);
    //submitting data
    const result = await axios.post("/multi_choice/answer", {
      multi_choice: id,
      answers: ans,
    });
    setResult(result.data);
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      <PageHeader title="Multiple Choice, Multiple Answers" />
      <p className="text-gray text-base mt-2 text-center">
        Listen to the recording and answer the question by selecting all the
        correct responses. You will need to select more than one response.
      </p>
      <GlobalMainContent data={apiData}>
        {/* text block */}
        <ListenBlock setOpen={setOpenTranscriptModal} data={apiData} />
        {/* Multiple Choice Answer */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultipleChoiceAnswer
            register={register}
            answers={apiData?.options}
          />
          <div className="flex items-center justify-between mt-4">
            <button
              className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
              type="submit"
            >
              {result ? "Re-Submit" : "Submit"}
            </button>
            <GlobalPagination />
          </div>
        </form>
      </GlobalMainContent>
      {result && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
        />
      )}
      <MultipleChoiceAiModal
        result={result}
        myAnswer={givenAnswer}
        apiData={apiData}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
      />
      <TranscriptModal
        open={openTranscriptModal}
        setOpen={setOpenTranscriptModal}
      />
    </DashboardLayout>
  );
}

export default Page;

export const GlobalPagination = () => {
  return (
    <div className="flex items-center gap-x-2">
      <button className="w-10 h-7 md:w-[56px] md:h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
        <RxShuffle className="text-gray text-xl md:text-3xl" />
      </button>
      <div className="bg-secondary rounded-[30px] px-2 md:px-4 py-[5px] flex items-center gap-x-1 md:gap-x-2">
        <IoIosArrowBack className="text-sm md:text-lg text-gray cursor-pointer" />
        <select
          className="py-0 md:py-2  bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
          name=""
          id=""
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p className="text-sm text-gray font-medium">of</p>
        <p className="text-sm text-gray font-medium">1127</p>
        <IoIosArrowBack className="text-sm md:text-lg text-gray cursor-pointer rotate-180" />
      </div>
    </div>
  );
};
