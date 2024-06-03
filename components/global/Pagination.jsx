import { useRouter } from "next/router";
import { LoaderIcon } from "react-hot-toast";
import GlobalPagination from "./GlobalPagination";

const Pagination = ({ HandleSubmit, isLoading }) => {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center justify-between mt-3">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-2">
          <button
            onClick={HandleSubmit}
            disabled={isLoading}
            className="py-2 px-6 disabled:opacity-50 flex items-center gap-x-2 rounded-[22px] bg-blue text-white font-semibold text-lg"
          >
            {isLoading && <LoaderIcon />}
            Submit
          </button>
          <button
            onClick={() => {
              router.reload();
            }}
            className="py-2 px-6 hover:bg-secondary  flex items-center gap-x-2 rounded-[22px]  text-primary border border-primary font-semibold text-lg"
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
