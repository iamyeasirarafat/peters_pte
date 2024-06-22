import React, { useState } from 'react'
import CircularProgressWidget from '../Cards/CircularProgressWidget'

const speakingPerformances = [
    {
        title: "Re-Tell Lecture",
        value: "5/112",
        percentage: "30",
        strokeColor: "#FF8412",
        trailColor: "#F4D1B1"
    },
    {
        title: "Answer Short Question",
        value: "5/112",
        percentage: "30",
        strokeColor: "#FF8412",
        trailColor: "#F4D1B1"
    },
    {
        title: "Read Aloud",
        value: "5/112",
        percentage: "30",
        strokeColor: "#FF8412",
        trailColor: "#F4D1B1"
    },
    {
        title: "Describe Image",
        value: "5/112",
        percentage: "30",
        strokeColor: "#FF8412",
        trailColor: "#F4D1B1"
    },
    {
        title: "Repeat Sentence",
        value: "5/112",
        percentage: "30",
        strokeColor: "#FF8412",
        trailColor: "#F4D1B1"
    },

]
const Speaking = ({ data }) => {
    const [speakingPerformances, setSpeakingPerformances] = useState([])
    const convertData = () => {
        const newData = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                const title = `${key.charAt(0).toUpperCase()}${key.slice(1).replace(/_/g, " ")}`;
                const value = `${item.practices}/${item.total}`;
                const percentage = `${item.percentage}`;
                const strokeColor = "#FF8D29";
                const trailColor = "#949494";
                newData.push({ title, value, percentage, strokeColor, trailColor });
            }
        }
        return newData;
    };
    useState(() => {
        if (data) {
            const newData = convertData();
            setSpeakingPerformances(newData);
        }
    }, [data]);

    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] ">
            {/* cards  */}
            <h3 className="font-medium text-[21px] text-lightGray text-center mb-2.5">
                Speaking
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                {/* card 1  */}
                {speakingPerformances?.map((speakingp, index) => (<CircularProgressWidget key={index} data={speakingp} />))}
            </div>
        </div>
    )
}

export default Speaking
