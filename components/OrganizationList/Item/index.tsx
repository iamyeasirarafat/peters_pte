import Image from "@/components/Image";
import Icon from "@/components/Icon";
import axios from "axios";
type ItemProps = {
  item: any;
  setStatus: any;
  setIsOpen: any;
  isOpen: boolean;
};

const Item = ({ item, setStatus, setIsOpen, isOpen }: ItemProps) => (
  <div className="space-y-2 px-4 py-3 text-sm">
    <div className="w-full flex items-center justify-between">
      <div className="label-stroke min-w-[7.25rem] text-xs">
        <p className="text-sm font-semibold">
          {item?.profile?.country || "N/a"}
        </p>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(isOpen === item.id ? null : item.id)}
          className="btn-transparent-dark btn-small btn-square"
        >
          <Icon name="dots" />
        </button>
        {isOpen === item.id && (
          <button
            onClick={async () => {
              await axios.delete("/student/" + item.id);
              setStatus(Math.random());
            }}
            className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900 bg-secondary rounded-md absolute right-full top-0"
          >
            <Icon name="cross" /> Remove
          </button>
        )}
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
          <p className="text-sm font-semibold">{item?.profile?.org_name}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold">{item?.students || "N/a"}</p>
        <p className="text-xs font-medium">{item?.email}</p>
      </div>
    </div>
  </div>
);

export default Item;
