const LoadingButton = () => {
  return (
    <button
      disabled
      className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 flex justify-center items-center"
    >
      <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-gray-800 border-t-transparent"></div>
    </button>
  );
};

export default LoadingButton;
