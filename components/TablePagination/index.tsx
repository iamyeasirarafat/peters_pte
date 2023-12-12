import Icon from "@/components/Icon";

type TablePaginationProps = {
  pageNumber: number;
  totalPage: number;
  prevNext: any;
};

const TablePagination = ({
  pageNumber,
  totalPage,
  prevNext,
}: TablePaginationProps) => (
  <div className="flex justify-between items-center mt-5 md:mt-5">
    <button
      disabled={pageNumber === 1}
      onClick={() => prevNext((prev: any) => prev - 1)}
      className="btn-stroke btn-small"
    >
      <Icon name="arrow-prev" />
      <span>Prev</span>
    </button>
    <div className="text-sm font-bold">
      Page {pageNumber} of {totalPage}
    </div>
    <button
      disabled={totalPage === pageNumber}
      onClick={() => prevNext((prev: any) => prev + 1)}
      className="btn-stroke btn-small"
    >
      <span>Next</span>
      <Icon name="arrow-next" />
    </button>
  </div>
);

export default TablePagination;
