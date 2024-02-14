import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/Icon";
import Table from "@/components/QuestionTable";
import TablePagination from "@/components/TablePagination";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getBaseUrl from "../../../../utils/getBaseUrl";
const Index = () => {
  const [reFetch, setReFetch] = useState(false);
  const router = useRouter();
  const { questionTable } = router.query;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;

  useEffect(() => {
    const url = getBaseUrl(questionTable);
    setBaseUrl(url);
    //init render or no searching text
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
    //if there any searching text in input
    const queryData = async () => {
      try {
        const response = await axios.get(
          `/${url}?limit=${pageLimit}&page=${pageNumber}&query=${searchText}`
        );
        setTableData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchText) {
      queryData();
    } else {
      fetchData();
    }
  }, [questionTable, pageNumber, reFetch, searchText === ""]);

  const handleSearch = async () => {
    setPageNumber(1);
    try {
      const response = await axios.get(
        `${baseUrl}?limit=9&page=1&query=${searchText}`
      );
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
        <div className="overflow-hidden">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            className={`${
              searchInput ? "translate-x-0 w-auto " : "translate-x-[5rem] w-0"
            }  duration-300 ease-in border-none outline-none focus:outline-none focus:ring-0`}
          />
          <button
            onClick={() => {
              if (searchText) {
                handleSearch();
              } else {
                setSearchInput(!searchInput);
              }
            }}
            className="px-3 py-[0.5rem]  bg-white "
          >
            <Icon className=" dark:fill-black" name="search" />
          </button>
        </div>
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
