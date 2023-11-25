import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function StudentDetails() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/student/" + id);
      console.log(res);
    };
    if (router.isReady) {
      fetchData();
    }
  }, [id, router]);
  return <Layout title="Student Details">Student-details</Layout>;
}
