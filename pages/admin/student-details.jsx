import Layout from "@/components/Layout";
import { StudentsDetailsMain } from "../organization/student-details";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function StudentDetails() {
  const [fetch, setFetch] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const [studentDetails, setStudentDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/student/" + id);
      setStudentDetails(res?.data);
    };
    router.isReady && fetchData();
  }, [id, router, fetch]);
  return (
    <Layout title="Student Details" back>
      <StudentsDetailsMain
        studentDetails={studentDetails}
        setFetch={setFetch}
      />
    </Layout>
  );
}
