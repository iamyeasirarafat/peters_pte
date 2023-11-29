import AdminLayout from "@/components/AdminLayout";
import Glance from "@/components/Glance";
import Students from "@/components/Students_list";
import TablePagination from "@/components/TablePagination";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const studentsList = [
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "85",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "70",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "60",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "50",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "79",
    group: "Dhaka Branch",
  },
];
const Index = () => {
  const [students, setStudents] = useState({});
  const [status, setStatus] = useState(true);

  useEffect(() => {
    // get students
    const getStudents = async () => {
      const res = await axios.get(`student/recentjoined`);
      setStudents(res?.data);
    };
    getStudents();
  }, [status]);
  return (
    <AdminLayout title="Dashboard">
      <div className="">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance />
      </div>
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">Recently Joined</p>
        <Students setStatus={setStatus} items={students?.results} />
        <TablePagination />
      </div>
    </AdminLayout>
  );
};

export default Index;
