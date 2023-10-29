import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import ReadAloud from "@/components/QuestionForms/ReadAloud";
import RepeatSentence from "@/components/QuestionForms/RepeatSentence";
import ReTelLecture from "@/components/QuestionForms/ReTelLecture";
import DescribeImage from "@/components/QuestionForms/DescribeImage";
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
