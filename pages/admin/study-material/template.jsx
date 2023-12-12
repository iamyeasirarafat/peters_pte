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
  const [reFetch, setRefetch] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 8;

  // get Data
  useEffect(() => {
    const getStudyTemplate = async () => {
      const res = await axios.get(
        `/study_materials/template?limit=${pageLimit}&page=${pageNumber}`
      );
      setTemplates(res?.data);
      setIsLoading(false);
    };
    getStudyTemplate();
  }, [reFetch, pageNumber]);
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
          <PredictionListMobile
            data={templates?.results}
            setRefetch={setRefetch}
          />
        </div>
      ) : (
        <PredictionList data={templates?.results} setRefetch={setRefetch} />
      )}
      <TablePagination
        pageNumber={pageNumber}
        totalPage={Math.ceil(templates?.total / pageLimit)}
        prevNext={setPageNumber}
      />
    </Layout>
  );
};

export default Index;
