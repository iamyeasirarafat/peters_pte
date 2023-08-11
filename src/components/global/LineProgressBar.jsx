const LineProgressBar = ({ lineColor, strokeWidth, height }) => {
  return (
    <div className={`h-[${height}px] w-full rounded-3xl bg-secondary relative`}>
      <p
        style={{ width: `${strokeWidth}%` }}
        className={`block h-full bg-${lineColor} rounded-3xl absolute top-0 left-0`}
      ></p>
    </div>
  );
};

export default LineProgressBar;
