import { useRouter } from "next/router";
import { LoaderIcon } from "react-hot-toast";
import GlobalPagination from "./GlobalPagination";

const Pagination = ({ HandleSubmit, isLoading }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-3">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-4">
          <button
            onClick={HandleSubmit}
            disabled={isLoading}
            className="py-1 md:py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-primary text-white font-semibold text-lg"
          >
            {isLoading && <LoaderIcon />}
            Submit
          </button>
          <button
            onClick={() => {
              router.reload();
            }}
            className="py-1 md:py-2 px-6 hover:bg-[#b38140] bg-oldPrimary  flex items-center gap-x-2 rounded-[22px]  text-white  font-semibold text-lg"
          >
            Restart
          </button>
        </div>
      </div>
      <GlobalPagination />
    </div>
  );
};

export default Pagination;
