import { useRouter } from 'next/router';
import React from 'react';
import ImgBlock from '../global/ImgBlock';
import RecordBlock from './RecordBlock';

const Describe_image = ({ data, aid }) => {
    const router = useRouter();
    const { mock_type, testId } = router?.query;
    const answerApi = `/mocktest/${mock_type?.split("_")?.[0]}/${testId}/answer/${aid}`;
    return (
        <div>
            <p className='py-2 font-medium'>Look at the chart below. In 25 seconds, please speak into
                the microphone and describe in detail what the chart is showing.
                You will have 40 seconds to give your response.
            </p>

            {/* Image block */}
            <div className='py-2 flex justify-between gap-4'>
                <div className="w-1/2">
                    <ImgBlock
                        data={data}
                    />
                </div>
                <div className="w-1/2">
                    <RecordBlock
                        data={data}
                        api={answerApi}
                    // setReFetch={setReFetch} 
                    />
                </div>
            </div>




        </div>
    )
}

export default Describe_image
