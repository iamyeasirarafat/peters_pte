import React from 'react'
import RecordBlock from './RecordBlock'

const Read_aloud = () => {
    return (
        <div>
            <p className='py-2 font-medium'>Look at the text below. In 40 secounds, you must read this text aloud is naturally and
                clearly as possible. You have 40 seconds to read aloud.
            </p>

            <RecordBlock
            // data={data} 
            // api={answerApi} 
            // setReFetch={setReFetch} 
            />

            <p className='py-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum nisi,
                id dicta ab, explicabo modi expedita itaque tempora voluptate esse! Harum nesciunt
                alias, aliquam sed explicabo incidunt blanditiis consectetur facere id, perspiciatis
                mollitia. Soluta excepturi incidunt repellat natus numquam!
            </p>

        </div>
    )
}

export default Read_aloud
