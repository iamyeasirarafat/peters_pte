
const TabButton = ({ children, src, bgColor, textColor, onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-2 py-1 px-3 rounded-t-md text-sm md:text-base bg-${selected ? "blue" : bgColor} text-${textColor}`}
    >
      {...children}
    </button>
  );
};

export default TabButton;
