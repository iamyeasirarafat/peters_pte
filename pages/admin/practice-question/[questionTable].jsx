import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import Table from "@/components/QuestionTable";
import TablePagination from "@/components/TablePagination";
const QuestionTable = () => {
  const studentsList = [
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: true,
      averageScore: "05/07/23",
    },
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: false,
      averageScore: "05/07/23",
    },
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: true,
      averageScore: "05/07/23",
    },
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: true,
      averageScore: "05/07/23",
    },
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: true,
      averageScore: "05/07/23",
    },
    {
      name: "Bill on the hill",
      accountPlan: "#7250589",
      userId: "12",
      lastLoggedIn: true,
      averageScore: "05/07/23",
    },
  ];
  const router = useRouter();
  const { questionTable } = router.query;
  return (
    <AdminLayout title={questionTable}>
      <div>
        <Table student={false} items={studentsList} />
        <TablePagination />
      </div>
    </AdminLayout>
  );
};

export default QuestionTable;
