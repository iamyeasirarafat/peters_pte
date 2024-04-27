import Glance from "@/components/Glance";
import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import { useEffect, useState } from "react";
import axios from "axios";
import Students from "@/components/Students_list";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState({});
  const [studentSCounts, setStudentsCounts] = useState({});
  const [status, setStatus] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 5;

  useEffect(() => {
    // get students
    const getStudents = async () => {
      const res = await axios.get(
        `student/recentjoined?limit=${pageLimit}&page=${pageNumber}`
      );
      setStudents(res?.data);
      setLoading(false);
    };
    getStudents();

    // get students count
    const getStudentsCount = async () => {
      const res = await axios.get(`student/counts`);
      setStudentsCounts(res?.data);
    };
    getStudentsCount();
  }, [status, pageNumber]);

  return (
    <Layout title="Dashboard">
      <div className="">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance studentSCounts={studentSCounts} />
      </div>
      <div className="mt-8">
        <p className="text-lg font-extrabold mb-2">Recently Joined</p>
        {loading ? (
          <AnimatedLoading />
        ) : (
          <>
            <Students setStatus={setStatus} items={students?.results} />
            <TablePagination
              pageNumber={pageNumber}
              totalPage={Math.ceil(students?.total / pageLimit)}
              prevNext={setPageNumber}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;

export const AnimatedLoading = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div
        className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
      ></div>
    </div>
  );
};
