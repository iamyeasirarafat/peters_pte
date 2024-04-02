import React from 'react'
import RecordBlock from './RecordBlock'

const Answer_short_question = () => {
    return (
        <div>
            <p className='py-2 font-medium'>You will hear a question. Please give a simple and short answer
            . Often just one or a few words is enough.
            </p>

            {/* audio player  */}
            <div className='py-2 '>
                <audio controls>
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
    )
}

export default Answer_short_question
