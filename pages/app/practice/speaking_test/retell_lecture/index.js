import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import ReadAloudModal from "@/components/read-aloud/ReadAloudModal";
import RecordBlock from "@/components/read-aloud/RecordBlock";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import AudioPlayer from "../../../../../components/global/audio_player/AudioPlayer";
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
  const [aiResult, setAiResult] = useState(null);
  const [refetch, setReFetch] = useState(1);
  const router = useRouter();

  const isTablet = useMediaQuery({
    query: "(max-width: 765px)",
  });
  const id = router.query.que_no;
  const answerApi = `/retell_sentence/${id}/answer`;
  useEffect(() => {
    // get read aloud
    const getData = async () => {
      const { data } = await axios("/retell_sentence/" + id);
      setData(data);
    };
    id && getData();

    // get Discussion data
    const getDiscussion = async () => {
      const { data } = await axios(`/read_aloud /${id}/discussions`);
    };
  }, [id]);

  useEffect(() => {
    const getResult = async () => {
      const { data } = await axios(answerApi);
      setResult(data);
    };
    id && getResult();
  }, [refetch, id, answerApi]);

  //sideModal Data
  const SideModalData = {
    title: "Retell Lecture",
    api: "/retell_sentences",
  };
  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <PageHeader title="Retell Lecture" />
      <p className="text-gray text-xs md:text-base mt-2 text-center">
        Listen the audio below. In 35 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 35 seconds to Retell
        lecture.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <div className="border border-primary p-4 rounded-[15px]">
          <AudioPlayer listening data={data} apiAudio />
        </div>
        {/* recording Block */}

        {isTablet || (
          <RecordBlock data={data} api={answerApi} setReFetch={setReFetch} />
        )}
      </GlobalMainContent>
      {/* // result tab */}
      {(result?.other?.[0]?.user || result?.self?.[0]?.user) && (
        <ResultSection
          repeat_sentence
          setAiResult={setAiResult}
          result={result}
          setOpenModal={setOpenModal}
        />
      )}
      {isTablet && (
        <>
          <div className="block md:hidden h-[220px]" />
          <div className="block absolute bottom-0 w-full left-0  md:hidden">
            <RecordBlock data={data} api={answerApi} setReFetch={setReFetch} />
          </div>
        </>
      )}
      {result && (
        <ReadAloudModal
          // describe_image
          repeat_sentence
          retell_lecture
          result={aiResult}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </DashboardLayout>
  );
};
export default Index;
