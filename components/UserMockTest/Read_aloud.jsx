import { useRouter } from 'next/router';
import React from 'react';
import RecordBlock from './RecordBlock';

const Read_aloud = ({ question, aid }) => {
    const router = useRouter();
    const { mock_type, testId } = router?.query;
    console.log("question", question);
    const answerApi = `/mocktest/${mock_type?.split("_")?.[0]}/${testId}/answer/${aid}`;
    return (
        <div>
            <p className='py-2 font-medium'>Look at the text below. In 40 secounds, you must read this text aloud is naturally and
                clearly as possible. You have 40 seconds to read aloud.
            </p>
            <p className='py-4'>
                {question.content || question.question}
            </p>
            <RecordBlock
                data={question}
                api={answerApi}
            // setReFetch={setReFetch} 
            />



        </div>
    )
}

export default Read_aloud
