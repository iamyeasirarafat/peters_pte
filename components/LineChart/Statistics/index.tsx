import Icon from "@/components/Icon";

type StatisticsProps = {
  title: string;
  percent: number;
  count: any;
};

const Statistics = ({ title, percent, count }: StatisticsProps) => (
  <div className="flex-1 px-5 py-4 border-r border-n-1 last:border-none md:border-r-0 md:border-b dark:border-white">
    <div className="flex justify-between items-center mb-2">
      <div className="text-sm text-n-3 dark:text-white/75">{title}</div>
      <Icon
        className={percent > 0 ? "fill-green-1" : "fill-pink-1"}
        name={percent > 0 ? "arrow-up-right" : "arrow-down-left"}
      />
    </div>
    <div className="flex justify-between items-center">
      <div className="mb-1 text-h5">{count}</div>
      <div className="text-sm font-bold text-n-3 dark:text-white/75">
        {percent > 0 ? "+" + percent : percent}%
      </div>
    </div>
  </div>
);

export default Statistics;
