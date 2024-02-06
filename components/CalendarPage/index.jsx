
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import "rsuite/dist/rsuite.css";

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/exam_calender")
      setData(data)
    }
    getData()
  }, [])

  const getTodoList = (date) => {
    const day = date
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.exam_date)
      const isEqual = (
        day.getFullYear() === itemDate.getFullYear() &&
        day.getMonth() === itemDate.getMonth() &&
        day.getDate() === itemDate.getDate()
      )
      if (isEqual) return item
    });

    // Dynamically handle cases based on the day
    const dynamicCases = {
      [day]: () => {
        return filteredData.map(item => ({
          name: item?.student?.full_name
        }));
      },
    };

    // Using dynamicCases to handle different cases dynamically
    return dynamicCases[day] ? dynamicCases[day]() : [];
  }

  const renderCell = (date) => {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                <ul className="calendar-todo-list">
                  {list.map((item, index) => (
                    <li className='mb-[2px] px-4 text-xs font-semibold py-1 rounded bg-[#FAF4F0]' key={index}>
                      <Badge /> {item.name}
                    </li>
                  ))}
                </ul>
              </Popover>
            }
          >
            <a className='flex gap-1 items-center'> <BsThreeDotsVertical /> {moreCount}+ Students</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li className='mb-[2px] px-4 text-xs font-semibold py-1 rounded bg-[#FAF4F0]' key={index}>
              <Badge /> {item.name}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar bordered cellClassName={date => "calendarCell"} renderCell={renderCell} />;
};
export default App;