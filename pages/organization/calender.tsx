import CalendarPage from "@/components/CalendarPage";
import Layout from "@/components/Layout";
import type { NextPage } from "next";

const Courses: NextPage = () => {
  return (
    <Layout title="Exam Calender">
      <CalendarPage />
    </Layout>
  );
};

export default Courses;
