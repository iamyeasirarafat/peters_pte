import Link from "next/link";

const Card = ({ title, items, bg, link, text }) => {
  const bgClasses = {
    yellow: "bg-yellow-600",
    orange: "bg-orange-300",
    blue: "bg-blue-400",
    gray: "bg-gray-500",
    purple: "bg-purple-400",
  };

  // Use the mapping to get the appropriate class based on the bg prop
  const bgClass = bgClasses[bg] || "bg-yellow-600"; // Default to "bg-yellow-600" if not found
  return (
    <Link
      href={title ? `/admin/practice-question/${link}` : "/#"}
      className="bg-white dark:bg-black rounded-sm flex justify-start items-center p-5 gap-x-4"
    >
      <div
        className={`w-[2.88rem] h-[2.88rem] flex justify-center items-center`}
        style={{ backgroundColor: bg }}
      >
        <p className="text-white font-bold">{text}</p>
      </div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{items} items</p>
      </div>
    </Link>
  );
};

export default Card;
