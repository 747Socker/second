import { Accordion } from '../../components/accordion/Accordion';
import { Header } from '../../components/header/Headerbar';
import { StyledGeneratePage, StyledBouquetImage } from './StyledGeneratePage';
import { useEffect, useState } from 'react';
import { MakeModal } from '../../components/modal/makeModal/MakeModal';
import { FlowerListModal } from '../../components/modal/flowerModal/FlowerListModal';
import { bouquetStore } from '../../stores/bouquetStore';
import CustomButton from '../../components/button/CustomButton';
import { postRegenerateInputs } from '../../api/bouquetReCreate.ts'
import setupSSE from "../../utils/sse.ts";
import {useLocalAxios} from "../../utils/axios.ts";
import {useLocation} from "react-router-dom";
import white from '../../assets/images/white.jpg';

type FlowerDto = {
	flowerId: number;
	name: string;
	color: string;
	meaning: string;
	imgUrl: string;
};
interface SSEEventCallback {
	(data: any): void;
}

interface SSECallbacks {
	onOpen?: () => void;
	onError?: (error: Event) => void;
	events?: {
		[eventType: string]: SSEEventCallback;
	};
}


export const GeneratePage = () => {
	const { bouquetUrl, usedFlower, recommendByMeaning, allFlowers, setBouquetData, setBouquetUrl } = bouquetStore();
	const [isMakeModalOpened, setIsMakeModalOpened] = useState(false);
	const [isListModalOpened, setIsListModalOpened] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const axiosInstance = useLocalAxios(true);
	// 확인 모달, 꽃 전체 리스트 모달 여부

	//const [bouquetImg, setBouquetImg] = useState("")
	const [uf, setUf] = useState<FlowerDto[]>([]);
	const [usedFlowerIndexs, setUsedFlowerIndexs] = useState<number[]>([]);
	const [flowersByMeaning, setFlowersByMeaning] = useState<FlowerDto[]>([]);
	const [selectIdByIndex, setSelectIdByIndex] = useState<number[]>([]);
	const [userSelectIndex, setUserSelectIndex] = useState<number>(-1);
	const [userSelectId, setUserSelectId] = useState<number>(-1);
	const [isUsed, setIsUsed] = useState<boolean[]>([true, true, true]);
	const [isMaking, setIsMaking] = useState<boolean>(false);
	const [regeneCounter, setRegeneCounter] = useState<number>(0);
	// 유저가 선택한 각 꽃 별 추가 꽃
	// 선택한 꽃의 위치(0, 1, 2)
	// 유저가 선택한 꽃의 id

	const html = document.querySelector('html');
	const location = useLocation();
	const { requestId } = location.state;
	useEffect(() => {
		console.log("useEffect");
		console.log(requestId);
		if (requestId) {
			setIsMaking(true);
			console.log("if");
			setupSSE(requestId, {
				onOpen: () => {				
					console.log('SSE 연결이 열림');
				},
				onError: (error: Event) => {
					console.error('SSE 에러 발생', error);
				},
				events: {
					firstGenerateEvent: (data: any) => { // data 타입을 any로 지정, 더 구체적인 타입이 있다면 변경 가능
						setBouquetData(data);
						console.log('첫 번째 생성 이벤트 데이터 처리', data);
						setIsMaking(false);
					},
					reGenerateEvent: (data: any) => { // data 타입을 any로 지정
						setBouquetData(data);
						console.log('재생성 이벤트 데이터 처리', data);
						setIsMaking(false);
					},
					middleImageSendEvent: (data: any) => { // data 타입을 any로 지정
						setBouquetUrl(data);
						console.log('중간 이미지 전송 이벤트 데이터 처리', data);
						setIsMaking(false);
					}
				}
			});
			return () => {
				setIsMaking(false);
			};	
		}
	}, [requestId]);

	useEffect(() => {
		const unsubscribe = bouquetStore.subscribe((usedFlowerState) => {
			// bouquetStore의 usedFlower 값이 변경될 때마다 호출

			const limitedUsedFlower = usedFlowerState.usedFlower.slice(0, 3);
			setUsedFlowerIndexs(limitedUsedFlower.map((flower) => flower));
		});
		setSelectIdByIndex(new Array(usedFlower.length).fill(-1));
		setIsUsed(Array.from({ length: usedFlower.length }, () => true));

		return unsubscribe;
	}, [usedFlower]);

	useEffect(() => {
		const extractFlower = usedFlowerIndexs
			.map((index) => allFlowers.find((flower) => flower.flowerId === index))
			.filter((flower) => flower !== undefined) as FlowerDto[];
		setUf(extractFlower);
		// 사용된 꽃 목록 추출
	}, [usedFlowerIndexs]);

	useEffect(() => {
		const extractByMeaning = recommendByMeaning
			.map((id) => {
				return allFlowers.find((flower) => flower.flowerId === id);
			})
			.filter((flower) => flower !== undefined) as FlowerDto[];

		setFlowersByMeaning(extractByMeaning);
	}, [usedFlowerIndexs]);
	// 꽃말로 추천할 목록 추출

	const openModal = () => {
		setIsMakeModalOpened(true);
		html?.classList.add('scroll-locked');
	}; // 확인 모달 열기

	const closeModal = () => {
		setIsMakeModalOpened(false);
		html?.classList.remove('scroll-locked');
	}; // 확인 모달 닫기

	const openListModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
		setIsListModalOpened(true);
		setUserSelectIndex(index);
		e.stopPropagation();
		html?.classList.add('scroll-locked');
	}; // 꽃 전체 리스트 모달 열기

	const CloseListModal = () => {
		setIsListModalOpened(false);
		html?.classList.remove('scroll-locked');
	}; // 꽃 전체 리스트 모달 닫기

	useEffect(() => {
		if (userSelectId !== -1 && userSelectIndex !== -1) {
			const newState = [...selectIdByIndex];
			newState[userSelectIndex] = userSelectId;
			setSelectIdByIndex(newState.map((id) => id));

			setUserSelectId(-1);
			setUserSelectIndex(-1);
		}
	}, [userSelectId, userSelectIndex]);
	// 새로 꽃을 추가했다면, 그 값을 저장하고
	// 임시 변수는 초기화

	const changeFlower = (index: number, newFlower: number) => {
		const newState = [...usedFlowerIndexs];
		newState[index] = newFlower;
		setUsedFlowerIndexs(newState.map((flower) => flower));
	}; // 기본 추천 꽃과 새로운 추천 꽃의 위치를 바꿀 때

	const selectUserFlower = (id: number) => {
		setUserSelectId(id);
	}; // 추가하려는 꽃의 id

	const handleSubmit = async () => {
		setIsMaking(true);
		if(regeneCounter === 2) alert('마지막 재생성입니다.')
		setRegeneCounter(regeneCounter + 1);

		const inputs = usedFlowerIndexs
			.map((index, i) => {
				const flower = allFlowers.find((flower) => flower.flowerId === index);
				return flower && isUsed[i] ? flower.name : undefined;
			})
			.filter((name) => name !== undefined) as string[];
		// 사용한 꽃 이름만 추출

		await postRegenerateInputs(inputs, axiosInstance);
	};

	const setUsedState = (index: number, state: boolean) => {
		const newState = [...isUsed];
		newState[index] = state;
		setIsUsed(newState.map((state) => state));
	}; // 꽃의 사용 여부를 체크 -> 삭제한 경우에는 추출하지 않기 위함

	const deleteAddedFlower = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
		const newState = [...selectIdByIndex];
		newState[index] = -1;
		setSelectIdByIndex(newState.map((state) => state));
		e.stopPropagation();
	};

	const onErrorImg = (e: any) => {
		e.target.src = white;
	}; // 이미지 깨짐 대용 이미지

	return (
		<>
			<StyledGeneratePage>
				{/* 로그인 헤더 */}
				<Header></Header>
				<StyledBouquetImage src={bouquetUrl} onError={onErrorImg}></StyledBouquetImage>
				{/* 최초 추천 꽃 + 변경 추천 꽃 */}
				{!isMaking && uf.map((item, index) => {
					return (
						<Accordion
							key={index}
							$bouquetUrl={uf[index].imgUrl}
							$index={index}
							$name={uf[index].name}
							$meaning={uf[index].meaning.split(',').map((item) => item.trim())}
							$color={uf[index].color}
							$recommendByMeaning={flowersByMeaning[index]}
							$userSelectId={selectIdByIndex[index]}
							$empty={!isUsed[index]}
							openListModal={(e) => openListModal(e, index)}
							changeFlower={changeFlower}
							setUsedState={setUsedState}
							deleteAddedFlower={(e) => deleteAddedFlower(e, index)}
						></Accordion>
					);
				})}
				{!isMaking && (
					<div style={{ marginBottom: '2vh' }}>
						<CustomButton $check={true} onClick={openModal}>
							확인
						</CustomButton>
						{regeneCounter < 3 && <CustomButton onClick={handleSubmit}>재생성</CustomButton>}
					</div>
				)}
				{isMaking && (
					<div style={{ marginBottom: '2vh' }}>
						<CustomButton $check={true}>생성 중...</CustomButton>
					</div>
				)}
			</StyledGeneratePage>

			{/* 완성 확인 모달 */}
			{isMakeModalOpened && <MakeModal closeModal={closeModal} axiosInstance={axiosInstance}></MakeModal>}
			{/* 꽃 전체 리스트 모달 */}
			{isListModalOpened && (
				<FlowerListModal CloseListModal={CloseListModal} selectUserFlower={selectUserFlower}></FlowerListModal>
			)}
		</>
	);
};
