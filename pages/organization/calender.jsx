import CalendarPage from "@/components/CalendarPage";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

const Calender = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/exam_calender");
      console.log(res?.data);
      setData(res?.data);
    };
    getData();
  }, []);
  return (
    <Layout title="Exam Calender">
      <CalendarPage />
    </Layout>
  );
};

export default Calender;
