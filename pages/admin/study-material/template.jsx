import Layout from "@/components/Layout";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { AiFillPlusCircle } from "react-icons/ai";
import { PredictionList, PredictionListMobile } from "./prediction";
import TablePagination from "@/components/TablePagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
const Index = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  // get Data
  useEffect(() => {
    setIsLoading(true);
    const getStudyTemplate = async () => {
      const res = await axios.get(`/study_materials/template`);
      setTemplates(res?.data);
      setIsLoading(false);
    };
    getStudyTemplate();
  }, []);
  return (
    <Layout title="Template" back>
      <div className="mb-5">
        <button
          onClick={() => router.push("/admin/study-material/add-template")}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <AiFillPlusCircle />
          Create New Template
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <PredictionListMobile data={templates?.results} />
        </div>
      ) : (
        <PredictionList data={templates?.results} />
      )}
      <TablePagination />
    </Layout>
  );
};

export default Index;
