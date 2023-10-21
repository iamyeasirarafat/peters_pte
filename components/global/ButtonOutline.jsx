const ButtonOutline = ({ text, borderColor, textColor, count }) => {
  return (
    <button
      className={`text-${textColor} py-1 px-3 text-base rounded border border-${borderColor}`}
    >
      {text} <span>{count}</span>
    </button>
  );
};

export default ButtonOutline;
