import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaRegSave } from "react-icons/fa";
import { GrCaretNext } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md"
import { GrFormPrevious } from "react-icons/gr";

const MockTestLayout = ({ children, handleNext, handlePrev, handleFinish, isLastQuestion, progress }) => {
    return (
        <div className="flex flex-col m-5">
            {/* top header */}
            <div className="flex justify-between">
                <p className="text-xl font-normal">Scored Test D (2 hour)</p>
                <div className="flex justify-between items-center gap-4 text-sm">
                    <p>9 of 15</p>
                    <p className="flex justify-center items-center gap-2">
                        <CiClock2 /> 16:36 / 32:00
                    </p>
                    <button className="bg-gray-200 px-4 py-2 rounded">
                        <TfiMenuAlt size={20} />
                    </button>
                </div>
            </div>

            {/* progress bar */}
            <div className="flex justify-center items-center mt-3">
                <div className="relative bg-gray/30 h-1.5 w-full">
                    <div style={{ width: `${progress}%` }} className={`absolute left-0 top-0 bg-cyan-700 h-1.5 `} />
                </div>
            </div>



            {/* wrapper container */}
            <div className="h-[calc(100vh-210px)] py-2 overflow-y-auto">

                {children}

            </div>
            <div className="flex justify-between">
                <button className="bg-gray/70 hover:bg-gray/80 flex items-center gap-2 text-white px-4 py-2 rounded"><FaRegSave />Save and Exit</button>

                <div className='flex gap-2 items-center'>
                    <button onClick={handlePrev} className="bg-cyan-700 hover:bg-cyan-800 flex items-center gap-2 text-white px-4 py-2 rounded"><MdOutlineNavigateNext className="text-white rotate-180" /> Prev</button>
                    {
                        !isLastQuestion ? <button onClick={handleNext} className="bg-cyan-700 hover:bg-cyan-800 flex items-center gap-2 text-white px-4 py-2 rounded">Next <MdOutlineNavigateNext className="text-white" /></button> : <button onClick={handleFinish} className="bg-cyan-700 hover:bg-cyan-800 flex items-center gap-2 text-white px-4 py-2 rounded">Finish</button>
                    }
                </div>

            </div>
        </div>
    )
}

export default MockTestLayout
