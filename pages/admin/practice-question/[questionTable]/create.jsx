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
const AllForms = () => {
  const router = useRouter();
  const { questionTable } = router.query;
  console.log(questionTable);
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
    <AdminLayout back={true} title={`${questionTable} / New Question`}>
      {content}
    </AdminLayout>
  );
};

export default AllForms;
