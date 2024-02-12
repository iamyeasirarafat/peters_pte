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
import HighlightIncorrectWord from "../../../../components/QuestionEditForms/HighlightIncorrectWord";
const EditForms = () => {
  const router = useRouter();
  const { questionTable, item } = router.query;
  const itemObj = item ? JSON.parse(item) : null;
  let content;
  if (questionTable == "read-aloud") {
    content = <ReadAloud />;
  } else if (questionTable == "repeat-sentence") {
    content = <RepeatSentence />;
  } else if (questionTable == "retell-sentence") {
    content = <ReTelLecture />;
  } else if (questionTable == "short-question") {
    content = <AnswerShotQues />;
  } else if (questionTable == "describe-image") {
    content = <DescribeImage />;
  } else if (questionTable == "summarize-spoken") {
    content = <ReTelLecture />;
  } else if (questionTable == "dictation") {
    content = <Dictation />;
  } else if (questionTable == "summarize") {
    content = <SummerizeWritten />;
  } else if (questionTable == "write-easy") {
    content = <EssayQuestion />;
  } else if (questionTable == "Speaking Spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "Listening Frenzy") {
    content = <ListeningFrenzy />;
  } else if (questionTable == "spelling-bee") {
    content = <SpellingBee />;
  } else if (questionTable == "multi-choice") {
    content = <MultipleChoiceListing />;
  } else if (questionTable == "multi-choice-single") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "highlight-summary") {
    content = <HighlightSummary />;
  } else if (questionTable == "missing-word") {
    content = <SelectMissingWord />;
  } else if (questionTable == "blank") {
    content = <FillTheBlanks />;
  } else if (questionTable == "multi-choice-reading") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "highlight-incorrect-words") {
    content = <HighlightIncorrectWord />;
  }  else if (questionTable == "multi-choice-reading-single") {
    content = <MultipleSingleReading />;
  } else if (questionTable == "reorder-paragraph") {
    content = <ReOrderParagraph />;
  } else if (questionTable == "reading-blank") {
    content = <ReadingFillTheBlanks />;
  } else if (questionTable == "r-w-blank") {
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
