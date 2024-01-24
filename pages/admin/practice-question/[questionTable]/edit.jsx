import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import ReadAloud from "@/components/QuestionEditForms/ReadAloud";
import RepeatSentence from "@/components/QuestionEditForms/RepeatSentence";
import ReTelLecture from "@/components/QuestionEditForms/ReTelLecture";
import DescribeImage from "@/components/QuestionEditForms/DescribeImage";
import EssayQuestion from "@/components/QuestionEditForms/EssayQuestion";
import SpeakingSpell from "@/components/QuestionEditForms/SpeakingSpell";
import ListeningFrenzy from "@/components/QuestionEditForms/ListeningFrenzy";
import SpellingBee from "@/components/QuestionEditForms/SpellingBee";
import MultipleChoiceListing from "@/components/QuestionEditForms/MultipleChoiceListing";
import SingleChoiceListing from "@/components/QuestionEditForms/SingleChoiceListing";
import FillTheBlanks from "@/components/QuestionEditForms/FillTheBlanks";
import MultipleChoiceReading from "@/components/QuestionEditForms/MultipleChoiceReading";
import ReOrderParagraph from "@/components/QuestionEditForms/ReOrderParagraph";
import ReadingFillTheBlanks from "@/components/QuestionEditForms/ReadingFillTheBlanks";
import FibReading from "@/components/QuestionEditForms/FibReading";
import SummerizeWritten from "@/components/QuestionEditForms/SummerizeWritten";
import HighlightSummary from "@/components/QuestionEditForms/HighlightSummary";
import AnswerShotQues from "@/components/QuestionEditForms/AnswerShotQues";
import MultipleSingleReading from "@/components/QuestionEditForms/MultipleSingleReading";
import SelectMissingWord from "@/components/QuestionEditForms/SelectMissingWord";
import Dictation from "@/components/QuestionEditForms/Dictation";
const EditForms = () => {
  const router = useRouter();
  const { questionTable, item } = router.query;
  const itemObj = item ? JSON.parse(item) : null;
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
    content = <ReTelLecture />;
  } else if (questionTable == "write-from-dictation") {
    content = <Dictation />;
  } else if (questionTable == "summarize-written-text") {
    content = <SummerizeWritten />;
  } else if (questionTable == "write-essay") {
    content = <EssayQuestion />;
  } else if (questionTable == "Speaking Spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "Listening Frenzy") {
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
  } else if (questionTable == "Fill in the Blanks") {
    content = <FillTheBlanks />;
  } else if (questionTable == "Highlight Incorrect Words") {
    content = <FillTheBlanks />;
  } else if (questionTable == "reading:-MCM") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "reading:-MCS") {
    content = <MultipleSingleReading />;
  } else if (questionTable == "re-order-paragraphs") {
    content = <ReOrderParagraph />;
  } else if (questionTable == "Reading: Fill in the Blanks") {
    content = <ReadingFillTheBlanks />;
  } else if (questionTable == "reading-&-writing:-FIB") {
    content = <FibReading />;
  } else {
    content = <h2>this is new question from</h2>;
  }
  return (
    <AdminLayout back={true} title={`${questionTable} / Q. # ${itemObj?.id}`}>
      {content}
    </AdminLayout>
  );
};

export default EditForms;
