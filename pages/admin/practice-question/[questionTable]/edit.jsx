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
  const itemObj = JSON.parse(item);
  let content;
  if (questionTable == "Read Aloud") {
    content = <ReadAloud />;
  } else if (questionTable == "Repeat Sentence") {
    content = <RepeatSentence />;
  } else if (questionTable == "Re-Tell Lecture") {
    content = <ReTelLecture />;
  } else if (questionTable == "Answer Short Question") {
    content = <AnswerShotQues />;
  } else if (questionTable == "Describe Image") {
    content = <DescribeImage />;
  } else if (questionTable == "Summarize Spoken Text") {
    content = <ReTelLecture />;
  } else if (questionTable == "Write From Dictation") {
    content = <Dictation />;
  } else if (questionTable == "Summarize Written Text") {
    content = <SummerizeWritten />;
  } else if (questionTable == "Write Essay") {
    content = <EssayQuestion />;
  } else if (questionTable == "Speaking Spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "Listening Frenzy") {
    content = <ListeningFrenzy />;
  } else if (questionTable == "Spelling Bee") {
    content = <SpellingBee />;
  } else if (questionTable == "Listening: MCM") {
    content = <MultipleChoiceListing />;
  } else if (questionTable == "Listening: MCS") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "Highlight Correct Summary") {
    content = <HighlightSummary />;
  } else if (questionTable == "Select Missing Word") {
    content = <SelectMissingWord />;
  } else if (questionTable == "Fill in the Blanks") {
    content = <FillTheBlanks />;
  } else if (questionTable == "Highlight Incorrect Words") {
    content = <FillTheBlanks />;
  } else if (questionTable == "Reading: MCM") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "Reading: MCS") {
    content = <MultipleSingleReading />;
  } else if (questionTable == "Re-order Paragraphs") {
    content = <ReOrderParagraph />;
  } else if (questionTable == "Reading: Fill in the Blanks") {
    content = <ReadingFillTheBlanks />;
  } else if (questionTable == "Reading & Writing: FIB") {
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
