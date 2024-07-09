import React from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function PTECalendar({ setSelectedDate = () => { } }) {

  function renderCell() {
    let cellStyle =
      "[&.rs-calendar-table-cell-selected>.rs-calendar-table-cell-content]:!bg-[#F4D1B1] [&.rs-calendar-table-cell]:w-[40px] [&.rs-calendar-table-cell-selected>.rs-calendar-table-cell-content]:!shadow-none [&.rs-calendar-table-cell-is-today>.rs-calendar-table-cell-content]:bg-[#849C3E] [&.rs-calendar-table-cell-is-today>.rs-calendar-table-cell-content>.rs-calendar-table-cell-day]:bg-transparent";

    return `!p-[2px]
              ${cellStyle}
              [&.rs-calendar-table-cell-un-same-month>.rs-calendar-table-cell-content]:bg-secondary
              [&.rs-calendar-table-cell-un-same-month>.rs-calendar-table-cell-content]:
              [&.rs-calendar-table-cell-un-same-month>.rs-calendar-table-cell-content]:text-black
              [&>div]:!h-[26px]
              [&>div]:flex
              [&>div]:justify-center
              [&>div]:items-center `;
  }

  return (
    <div className="p-[15px] rounded-[10px]">
      <Calendar
        cellClassName={renderCell}
        className="calendar-component-front
                    bg-white
                    [&>div.rs-calendar-header-has-month]:pb-0
                    [&>div>div>button.rs-calendar-header-title]:text-black
                    [&>div>div>button.rs-calendar-header-title]:text-[21px]
                    [&>.rs-calendar-body>div>div>div>span]:text-black
                    [&>div>button]:hidden
                    [&>div>div>button.rs-calendar-header-backward]:absolute
                    [&>div>div>button.rs-calendar-header-backward]:right-[40px]
                    [&>div>div>button.rs-calendar-header-forward]:absolute
                    [&>div>div>button.rs-calendar-header-forward]:right-[10px]
                    "
        onSelect={(date) => setSelectedDate(date)}
      />
    </div>
  );
}