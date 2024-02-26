import React from 'react'
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
const Speaking = () => {
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] ">
            {/* cards  */}
            <h3 className="font-medium text-[21px] text-[#FF8412] text-center mb-2.5">
                Speaking
            </h3>
            <div className='grid grid-cols-5 gap-1'>
                {/* card 1  */}
                {speakingPerformances?.map((speakingp, index) => (<CircularProgressWidget key={index} data={speakingp} />))}
            </div>
        </div>
    )
}

export default Speaking
