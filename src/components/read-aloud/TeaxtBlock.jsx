import Image from "next/image";
import React from "react";

const TeaxtBlock = () => {
  return (
    <div className="border border-primary rounded-[15px] mt-6 ml-8 mr-5 pt-3 pb-4 px-5">
      <p className="text-xl">
        The bill calls for the establishment of the National Landslide Hazards
        Reduction Program within one year of becoming law. The program serves
        numerous functions, including to identify and understand landslide
        hazards and risks, reduce losses from landslides, protect communities at
        risk of landslides hazards, and improve communication and emergency
        preparedness.
      </p>
      {/*  */}
      <div className="mt-[40px] flex justify-end">
        <button className="w-[34px] h-[27px]">
          <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src="/icons/speker.svg"
              alt="grow icon"
              fill
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TeaxtBlock;
