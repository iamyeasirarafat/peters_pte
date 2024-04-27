import React from 'react'
import RecordBlock from './RecordBlock'
import ImgBlock from '../global/ImgBlock'

const Retell_lecture = () => {
    return (
        <div>
           

            {/* Image block */}
            <div className='py-2 flex justify-between items-center gap-4'>
                
                <div className="w-1/2">
                    <p className='py-2 font-medium'>Look at the chart below. In 25 seconds, please speak into
                        the microphone and describe in detail what the chart is showing.
                        You will have 40 seconds to give your response.
                    </p>
                    <ImgBlock
                    // data={data}
                    />
                </div>
                <div className="w-1/2">
                    {/* audio player  */}
                        <div className='py-2 w-full'>
                            <audio controls className='w-full'>
                                <source src="horse.ogg" type="audio/ogg" />
                                <source src="horse.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    <RecordBlock
                    // data={data} 
                    // api={answerApi} 
                    // setReFetch={setReFetch} 
                    />
                </div>
            </div>




        </div>
    )
}

export default Retell_lecture
