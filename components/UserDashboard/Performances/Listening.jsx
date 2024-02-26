import React from 'react'
import CircularProgressWidget from '../Cards/CircularProgressWidget'
const ListeningPerformances = [
    {
        title: "Highlight Correct Summary",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Multiple Choice, Multiple Answers",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Summarize Spoken Text",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Multiple Choice,  Answers",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Fill in the Blanks",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Highlight Incorrect Words",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Select Missing Word",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    },
    {
        title: "Write from Dictation",
        value: "5/112",
        percentage: "30",
        strokeColor: "#949494",
        trailColor: "#F4D1B1"
    }
]
function Listening() {
    return (
        <div className="bg-white rounded-[10px] h-full p-[15px] ">
            {/* cards  */}
            <h3 className="font-medium text-[21px] text-[#949494] text-center mb-2.5">
                Listening
            </h3>
            <div className='flex gap-2 flex-wrap justify-center'>
                {/* card 1  */}
                {ListeningPerformances?.map((Listening, index) => (<CircularProgressWidget key={index} data={Listening} />))}
            </div>
        </div>
    )
}

export default Listening
