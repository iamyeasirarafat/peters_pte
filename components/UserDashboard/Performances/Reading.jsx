import React, { useState } from 'react';
import CircularProgressWidget from '../Cards/CircularProgressWidget';
const readingPerformances = [
    {
        title: "Reading:Fill in the Blanks",
        value: "5/112",
        percentage: "30",
        strokeColor: "#4399FF",
        trailColor: "#7DD8FF"
    },
    {
        title: "Reading:Re-Order Paragraphs",
        value: "5/112",
        percentage: "30",
        strokeColor: "#4399FF",
        trailColor: "#7DD8FF"
    },
    {
        title: "Reading & Writing:Fill in the Blanks",
        value: "5/112",
        percentage: "30",
        strokeColor: "#4399FF",
        trailColor: "#7DD8FF"
    },
    {
        title: "Multiple Choice,Multiple Answers",
        value: "5/112",
        percentage: "30",
        strokeColor: "#4399FF",
        trailColor: "#7DD8FF"
    },
    {
        title: "Multiple Choice,Single Answers",
        value: "5/112",
        percentage: "30",
        strokeColor: "#4399FF",
        trailColor: "#7DD8FF"
    },

]
function Reading({ data }) {
    const [readingPerformances, setReadingPerformances] = useState([])
    const convertData = () => {
        const newData = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                const title = `${key.charAt(0).toUpperCase()}${key.slice(1).replace(/_/g, " ")}`;
                const value = `${item.practices}/${item.total}`;
                const percentage = `${item.percentage}`;
                const strokeColor = "#4399FF";
                const trailColor = "#7DD8FF";
                newData.push({ title, value, percentage, strokeColor, trailColor });
            }
        }
        return newData;
    };
    useState(() => {
        if (data) {
            const newData = convertData();
            setReadingPerformances(newData);
        }
    }, [data]);
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] ">
            {/* cards  */}
            <h3 className="font-medium text-[21px] text-[#4399FF] text-center mb-2.5">
                Reading
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                {/* card 1  */}
                {readingPerformances?.map((reading, index) => (<CircularProgressWidget key={index} data={reading} />))}
            </div>
        </div>
    )
}

export default Reading
