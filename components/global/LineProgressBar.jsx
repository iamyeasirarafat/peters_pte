const LineProgressBar = ({ lineColor, strokeWidth, height }) => {
  return (
    <div
      style={{ height: `${height}px` }}
      className={`w-full rounded-3xl bg-secondary relative overflow-hidden`}
    >
      <p
        style={{ width: `${strokeWidth}%` }}
        className={`block h-full bg-${lineColor} rounded-3xl absolute top-0 left-0`}
      ></p>
    </div>
  );
};

export default LineProgressBar;
