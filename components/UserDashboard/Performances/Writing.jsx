import React, { useState } from 'react'
import CircularProgressWidget from '../Cards/CircularProgressWidget'
const WritingPerformances = [
    {
        title: "Reading:Fill in the Blanks",
        value: "5/112",
        percentage: "30",
        strokeColor: "#F2B277",
        trailColor: "#F4D1B1"
    },
    {
        title: "Reading:Re-Order Paragraphs",
        value: "5/112",
        percentage: "30",
        strokeColor: "#F2B277",
        trailColor: "#F4D1B1"
    },


]
const Writing = ({ data }) => {
    const [writingPerformances, setWritingPerformances] = useState([])
    const convertData = () => {
        const newData = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                const title = `${key.charAt(0).toUpperCase()}${key.slice(1).replace(/_/g, " ")}`;
                const value = `${item.practices}/${item.total}`;
                const percentage = `${item.percentage}`;
                const strokeColor = "#F2B277";
                const trailColor = "#F4D1B1";
                newData.push({ title, value, percentage, strokeColor, trailColor });
            }
        }
        return newData;
    };
    useState(() => {
        if (data) {
            const newData = convertData();
            setWritingPerformances(newData);
        }
    }, [data]);
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
            <h3 className="font-medium text-[21px] text-[#F2B277] text-center mb-2.5">
                Writing
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {writingPerformances?.map((Writing, index) => (<CircularProgressWidget key={index} data={Writing} />))}
            </div>
        </div>
    )
}

export default Writing
