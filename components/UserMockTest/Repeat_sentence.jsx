import React from 'react'
import RecordBlock from './RecordBlock'

const Repeat_sentence = () => {
    return (
        <div>
            <p className='py-2 font-medium'>You will hear a sentence. Please repeat the sentence
                exactly as you hear it. You will hear the sentence only once.
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

export default Repeat_sentence
