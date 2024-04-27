import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Link from "next/link";
import { formatDateTime } from "@/utils/formatDateTime";
type ItemProps = {
  item: any;
};

const Item = ({ item }: ItemProps) => (
  <div className="space-y-2 px-4 py-3 text-sm">
    <div className="w-full flex items-center justify-between">
      <div className="label-stroke border min-w-[7.25rem] text-xs">
        {item.premium ? "Premium" : "Free"}
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
        <Link
          className="text-sm font-bold transition-colors hover:text-primary"
          href={`/organization/student-details?id=${item.id}`}
        >
          <div className="w-11 h-11  mr-3 ">
            <Image
              className="w-full h-full  rounded-full"
              src={item.picture || "/images/img-2.jpg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        </Link>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-semibold"> {item.full_name}</p>
          <p className="text-sm font-semibold">{item?.profile[0]?.userid}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold">{item?.profile[0]?.group?.name}</p>
        <p className="text-xs font-medium">
          {formatDateTime(item.last_login, "date")}
        </p>
      </div>
    </div>
  </div>
);

export default Item;
