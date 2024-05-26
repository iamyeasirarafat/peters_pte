import GlobalPagination from "./GlobalPagination";

const Pagination = ({
  HandleSubmit,
  audioData,
  handleStartRecording,
  isLoading,
}) => {
  return (
    <div className="flex gap-4 items-center justify-between mt-3">
      <div className="flex items-center gap-x-2">
        <button
          disabled={isLoading}
          onClick={HandleSubmit}
          className="py-2 px-3 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-sm md:text-lg"
        >
          {isLoading ? (
            <>
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
        {audioData && (
          <button
            onClick={handleStartRecording}
            className="py-2 px-3 rounded-[22px] bg-primary text-white font-semibold text-sm md:text-lg"
          >
            Re-Test
          </button>
        )}
      </div>
      <GlobalPagination />
    </div>
  );
};

export default Pagination;
