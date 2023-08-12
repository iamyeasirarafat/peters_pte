"use client";
import AiPageHeader from "@/src/components/global/AiPageHeader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import GlobalModal from "../../src/component/GlobalModal";
import ResultSection from "@/src/components/global/ResultSection";
import ReadAloudModal from "@/src/components/read-aloud/ReadAloudModal";
import MainContent from "@/src/components/read-aloud/MainContent";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  console.log(result);
  const params = useSearchParams();
  const id = params.get("que_no");
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/practice/read_aloud/" + id);
      setData(data);
    };
    getData();
  }, [id]);

  return (
    <div>
      {/* Side Modal */}
      <GlobalModal />
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <AiPageHeader title="Read Aloud" setOpen={setOpenModal} />
      <p className="text-gray text-base mt-2 text-center">
        Look at the text below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to read aloud.
      </p>
      {/* read aloud box  */}
      <MainContent data={data} setResult={setResult} />
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
