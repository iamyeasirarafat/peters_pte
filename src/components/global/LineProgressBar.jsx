const LineProgressBar = ({ lineColor, strokeWidth }) => {
  return (
    <div className={`h-[45px] w-full rounded-3xl bg-secondary relative`}>
      <p
        style={{ width: `${strokeWidth}%` }}
        className={`block h-full bg-${lineColor} rounded-3xl absolute top-0 left-0`}
      ></p>
    </div>
  );
};

export default LineProgressBar;
