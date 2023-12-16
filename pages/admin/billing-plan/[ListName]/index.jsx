import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { MdModeEdit } from "react-icons/md";

const Index = () => {
  const router = useRouter();
  const { ListName } = router.query || {};
  return (
    <Layout title={ListName.replace("_", " ")} back>
      <div>
        <button
          onClick={() => {
            router.push(
              `/admin/billing-plan/${
                ListName === "students_package"
                  ? "add-student-package"
                  : "add-org-package"
              }`
            );
          }}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <MdModeEdit /> Create new Package
        </button>
        {/* Package list */}
        <div>
          <p>Package list here</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
