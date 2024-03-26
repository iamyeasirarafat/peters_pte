import Layout from "@/components/Layout";
import AnswerShotQues from "@/components/QuestionForms/AnswerShotQues";
import DescribeImage from "@/components/QuestionForms/DescribeImage";
import Dictation from "@/components/QuestionForms/Dictation";
import EssayQuestion from "@/components/QuestionForms/EssayQuestion";
import FibReading from "@/components/QuestionForms/FibReading";
import FillTheBlanks from "@/components/QuestionForms/FillTheBlanks";
import HighlightSummary from "@/components/QuestionForms/HighlightSummary";
import ListeningFrenzy from "@/components/QuestionForms/ListeningFrenzy";
import MultipleChoiceListing from "@/components/QuestionForms/MultipleChoiceListing";
import MultipleChoiceReading from "@/components/QuestionForms/MultipleChoiceReading";
import MultipleSingleReading from "@/components/QuestionForms/MultipleSingleReading";
import ReOrderParagraph from "@/components/QuestionForms/ReOrderParagraph";
import ReTelLecture from "@/components/QuestionForms/ReTelLecture";
import ReadAloud from "@/components/QuestionForms/ReadAloud";
import ReadingFillTheBlanks from "@/components/QuestionForms/ReadingFillTheBlanks";
import RepeatSentence from "@/components/QuestionForms/RepeatSentence";
import SelectMissingWord from "@/components/QuestionForms/SelectMissingWord";
import SingleChoiceListing from "@/components/QuestionForms/SingleChoiceListing";
import SpeakingSpell from "@/components/QuestionForms/SpeakingSpell";
import SpellingBee from "@/components/QuestionForms/SpellingBee";
import SummerizeSpoken from "@/components/QuestionForms/SummerizeSpoken";
import SummerizeWritten from "@/components/QuestionForms/SummerizeWritten";
import { useRouter } from "next/router";
import React from "react";
import HighlightIncorrectWord from "../../../../components/QuestionForms/HighlightIncorrectWord";
const AllForms = () => {
  const router = useRouter();
  const { questionTable } = router.query;
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
    content = <ReadingFillTheBlanks />;
  } else if (questionTable == "reading-writing-blank") {
    content = <FibReading />;
  } else {
    content = <h2>this is new question from</h2>;
  }
  return (
    <Layout back={true} title={`${questionTable} / New Question`}>
      {content}
    </Layout>
  );
};

export default AllForms;
