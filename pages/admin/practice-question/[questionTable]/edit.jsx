import Layout from "@/components/Layout";
import AnswerShotQues from "@/components/QuestionEditForms/AnswerShotQues";
import DescribeImage from "@/components/QuestionEditForms/DescribeImage";
import Dictation from "@/components/QuestionEditForms/Dictation";
import EssayQuestion from "@/components/QuestionEditForms/EssayQuestion";
import FibReading from "@/components/QuestionEditForms/FibReading";
import FillTheBlanks from "@/components/QuestionEditForms/FillTheBlanks";
import HighlightSummary from "@/components/QuestionEditForms/HighlightSummary";
import ListeningFrenzy from "@/components/QuestionEditForms/ListeningFrenzy";
import MultipleChoiceListing from "@/components/QuestionEditForms/MultipleChoiceListing";
import MultipleChoiceReading from "@/components/QuestionEditForms/MultipleChoiceReading";
import MultipleSingleReading from "@/components/QuestionEditForms/MultipleSingleReading";
import ReOrderParagraph from "@/components/QuestionEditForms/ReOrderParagraph";
import ReTelLecture from "@/components/QuestionEditForms/ReTelLecture";
import ReadAloud from "@/components/QuestionEditForms/ReadAloud";
import ReadingFillTheBlanks from "@/components/QuestionEditForms/ReadingFillTheBlanks";
import RepeatSentence from "@/components/QuestionEditForms/RepeatSentence";
import SelectMissingWord from "@/components/QuestionEditForms/SelectMissingWord";
import SingleChoiceListing from "@/components/QuestionEditForms/SingleChoiceListing";
import SpeakingSpell from "@/components/QuestionEditForms/SpeakingSpell";
import SpellingBee from "@/components/QuestionEditForms/SpellingBee";
import SummerizeWritten from "@/components/QuestionEditForms/SummerizeWritten";
import { useRouter } from "next/router";
import React from "react";
import HighlightIncorrectWord from "../../../../components/QuestionEditForms/HighlightIncorrectWord";
import SummerizeSpoken from "../../../../components/QuestionEditForms/SummerizeSpoken";
const EditForms = () => {
  const router = useRouter();
  const { questionTable, item } = router.query;
  const itemObj = item ? JSON.parse(item) : null;
  let content;
  if (questionTable == "read-aloud") {
    content = <ReadAloud />;
  } else if (questionTable == "repeat-sentence") {
    content = <RepeatSentence />;
  } else if (questionTable == "retell-lecture") {
    content = <ReTelLecture />;
  } else if (questionTable == "short-question") {
    content = <AnswerShotQues />;
  } else if (questionTable == "describe-image") {
    content = <DescribeImage />;
  } else if (questionTable == "summarize-spoken") {
    content = <SummerizeSpoken />;
  } else if (questionTable == "dictation") {
    content = <Dictation />;
  } else if (questionTable == "summarize") {
    content = <SummerizeWritten />;
  } else if (questionTable == "write-easy") {
    content = <EssayQuestion />;
  } else if (questionTable == "speaking-spell") {
    content = <SpeakingSpell />;
  } else if (questionTable == "listening-frenzy") {
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
  } else if (questionTable == "highlight-incorrect-word") {
    content = <HighlightIncorrectWord />;
  } else if (questionTable == "multi-choice-reading-single") {
    content = <MultipleSingleReading />;
  } else if (questionTable == "reorder-paragraph") {
    content = <ReOrderParagraph />;
  } else if (questionTable == "reading-blank") {
    content = <FibReading />;
  } else if (questionTable == "reading-writing-blank") {
    content = <ReadingFillTheBlanks />;
  } else {
    content = <h2>this is new question from</h2>;
  }
  return (
    <Layout back={true} title={`${questionTable} / Q. # ${itemObj?.id}`}>
      {content}
    </Layout>
  );
};

export default EditForms;
