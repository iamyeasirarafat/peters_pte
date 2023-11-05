import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import TextBlock from "@/components/global/TextBlock";
import ReadAloudModal from "@/components/read-aloud/ReadAloudModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";
// const MainContent = dynamic(
//   () => import("@/components/read-aloud/MainContent"),
//   {
//     ssr: false,
//   }
// );

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    // get read aloud
    const getData = async () => {
      const { data } = await axios("/practice/read_aloud/" + id);
      setData(data);
    };
    getData();

    // get Discussion data
    const getDiscussion = async () => {
      const { data } = await axios(`/read_aloud /${id}/discussions`);
      
    };
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Read Aloud",
    api: "/practice/read_alouds",
  };
  return (
    <DashboardLayout>
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
          {/* <RecordBlock setResult={setResult} /> */}
        </div>
      </GlobalMainContent>
      {/* // result tab */}
      {result && <ResultSection setOpenModal={setOpenModal} result={result} />}
      <div className="block md:hidden">
        {/* <RecordBlockMobile setResult={setResult} /> */}
      </div>
      {result && (
        <ReadAloudModal
          result={result}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </DashboardLayout>
  );
};
export default Index;
