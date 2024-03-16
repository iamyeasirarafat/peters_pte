import GlobalMainContent from "../../../../../components/global/GlobalMainContent";
import PageHeader from "../../../../../components/global/PageHeader";
import ResultSection from "../../../../../components/global/ResultSection";
import SideModal from "../../../../../components/global/SideModal";
import TextBlock from "../../../../../components/global/TextBlock";
import SpeakingTestModal from "../../../../../components/Speaking_test/SpeakingTestModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../layout";
import RecordBlock from "../../../../../components/Speaking_test/RecordBlock"
import RecordBlockMobile from "../../../../../components/Speaking_test/RecordBlockMobile"
import AudioPlayer from "../../../../../components/global/audio_player/AudioPlayer"
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
console.log(result)
  const router = useRouter();
  const id = router.query.que_no;
  useEffect(() => {
    // get read aloud
    const getData = async () => {
      const { data } = await axios("/practice/repeat_sentence/" + id);
      setData(data);
    };
    getData();

    // get Discussion data
    const getDiscussion = async () => {
      const { data } = await axios(`/repeat_sentence/${id}/discussions`);
    };
  }, [id]);

  //sideModal Data
  const SideModalData = {
    title: "Repeat Sentence",
    api: "/practice/repeat_sentence",
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <div className="hidden lg:block">
        <SideModal data={SideModalData} />
      </div>
      {/* toast */}
      <Toaster />
      {/* Repeat Sentence */}
      <PageHeader title="Repeat Sentence" />
      <p className="text-gray text-xs md:text-base mt-2 text-center">
      You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        {/* <TextBlock data={data} /> */}
        <div className="border border-primary rounded-[15px]">
        <AudioPlayer />
        </div>
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
      { result && (
        <SpeakingTestModal
          result={result}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </DashboardLayout>
  );
};
export default Index;