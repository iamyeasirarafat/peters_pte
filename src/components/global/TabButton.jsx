import Image from "next/image";

const TabButton = ({
  children,
  src,
  bgColor,
  iconWidth,
  iconHeight,
  textColor,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`flex items-center gap-x-2 py-1 px-3 rounded-t-md text-base bg-${bgColor} text-${textColor}`}
    >
      {...children}
      {src && (
        <div className={`w-[${iconWidth}px] h-[${iconHeight}px]`}>
          <div className="w-full h-full relative">
            <Image className="object-cover" src={src} alt="button icon" fill />
          </div>
        </div>
      )}
    </button>
  );
};

export default TabButton;
