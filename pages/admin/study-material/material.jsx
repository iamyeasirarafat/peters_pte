import Layout from "@/components/Layout";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { PredictionList, PredictionListMobile } from "./prediction";
import TablePagination from "@/components/TablePagination";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
const Index = () => {
  const [reFetch, setRefetch] = useState(false);
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  // get Data
  useEffect(() => {
    setIsLoading(true);
    const getStudyMaterial = async () => {
      const res = await axios.get(`/study_materials/study_material`);
      setStudyMaterial(res?.data);
      setIsLoading(false);
    };
    getStudyMaterial();
  }, [reFetch]);
  return (
    <Layout title="Material" back>
      <div className="mb-5 flex items-center gap-x-2">
        <button
          onClick={() =>
            router.push("/admin/study-material/add-study_material")
          }
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <AiFillPlusCircle />
          Create New Template
        </button>
        <button
          onClick={() => router.push("/admin/study-material/topic")}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <MdModeEdit />
          edit Add / Delete New Topic
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <PredictionListMobile
            data={studyMaterial?.results}
            setRefetch={setRefetch}
          />
        </div>
      ) : (
        <PredictionList data={studyMaterial?.results} setRefetch={setRefetch} />
      )}
      <TablePagination />
    </Layout>
  );
};

export default Index;
