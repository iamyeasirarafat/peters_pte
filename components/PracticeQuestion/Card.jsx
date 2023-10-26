import Link from "next/link";

const Card = ({ title, items, bg, link, text }) => {
  return (
    <Link
      href={link ? `/${link}` : "#"}
      className="h-24 w-[19rem] bg-white dark:bg-black rounded-sm flex justify-start items-center gap-5  pl-5"
    >
      <div
        className={`w-[2.88rem] h-[2.88rem] bg-${bg} flex justify-center items-center`}
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
