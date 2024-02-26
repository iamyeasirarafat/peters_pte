import React from 'react'
import CircularProgressWidget from '../Cards/CircularProgressWidget'
const MocktestPerformances = [
    {
        title: "Reading:Fill in the Blanks",
        value: "5/112",
        percentage: "30",
        strokeColor: "#F44141",
        trailColor: "#FFF4EB"
    },
    {
        title: "Reading:Re-Order Paragraphs",
        value: "5/112",
        percentage: "30",
        strokeColor: "#F44141",
        trailColor: "#FFF4EB"
    },


]
const Mocktest = () => {
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] w-full ">
            <h3 className="font-medium text-[21px] text-[#F44141] text-center mb-2.5">
                Mocktest
            </h3>
            <div className='flex gap-2 flex-wrap justify-center'>
                {MocktestPerformances?.map((Mocktest, index) => (<CircularProgressWidget key={index} data={Mocktest} />))}
            </div>
        </div>
    )
}

export default Mocktest
