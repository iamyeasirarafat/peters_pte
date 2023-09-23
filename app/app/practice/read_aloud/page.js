"use client";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import TextBlock from "@/src/components/global/TextBlock";
import ReadAloudModal from "@/src/components/read-aloud/ReadAloudModal";
import RecordBlock from "@/src/components/read-aloud/RecordBlock";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
// const MainContent = dynamic(
//   () => import("@/src/components/read-aloud/MainContent"),
//   {
//     ssr: false,
//   }
// );

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const params = useSearchParams();
  const id = params.get("que_no");
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/practice/read_aloud/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Read Aloud",
    api: "/practice/read_alouds",
  };
  return (
    <div>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <PageHeader title="Read Aloud" setOpen={setOpenModal} />
      <p className="text-gray text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* recording Block */}
        <RecordBlock setResult={setResult} />
      </GlobalMainContent>
      {/* // result tab */}
      {result && <ResultSection setOpenModal={setOpenModal} result={result} />}
      {result && (
        <ReadAloudModal
          result={result}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </div>
  );
};
export default Index;
