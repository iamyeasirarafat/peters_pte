import GlobalMainContent from "@/components/global/GlobalMainContent";
import PageHeader from "@/components/global/PageHeader";
import ResultSection from "@/components/global/ResultSection";
import SideModal from "@/components/global/SideModal";
import RecordBlock from "@/components/read-aloud/RecordBlock";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import AudioPlayer from "../../../../../components/global/audio_player/AudioPlayer";
import AnswerShortQue from "../../../../../components/read-aloud/AnswerShortQue";
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
  const answerApi = `/short_question/${id}/answer`;
  useEffect(() => {
    // get read aloud
    const getData = async () => {
      const { data } = await axios("/short_question/" + id);
      setData(data);
    };
    id && getData();

    // get Discussion data
    const getDiscussion = async () => {
      const { data } = await axios(`/short_question /${id}/discussions`);
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
    title: "Answer short question",
    api: "/short_questions",
  };

  // start recording after audio clips finished
  const [startRec, setStartRec] = useState(false);
  useEffect(() => {
    // this function will call after one second
    const timer = setTimeout(() => {
      const audioPlayer = document.getElementById("audio__player");
      if (audioPlayer) {
        audioPlayer.addEventListener("ended", () => {
          setStartRec(true);
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      {/* Side Modal */}
      <SideModal data={SideModalData} />
      {/* toast */}
      <Toaster />
      {/* Read Aloud top */}
      <PageHeader title="Answer Short Question" />
      <p className="text-gray text-xs md:text-base mt-2 text-center">
        You will hear a lecture. After listening to the lecture, in 7 seconds,
        please speak into the microphone and retell what you have just heard
        from the lecture in your own words. You will have 40 seconds to give
        your response.
      </p>
      <GlobalMainContent data={data}>
        {/* text block */}
        <div className="border border-primary p-4 rounded-[15px]">
          <AudioPlayer autoPlayAfter={2} listening data={data} apiAudio />
        </div>
        {/* recording Block */}

        {isTablet || (
          <RecordBlock
            startRecord={startRec}
            beginText={false}
            stopTimer={7}
            data={data}
            api={answerApi}
            setReFetch={setReFetch}
          />
        )}
      </GlobalMainContent>
      {/* // result tab */}

      <ResultSection
        downloadable
        answer_question
        setAiResult={setAiResult}
        result={result}
        setOpenModal={setOpenModal}
      />

      {isTablet && (
        <>
          <div className="block md:hidden h-[220px]" />
          <div className="block absolute bottom-0 w-full left-0  md:hidden">
            <RecordBlock
              startRecord={startRec}
              beginText={false}
              stopTimer={7}
              data={data}
              api={answerApi}
              setReFetch={setReFetch}
            />
          </div>
        </>
      )}
      {result && (
        <AnswerShortQue
          result={aiResult}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </DashboardLayout>
  );
};
export default Index;
