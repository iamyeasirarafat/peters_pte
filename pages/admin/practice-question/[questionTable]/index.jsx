import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import Table from "@/components/QuestionTable";
import TablePagination from "@/components/TablePagination";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
const Index = () => {
  const router = useRouter();
  const { questionTable } = router.query;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let url;
    if (questionTable === "read-aloud") {
      url = "practice/read_alouds";
    } else if (questionTable === "summarize-written-text") {
      url = "summarizes";
    } else if (questionTable === "write-essay") {
      url = "write_easies";
    } else if (questionTable === "highlight-correct-summary") {
      url = "highlight_summarys";
    } else if (questionTable === "select-missing-word") {
      url = "missing_words";
    } else if (questionTable === "write-from-dictation") {
      url = "dictations";
    } else if (questionTable === "repeat-sentence") {
      url = "repeat_sentences";
    } else if (questionTable === "answer-short-question") {
      url = "short_questions";
    } else if (questionTable === "re-tell-lecture") {
      url = "retell_sentences";
    } else if (questionTable === "describe-image") {
      url = "describe_images";
    } else if (questionTable === "re-order-paragraphs") {
      url = "reorder_paragraphs";
    } else if (questionTable === "reading:-MCM") {
      url = "multi_choices/reading";
    } else if (questionTable === "reading:-MCS") {
      url = "multi_choices/reading/single-answer";
    } else if (questionTable === "listening:-MCM") {
      url = "multi_choices";
    } else if (questionTable === "listening:-MCS") {
      url = "multi_choices/single-answer";
    } else if (questionTable === "summarize-spoken-text") {
      url = "spoken/summarizes";
    } else if (questionTable === "reading-&-writing:-FIB") {
      url = "reading_blanks";
    } else if (questionTable === "spelling-bee") {
      url = "games/spelling_bees";
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/${url}`);
        setTableData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionTable]);
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
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                    border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : tableData?.length ? (
        <>
          <Table student={false} items={tableData} />
          <TablePagination />
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
