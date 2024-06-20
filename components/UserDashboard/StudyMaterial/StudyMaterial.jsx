import React from 'react'
import { BiBookAlt } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsMic, BsBook } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
const studyMaterials = [
    {
        bgcolor: "#00B4D8",
        name: "Template",
        icon: <BiBookAlt className="h-10 w-10" />
    },
    {
        bgcolor: "#949494",
        name: "Prediction",
        icon: <RxDashboard className="h-10 w-10" />
    },
    {
        bgcolor: "#F44141",
        name: "Mocktest",
        icon: <BsMic className="h-10 w-10" />
    },
    {
        bgcolor: "#3EC70B",
        name: "Compatibility",
        icon: <FiMonitor className="h-10 w-10" />
    },
    {
        bgcolor: "#2D46B9",
        name: "Study Material",
        icon: <BsBook className="h-10 w-10" />
    }

]

const StudyMaterial = () => {
    return (
        <div className='my-20'>
            <h2 className="text-4xl font-normal mb-3 capitalize">study material</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {/* card  */}
                {studyMaterials?.map((item, index) => (<div
                    key={index}
                    style={{ backgroundColor: item.bgcolor }}
                    className={`bg-[#F2B277] text-white flex flex-col h-[97px] w-full rounded-[10px] p-[12px] justify-center items-center`}
                >
                    <p className="capitalize text-[21px] pb-1">{item.name}</p>
                    <div className="flex justify-center items-center ">{item.icon}</div>
                </div>))}

            </div>
        </div>
    )
}

export default StudyMaterial
