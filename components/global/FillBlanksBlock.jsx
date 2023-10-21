import Pagination from "./Pagination";
const FillBlanksBlock = () => {
  return (
    <>
      <div className="p-5 border border-primary rounded-[15px] relative">
        <p className="text-xl font-medium">
          A report on inequality in the UK said last week that girls had better
          educational results than boys at 16, went to university in greater
          numbers and achieved better degrees once they got there. More women
          <FillBlankInput /> now have higher education qualifications than men
          in <FillBlankInput /> every age group up to age 44, the report said. A
          report on inequality in the UK said last week that girls had better
          educational results than boys at 16, <FillBlankInput /> went to
          university in greater numbers and <FillBlankInput /> achieved better
          degrees once they got there. More women now have higher education
          qualifications than men in every age group up to age 44, the report
          said.
        </p>
      </div>
      <Pagination />
    </>
  );
};
export default FillBlanksBlock;
const FillBlankInput = () => {
  return (
    <div className="px-2 inline-block">
      <input
        className="w-[150px] text-gray text-lg text-center border border-x-0 border-t-0 border-b-gray outline-none focus:ring-transparent focus:border-gray p-0 m-0"
        type="text"
      />
    </div>
  );
};
