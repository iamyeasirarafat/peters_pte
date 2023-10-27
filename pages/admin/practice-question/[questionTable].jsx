import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
const QuestionTable = () => {
  const router = useRouter();
  const { questionTable } = router.query;
  return (
    <AdminLayout title={questionTable}>
      <div>
        <h3>this is new table</h3>
      </div>
    </AdminLayout>
  );
};

export default QuestionTable;
