import Link from "next/link";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type ItemProps = {
  item: any;
};

const Item = ({ item }: ItemProps) => (
  <div className="space-y-2 px-4 py-3 text-sm">
    <div className="w-full flex items-center justify-between">
      <div className="label-stroke min-w-[7.25rem] text-xs">
        {item.accountPlan}
      </div>
      <div className="flex items-center gap-x-2">
        <div
          className={`min-w-[4rem] ${
            item.averageScore >= "80"
              ? "label-stroke-green"
              : item.averageScore >= "70"
              ? "label-stroke-yellow"
              : item.averageScore >= "60"
              ? "label-stroke-pink"
              : "label-stroke"
          }`}
        >
          {item.averageScore}/90
        </div>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </div>
    </div>
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          className="w-10 h-10 rounded-full"
          src={item.image}
          width={42}
          height={42}
          alt=""
        />
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-semibold">{item?.name}</p>
          <p className="text-sm font-semibold">{item?.userId}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold">Dhaka Branch</p>
        <p className="text-xs font-medium">05/10/23</p>
      </div>
    </div>
  </div>
);

export default Item;
