import {useEffect, useState} from 'react';
import { bouquetStore } from '../../stores/bouquetStore';
import setupSSE from "../../utils/sse.ts";
import {discon} from "../../api/discon.ts";
import {postRegenerateInputs} from "../../api/bouquetReCreate.ts";
import {useLocalAxios} from "../../utils/axios.ts";

export const GenerateTestPage = () => {
    const {bouquetUrl,usedFlower, recommendByMeaning, allFlowers, setBouquetData, setBouquetUrl} = bouquetStore();
    const [isLoading, setIsLoading] = useState(true);
    const axiosInstance = useLocalAxios(true);


	useEffect(() => {
		setupSSE({
			onOpen: () => {
				console.log('SSE 연결이 열림');
			},
			onError: (error) => {
				console.error('SSE 에러 발생', error);
			},
			events: {
				firstGenerateEvent: (data) => {
					setBouquetData(data);
					console.log('첫 번째 생성 이벤트 데이터 처리', data);
				},
				reGenerateEvent: (data) => {
					setBouquetData(data);
					console.log('재생성 이벤트 데이터 처리', data);
				},
				middleImageSendEvent: (data) => {
					setBouquetUrl(data)
					console.log(data)
				}
			}
		});

        return () => {
        };
    }, []);
    useEffect(() => {
        console.log("갱신된 store usedFlower:", usedFlower);
        console.log("rec:", recommendByMeaning);
        console.log("allFlower ", allFlowers);
    }, [usedFlower,allFlowers,recommendByMeaning]);
    const handleSubmit = async () => {
        const inputs: string[] = ['빨강 장미', '수국', '백합'];
        await postRegenerateInputs(inputs, axiosInstance);
    };
    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <>
            <div>
                <img src={bouquetUrl} alt=""/>
                <button onClick={discon}>연결해제</button>
                <button onClick={handleSubmit}>재생성</button>
            </div>
        </>
    );
};
