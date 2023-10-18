"use client";
import DiscursionSection from "@/src/components/global/DiscursionSection";
import GlobalMainContent from "@/src/components/global/GlobalMainContent";
import PageHeader from "@/src/components/global/PageHeader";
import ResultSection from "@/src/components/global/ResultSection";
import SideModal from "@/src/components/global/SideModal";
import TextBlock from "@/src/components/global/TextBlock";
import ReadAloudModal from "@/src/components/read-aloud/ReadAloudModal";
import RecordBlock from "@/src/components/read-aloud/RecordBlock";
import RecordBlockMobile from "@/src/components/read-aloud/RecordBlockMobile";
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
    // get read aloud
    const getData = async () => {
      const { data } = await axios("/practice/read_aloud/" + id);
      setData(data);
    };
    getData();

    // get Discussion data
    const getDiscussion = async () => {
      const { data } = await axios(
        `https://api.codebyamirus.link/read_aloud /${id}/discussions`
      );
      console.log("discussions", data);
    };
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Read Aloud",
    api: "/practice/read_alouds",
  };
  return (
    <div>
      {/* Side Modal */}
      <div className="hidden lg:block">
        <SideModal data={SideModalData} />
      </div>
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <PageHeader title="Read Aloud" />
      <p className="text-gray text-xs md:text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <TextBlock data={data} />
        {/* recording Block */}
        <div className="hidden md:block">
          <RecordBlock setResult={setResult} />
        </div>
      </GlobalMainContent>
      {/* // result tab */}
      {!result && <ResultSection setOpenModal={setOpenModal} result={result} />}
      <div className="block md:hidden">
        <RecordBlockMobile setResult={setResult} />
      </div>
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
