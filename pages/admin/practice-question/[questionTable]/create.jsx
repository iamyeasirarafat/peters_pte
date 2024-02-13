import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import ReadAloud from "@/components/QuestionForms/ReadAloud";
import RepeatSentence from "@/components/QuestionForms/RepeatSentence";
import ReTelLecture from "@/components/QuestionForms/ReTelLecture";
import DescribeImage from "@/components/QuestionForms/DescribeImage";
import EssayQuestion from "@/components/QuestionForms/EssayQuestion";
import SpeakingSpell from "@/components/QuestionForms/SpeakingSpell";
import ListeningFrenzy from "@/components/QuestionForms/ListeningFrenzy";
import SpellingBee from "@/components/QuestionForms/SpellingBee";
import MultipleChoiceListing from "@/components/QuestionForms/MultipleChoiceListing";
import SingleChoiceListing from "@/components/QuestionForms/SingleChoiceListing";
import FillTheBlanks from "@/components/QuestionForms/FillTheBlanks";
import MultipleChoiceReading from "@/components/QuestionForms/MultipleChoiceReading";
import ReOrderParagraph from "@/components/QuestionForms/ReOrderParagraph";
import ReadingFillTheBlanks from "@/components/QuestionForms/ReadingFillTheBlanks";
import FibReading from "@/components/QuestionForms/FibReading";
import SummerizeWritten from "@/components/QuestionForms/SummerizeWritten";
import HighlightSummary from "@/components/QuestionForms/HighlightSummary";
import AnswerShotQues from "@/components/QuestionForms/AnswerShotQues";
import MultipleSingleReading from "@/components/QuestionForms/MultipleSingleReading";
import SelectMissingWord from "@/components/QuestionForms/SelectMissingWord";
import Dictation from "@/components/QuestionForms/Dictation";
import SummerizeSpoken from "@/components/QuestionForms/SummerizeSpoken";
import HighlightIncorrectWord from "../../../../components/QuestionForms/HighlightIncorrectWord";
const AllForms = () => {
  const router = useRouter();
  const { questionTable } = router.query;
  console.log(questionTable);
  let content;
  if (questionTable == "read-aloud") {
    content = <ReadAloud />;
  } else if (questionTable == "repeat-sentence") {
    content = <RepeatSentence />;
  } else if (questionTable == "re-tell-lecture") {
    content = <ReTelLecture />;
  } else if (questionTable == "answer-short-question") {
    content = <AnswerShotQues />;
  } else if (questionTable == "describe-image") {
    content = <DescribeImage />;
  } else if (questionTable == "summarize-spoken-text") {
    content = <SummerizeSpoken />;
  } else if (questionTable == "write-from-dictation") {
    content = <Dictation />;
  } else if (questionTable == "summarize-written-text") {
    content = <SummerizeWritten />;
  } else if (questionTable == "write-essay") {
    content = <EssayQuestion />;
  } else if (questionTable == "speaking-spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "listening-frenzy") {
    content = <ListeningFrenzy />;
  } else if (questionTable == "spelling-bee") {
    content = <SpellingBee />;
  } else if (questionTable == "listening:-MCM") {
    content = <MultipleChoiceListing />;
  } else if (questionTable == "listening:-MCS") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "highlight-correct-summary") {
    content = <HighlightSummary />;
  } else if (questionTable == "select-missing-word") {
    content = <SelectMissingWord />;
  } else if (questionTable == "fill-in-the-blanks") {
    content = <FillTheBlanks />;
  } else if (questionTable == "highlight-incorrect-words") {
    content = <HighlightIncorrectWord />;
  } else if (questionTable == "reading:-MCM") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "reading:-MCS") {
    content = <MultipleSingleReading />;
  } else if (questionTable == "re-order-paragraphs") {
    content = <ReOrderParagraph />;
  } else if (questionTable == "reading:-fill-in-the-blanks") {
    content = <ReadingFillTheBlanks />;
  } else if (questionTable == "reading-&-writing:-FIB") {
    content = <FibReading />;
  } else {
    content = <h2>this is new question from</h2>;
  }
  return (
    <AdminLayout back={true} title={`${questionTable} / New Question`}>
      {content}
    </AdminLayout>
  );
};

export default AllForms;
