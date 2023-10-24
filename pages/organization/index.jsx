import Glance from "@/components/Glance";
import Layout from "@/components/Layout";
import Students from "@/components/Products";
import { studentsList } from "./reports";
import TablePagination from "@/components/TablePagination";

const Courses = () => {
  // return <CoursesV1Page />;
  return (
    <Layout title="Dashboard">
      <div className="">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance />
      </div>
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">Recently Joined</p>
        <Students student={false} items={studentsList} />
        <TablePagination />
      </div>
    </Layout>
  );
};

export default Courses;
