import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import Table from "@/components/QuestionTable";
import TablePagination from "@/components/TablePagination";
import Icon from "@/components/Icon";
import Link from "next/link";
const Index = () => {
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
    <AdminLayout title={questionTable} back={true}>
      <div className="flex justify-between mb-6">
        <div>
          <Link href={`/admin/practice-question/${questionTable}/create`}>
            <button className="mr-3 h-10 px-6 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20">
              <Icon
                className="-mt-0.25 mr-3 dark:fill-white"
                name="add-circle"
              />
              Create New Question
            </button>
          </Link>
          <button
            className="h-10 px-6 text-sm font-bold last:mb-0 dark:text-black bg-white  transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
            as="button"
          >
            <Icon className="-mt-0.25 mr-3 dark:fill-black" name="filters" />
            filters
          </button>
        </div>
        <button className="px-3 py-[0.4rem] border bg-white">
          <Icon className=" dark:fill-black" name="search" />
        </button>
      </div>
      <Table student={false} items={studentsList} />
      <TablePagination />
    </AdminLayout>
  );
};

export default Index;
