import React from 'react'
import CircularProgressWidget from '../Cards/CircularProgressWidget'
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
function Reading() {
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
