import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/Icon";
import Table from "@/components/QuestionTable";
import TablePagination from "@/components/TablePagination";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Index = () => {
  const [reFetch, setReFetch] = useState(false);
  const router = useRouter();
  const { questionTable } = router.query;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;
  useEffect(() => {
    let url;
    if (questionTable === "read-aloud") {
      url = "practice/read_alouds";
    } else if (questionTable === "summarize") {
      url = "summarizes";
    } else if (questionTable === "write-easy") {
      url = "write_easies";
    } else if (questionTable === "highlight-summary") {
      url = "highlight_summarys";
    } else if (questionTable === "missing-word") {
      url = "missing_words";
    } else if (questionTable === "dictation") {
      url = "dictations";
    } else if (questionTable === "repeat-sentence") {
      url = "repeat_sentences";
    } else if (questionTable === "short-question") {
      url = "short_questions";
    } else if (questionTable === "retell-sentence") {
      url = "retell_sentences";
    } else if (questionTable === "describe-image") {
      url = "describe_images";
    } else if (questionTable === "reorder-paragraph") {
      url = "reorder_paragraphs";
    } else if (questionTable === "multi-choice-reading") {
      url = "multi_choices/reading";
    } else if (questionTable === "multi-choice-reading-single") {
      url = "multi_choices/reading/single-answer";
    } else if (questionTable === "multi-choice") {
      url = "multi_choices";
    } else if (questionTable === "multi-choice-single") {
      url = "multi_choices/single-answer";
    } else if (questionTable === "summarize-spoken") {
      url = "spoken/summarizes";
    } else if (questionTable === "r-w-blank") {
      url = "read-write/blanks";
    } else if (questionTable === "spelling-bee") {
      url = "games/spelling_bees";
    } else if (questionTable === "blank") {
      url = "blanks";
    } else if (questionTable === "reading-blank") {
      url = "reading_blanks";
    } else if (questionTable == "highlight-incorrect-word") {
      url = "highlight_incorrect_words";
    } else if (questionTable === "spelling-bee") {
      url = "games/spelling_bees";
    } else if (questionTable === "speaking-spell") {
      url = "games/speaking_spells";
    } else if (questionTable === "listening-frenzy") {
      url = "games/listening_frenzies";
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/${url}?limit=${pageLimit}&page=${pageNumber}`
        );
        setTableData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionTable, pageNumber, reFetch]);
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
        </div>
        <button className="px-3 py-[0.4rem] border bg-white">
          <Icon className=" dark:fill-black" name="search" />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                    border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : tableData?.results?.length ? (
        <>
          <Table
            student={false}
            items={tableData?.results}
            setReFetch={setReFetch}
          />
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(tableData?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </>
      ) : (
        <h3 className="text-center mt-30 font-bold text-3xl text-orange-300">
          No Data found
        </h3>
      )}
    </AdminLayout>
  );
};

export default Index;
