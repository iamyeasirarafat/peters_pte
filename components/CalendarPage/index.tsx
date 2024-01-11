import Icon from "@/components/Icon";
import Month from "./Month";

const CalendarPage = () => {
  const type = "month";
  return (
    <>
      <div className="relative flex mb-6 lg:flex-wrap md:mb-5">
        <div className="flex items-center md:w-full md:justify-between">
          <button className="btn-stroke btn-square btn-small mr-1 md:mr-0">
            <Icon name="arrow-prev" />
          </button>
          <button className="btn-stroke btn-square btn-small md:order-3">
            <Icon name="arrow-next" />
          </button>
          <div className="ml-4.5 text-h6 md:ml-0">
            {type === "month"
              ? "September 2022"
              : type === "week"
                ? "September 3 - 9, 2022"
                : "September 3, 2022"}
          </div>
        </div>

      </div>
      {type === "month" && <Month />}
    </>
  );
};

export default CalendarPage;
