import Image from "next/image";

const TabButton = ({ children, src, bgColor, textColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-2 py-1 px-3 rounded-t-md text-sm md:text-base bg-${bgColor} text-${textColor}`}
    >
      {...children}
      {src && (
        <div className="h-5 w-5">
          <div className="w-full h-full relative">
            <Image className="object-cover" src={src} alt="button icon" fill />
          </div>
        </div>
      )}
    </button>
  );
};

export default TabButton;
