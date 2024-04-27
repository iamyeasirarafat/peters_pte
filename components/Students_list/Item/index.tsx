import Image from "@/components/Image";
import dayjs from "dayjs";
import Icon from "@/components/Icon";
import axios from "axios";
type ItemProps = {
  item: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setStatus: (value: any) => void;
};

const Item = ({ item, isOpen, setIsOpen, setStatus }: ItemProps) => {
  return (
    <div className="space-y-2 px-4 py-3 text-sm">
      <div className="w-full flex items-center justify-between">
        <div className="label-stroke min-w-[7.25rem] text-xs">
          <div className="label-stroke border border-n-1 min-w-[7.25rem]">
            {item.premium ? "premium" : "free"}
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div
            className={`border min-w-[4rem] ${
              item.avl === "Paid"
                ? "label-stroke-green"
                : item.avl === "Med"
                ? "label-stroke-yellow"
                : item.avl === "Low"
                ? "label-stroke-pink"
                : "label-stroke"
            }`}
          >
            {item.avg_score || "N/A"}
          </div>
          <div className="flex justify-center bg-gray-100 ">
            <div
              className="relative inline-block text-left"
              onClick={() => setIsOpen(isOpen === item.id ? null : item.id)}
            >
              <button className="btn-transparent-dark btn-small btn-square">
                <Icon name="dots" />
              </button>
              {isOpen === item.id && (
                <div className="origin-top-right font-semibold absolute right-8 top-0 z-3 mt-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-secondary dark:bg-white/20 dark:border border-white">
                  <button
                    onClick={async () => {
                      await axios.delete("/student/" + item.id);
                      setStatus(Math.random());
                    }}
                    className="flex items-center gap-x-2 px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                  >
                    <Icon name="cross" /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Image
            className="w-10 h-10 rounded-full"
            src={item.picture || "/images/img-2.jpg"}
            width={42}
            height={42}
            alt=""
          />
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-semibold">{item?.full_name}</p>
            <p className="text-sm font-semibold">
              {item?.profile?.[0]?.userid}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            {item?.profile[0]?.group?.name || "N/A"}
          </p>
          <p className="text-xs font-medium">
            {" "}
            {dayjs(item.last_login).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
