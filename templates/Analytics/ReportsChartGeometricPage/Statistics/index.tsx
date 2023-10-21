import Icon from "@/components/Icon";

type StatisticsProps = {
    items: any;
};

const Statistics = ({ items }: StatisticsProps) => (
    <div className="flex -mx-2.5 mb-5 md:block md:mx-0 md:-mt-2.5">
        {items.map((item: any) => (
            <div
                className="w-[calc(33.333%-1.25rem)] mx-2.5 px-5 py-4.5 card md:w-full md:mx-0 md:mt-2.5"
                key={item.id}
            >
                <div className="flex justify-between items-center mb-1">
                    <div className="text-sm">{item.title}</div>
                    <Icon
                        className="icon-18 dark:fill-white"
                        name={item.icon}
                    />
                </div>
                <div className="mb-3.5 text-h5">${item.price}</div>
                <div
                    className="relative w-full h-1"
                    style={{ backgroundColor: item.colorProgress }}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-n-1/30"
                        style={{ width: item.progress + "%" }}
                    ></div>
                </div>
            </div>
        ))}
    </div>
);

export default Statistics;
