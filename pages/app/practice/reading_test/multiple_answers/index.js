"use client";
import GlobalMainContent from "@/components/global/GlobalMainContent";
import MultipleChoiceAiModal from "@/components/global/MultipleChoiceAiModal";
import MultipleChoiceAnswer from "@/components/global/MultipleChoiceAnswer";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";
import DashboardLayout from "../../../layout";
import TextBlock from "../../../../../components/global/TextBlock";

function Page() {
  const [aiResult, setAiResult] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  // get data
  const router = useRouter();
  const id = router.query.que_no;
  const answerApi = `/multi_choice_reading/${id}/answer`;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/multi_choice/reading/" + id);
      setData(data);
    };
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    if (id) {
      getData();
      getResult();
    }
  }, [id, reFetch, answerApi]);

  //sideModal Data
  const SideModalData = {
    title: "Multiple Answers",
    api: "/multi_choices/reading",
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
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* Multiple Choice Answer */}
        <MultipleChoiceAnswer
          setReFetch={setReFetch}
          answers={data?.options}
          result={result}
          api={answerApi}
        />
      </GlobalMainContent>
      {(result?.self?.[0]?.user || result?.other?.[0]?.user) && (
        <ResultSection
          summary
          setOpenModal={setOpenScoreModal}
          setOpenScoreModal={setOpenScoreModal}
          result={result}
          setAiResult={setAiResult}
        />
      )}
      <MultipleChoiceAiModal
        result={aiResult}
        data={data}
        open={openScoreModal}
        setOpen={setOpenScoreModal}
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
