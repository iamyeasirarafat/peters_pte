const GlobalButton = ({ text, bgColor, textColor }) => {
  return (
    <button
      className={`text-${textColor} py-1 px-3 text-base rounded bg-${bgColor}`}
    >
      {text}
    </button>
  );
};

export default GlobalButton;
