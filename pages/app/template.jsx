import TablePagination from "@/components/TablePagination";
import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "./layout";
import { StudyFile } from "./study-material";
function Template() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;

  // get Data
  useEffect(() => {
    const getStudyTemplate = async () => {
      const res = await axios.get(
        `/study_materials/template?limit=${pageLimit}&page=${pageNumber}`
      );
      setTemplates(res?.data);
      setLoading(false);
    };
    getStudyTemplate();
  }, [pageNumber]);
  return (
    <DashboardLayout title="Template">
      <p className="text-lg font-extrabold mb-2">Template File</p>
      {/* file */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : (
        <div className={`${templates?.length > 0 ? "space-y-2" : ""}`}>
          {templates?.results?.map((item, i) => (
            <StudyFile key={item?.id} data={item} />
          ))}
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(templates?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Template;
