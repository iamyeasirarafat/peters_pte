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
    content = <ReTelLecture />;
  } else if (questionTable == "Describe Image") {
    content = <DescribeImage />;
  } else if (questionTable == "Summarize Spoken Text") {
    content = <ReTelLecture />;
  } else if (questionTable == "Write From Dictation") {
    content = <ReTelLecture />;
  } else if (questionTable == "Summarize Written Text") {
    content = <ReadAloud />;
  } else if (questionTable == "Write Essay") {
    content = <EssayQuestion />;
  } else if (questionTable == "Speaking Spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "Listening Frenzy") {
    content = <ListeningFrenzy />;
  } else if (questionTable == "Spelling Bee") {
    content = <SpellingBee />;
  } else if (questionTable == "Multiple Choice (Multiples)") {
    content = <MultipleChoiceListing />;
  } else if (questionTable == "Multiple Choice (Singles)") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "Highlight Correct Summary") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "Select Missing Word") {
    content = <SingleChoiceListing />;
  } else if (questionTable == "Fill in the Blanks") {
    content = <FillTheBlanks />;
  } else if (questionTable == "Highlight Incorrect Words") {
    content = <FillTheBlanks />;
  } else if (questionTable == "Multiple Choice (Multiple)") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "Multiple Choice (Single)") {
    content = <MultipleChoiceReading />;
  } else if (questionTable == "Re-order Paragraphs") {
    content = <ReOrderParagraph />;
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
