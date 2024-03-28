import { Accordion } from '../../components/accordion/Accordion';
import { Header } from '../../components/header/Headerbar';
import { StyledGeneratePage, StyledBouquetImage } from './StyledGeneratePage';
import { useEffect, useState } from 'react';
import { MakeModal } from '../../components/modal/makeModal/MakeModal';
import { FlowerListModal } from '../../components/modal/flowerModal/FlowerListModal';
import { bouquetStore } from '../../stores/bouquetStore';
import CustomButton from '../../components/button/CustomButton';
import { postRegenerateInputs } from '../../api/bouquetReCreate.ts';
import setupSSE from '../../utils/sse.ts';
type FlowerDto = {
	flowerId: number;
	name: string;
	color: string;
	meaning: string;
	imgUrl: string;
};

export const GeneratePage = () => {
	const { bouquetUrl, usedFlower, recommendByMeaning, allFlowers, setBouquetData, recommendByPopularity } =
		bouquetStore.getState();
	const [isMakeModalOpened, setIsMakeModalOpened] = useState(false);
	const [isListModalOpened, setIsListModalOpened] = useState(false);
	// 확인 모달, 꽃 전체 리스트 모달 여부
	const [isLoading, setIsLoading] = useState(true);

	const [uf, setUf] = useState<FlowerDto[]>([]);
	const [usedFlowerIndexs, setUsedFlowerIndexs] = useState<number[]>([]);
	const [selectIdByIndex, setSelectIdByIndex] = useState<number[]>([]);
	const [userSelectIndex, setUserSelectIndex] = useState<number>(-1);
	const [userSelectId, setUserSelectId] = useState<number>(-1);
	const [isUsed, setIsUsed] = useState<boolean[]>([true, true, true]);
	// 유저가 선택한 각 꽃 별 추가 꽃
	// 선택한 꽃의 위치(0, 1, 2)
	// 유저가 선택한 꽃의 id

	const html = document.querySelector('html');

	useEffect(() => {
		setupSSE({
			onOpen: () => setIsLoading(true),
			onDataReceived: (data) => {
				setBouquetData(data);
				setIsLoading(false);
			},
			onError: () => setIsLoading(false),
		});

		return () => {};
	}, []);

	useEffect(() => {
		const unsubscribe = bouquetStore.subscribe((usedFlowerState) => {
			// bouquetStore의 usedFlower 값이 변경될 때마다 호출
			setUsedFlowerIndexs(usedFlowerState.usedFlower.map((flower) => flower));
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
	}, [usedFlowerIndexs]);
	// 사용된 꽃 목록 추출

	const flowersByMeaning = recommendByMeaning
		.map((id) => {
			return allFlowers.find((flower) => flower.flowerId === id);
		})
		.filter((flower) => flower !== undefined) as FlowerDto[];
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
		const inputs = usedFlowerIndexs
			.map((index, i) => {
				const flower = allFlowers.find((flower) => flower.flowerId === index);
				return flower && isUsed[i] ? flower.name : undefined;
			})
			.filter((name) => name !== undefined) as string[];

		// 사용한 꽃 이름만 추출

		await postRegenerateInputs(inputs);
	};

	const setUsedState = (index: number, state: boolean) => {
		const newState = [...isUsed];
		newState[index] = state;
		setIsUsed(newState.map((state) => state));
	}; // 꽃의 사용 여부를 체크 -> 삭제한 경우에는 추출하지 않기 위함

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<>
			<StyledGeneratePage>
				{/* 로그인 헤더 */}
				<Header link='https://src.hidoc.co.kr/image/lib/2022/11/15/1668491763670_0.jpg'></Header>
				<StyledBouquetImage src={bouquetUrl} alt='img'></StyledBouquetImage>
				{/* 최초 추천 꽃 + 변경 추천 꽃 */}
				{uf.map((item, index) => {
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
							openListModal={(e) => openListModal(e, index)}
							changeFlower={changeFlower}
							setUsedState={setUsedState}
						></Accordion>
					);
				})}
				<div style={{ marginBottom: '2vh' }}>
					<CustomButton $check={true} onClick={openModal}>
						확인
					</CustomButton>
					<CustomButton onClick={handleSubmit}>재생성</CustomButton>
				</div>
			</StyledGeneratePage>

			{/* 완성 확인 모달 */}
			{isMakeModalOpened && <MakeModal closeModal={closeModal}></MakeModal>}
			{/* 꽃 전체 리스트 모달 */}
			{isListModalOpened && (
				<FlowerListModal CloseListModal={CloseListModal} selectUserFlower={selectUserFlower}></FlowerListModal>
			)}
		</>
	);
};
