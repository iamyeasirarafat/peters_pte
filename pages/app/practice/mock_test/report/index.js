import React from 'react'
import DashboardLayout from '../../../layout'
import { FaUber } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'

const index = () => {
  return (
    <DashboardLayout>
    <div className="flex flex-col justify-between bg-primary">
      {/* top section */}
      <div className="flex flex-col gap-8  pl-10 pt-5 pb-1">
        <p className="text-xl font-medium text-white">
          <span className="text-3xl ">Logo</span> | PTE Academic | Score Report
        </p>
        <p className="text-sm text-gray">
          <span className="font-medium ">Score Report Code :</span>{" "}
          1234567890qwdf
        </p>
      </div>

      {/* user info section */}
      <div className="px-10 pt-7 flex justify-between pb-10 bg-white">
        <div className="flex gap-8">
          <div className="w-28 h-36 bg-primary/40 flex justify-center items-center"><FaUser className='h-20 w-20 text-gray' /></div>
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-2">Ali Muhammad</p>
            <p className="text-sm">Test Taker ID: 12345678</p>
            <p className="text-sm">Registration ID: 12345678</p>
          </div>
        </div>
        <div className=" bg-purple-900/70 w-30 h-30 flex flex-col overflow-hidden rounded-br-full rounded-bl-full rounded-tr-md rounded-tl-md">
            <p className="w-full text-lg font-medium text-center text-white bg-primary ">Overall Score</p>
            <div className=' h-full flex justify-center items-center '>
            <p className="text-4xl text-white font-semibold">57</p>
            </div>
        </div>
      </div>

      {/* communicative skill section */}
      <div className="bg-white px-10">
        <p className="text-xl font-semibold text-neutral-600 mb-1">
          Communicative Skill
        </p>
        <hr className="border border-neutral-400" />
        <div className="flex justify-evenly my-5">
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-blue-950 rounded-full font-semibold text-2xl">
              <p className="p-7">51</p>
            </div>
            <p className="mt-2 text-neutral-600">Listening</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-yellow-500 rounded-full font-semibold text-2xl">
              <p className="p-7">60</p>
            </div>
            <p className="mt-2 text-neutral-600">Reading</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-neutral-600 rounded-full font-semibold text-2xl">
              <p className="p-7">68</p>
            </div>
            <p className="mt-2 text-neutral-600">Speaking</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-fuchsia-700 rounded-full font-semibold text-2xl">
              <p className="p-7">53</p>
            </div>
            <p className="mt-2 text-neutral-600">Writing</p>
          </div>
        </div>
      </div>

      {/* Skill breakdown and candidate info section */}
      <div className="flex bg-white gap-16 w-full p-10">
        {/* skills breakdown */}
        <div className="relative w-3/5">
          <p className="text-xl font-semibold text-neutral-600 mb-1">
            Skills Breakdown
          </p>
          <hr className="border border-neutral-400" />
          <div className="absolute top-12 right-40">
            <p className="text-slate-500 font-semibold">57 Overall</p>
            <div className="w-2 h-44 bg-slate-500"></div>
          </div>
          <div className="flex justify-center mb-5 mt-16 gap-3">
            <div className="flex flex-col gap-2 justify-start items-end">
              <p className="text-sm text-neutral-600 h-7">Listening</p>
              <p className="text-sm text-neutral-600 h-7">Speaking</p>
              <p className="text-sm text-neutral-600 h-7">Reading</p>
              <p className="text-sm text-neutral-600 h-7">Writing</p>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <p className="text-blue-700 font-semibold h-7">51</p>
              <p className="text-blue-700 font-semibold h-7">60</p>
              <p className="text-blue-700 font-semibold h-7">68</p>
              <p className="text-blue-700 font-semibold h-7">53</p>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="w-28 h-7 bg-blue-950"></div>
              <div className="w-36 h-7 bg-yellow-500"></div>
              <div className="w-44 h-7 bg-neutral-600"></div>
              <div className="w-32 h-7 bg-fuchsia-700"></div>
            </div>
          </div>
        </div>

        {/* candidate information */}
        <div className="w-2/5">
          <p className="text-xl font-semibold text-neutral-600 mb-1">
            Candidate Information
          </p>
          <hr className="border border-neutral-400" />
          <div className="my-5">
            <div>
              <p className="text-neutral-700">
                <span className="font-semibold">Date of Birth: </span>
                29 Nov 1997
              </p>
              <p className="text-neutral-700">
                <span className="font-semibold">Gender: </span>
                Male
              </p>
              <p className="text-neutral-700">
                <span className="font-semibold">Country of Citizenship: </span>
                Bangladesh
              </p>
              <p className="text-neutral-700">
                <span className="font-semibold">Country of Residence: </span>
                Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Test Centre Information */}
      <div className="bg-white px-10">
        <p className="text-xl font-semibold text-neutral-600 mb-1">
          Test Centre Information
        </p>
        <hr className="border border-neutral-400" />
        <div className="flex justify-around my-5">
          <div>
            <p className="text-neutral-700">
              <span className="font-semibold">Test Centre Country: </span>
              Bangladesh
            </p>
            <p className="text-neutral-700">
              <span className="font-semibold">Test Centre ID: </span>
              58964
            </p>
            <p className="text-neutral-700">
              <span className="font-semibold">Test Centre: </span>
              Daffodil International University
            </p>
          </div>
          <div>
            <p className="text-neutral-700">
              <span className="font-semibold">Test Date: </span>
              16 Nov 2023
            </p>
            <p className="text-neutral-700">
              <span className="font-semibold">Valid Until: </span>
              16 Nov 2025
            </p>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default index