const Spinner = ({ className }) => {
  return (
    <div
      className={`${className} rounded-full animate-spin border-[4px] border-solid border-white border-t-transparent`}
    ></div>
  );
};
export default Spinner;
