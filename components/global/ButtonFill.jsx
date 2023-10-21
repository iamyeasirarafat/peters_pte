const ButtonFill = ({ text, bgColor, textColor, count }) => {
  return (
    <button
      className={`text-${textColor} py-1 px-3 text-base rounded bg-${bgColor}`}
    >
      {text} <span>{count}</span>
    </button>
  );
};

export default ButtonFill;
