import Glance from "@/components/Glance";
import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import { useEffect, useState } from "react";
import axios from "axios";
import Students from "@/components/Students_list";

const Index = () => {
  const [students, setStudents] = useState({});
  const [studentSCounts, setStudentsCounts] = useState({});
  const [status, setStatus] = useState(true);

  useEffect(() => {
    // get students
    const getStudents = async () => {
      const res = await axios.get(`student/recentjoined`);
      setStudents(res?.data);
    };
    getStudents();

    // get students count
    const getStudentsCount = async () => {
      const res = await axios.get(`student/counts`);
      setStudentsCounts(res?.data);
    };
    getStudentsCount();
  }, [status]);

  return (
    <Layout title="Dashboard">
      <div className="">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance studentSCounts={studentSCounts} />
      </div>
      <div className="mt-8">
        <p className="text-lg font-extrabold mb-2">Recently Joined</p>
        <Students setStatus={setStatus} items={students?.results} />
        <TablePagination />
      </div>
    </Layout>
  );
};

export default Index;
