import React from 'react'
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
const Writing = () => {
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
            <h3 className="font-medium text-[21px] text-[#F2B277] text-center mb-2.5">
                Writing
            </h3>
            <div className='flex gap-2 flex-wrap justify-center'>
                {WritingPerformances?.map((Writing, index) => (<CircularProgressWidget key={index} data={Writing} />))}
            </div>
        </div>
    )
}

export default Writing
