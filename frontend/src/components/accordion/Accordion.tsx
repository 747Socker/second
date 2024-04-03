import { useState, useRef, useEffect } from 'react';
import { FlowerCard } from '../../components/flowers/FlowerCard';
import { AccordionSection, AccordionMenu, AccordionIcon, AccordionContent, AccordionText } from './StyledAccordion';
import { EmptyFlowerCard } from '../emptyFlower/EmptyFlowerCard';
import { bouquetStore } from '../../stores/bouquetStore';

interface FlowerDto {
	flowerId: number;
	name: string;
	color: string;
	meaning: string;
	imgUrl: string;
}

interface RecommendProps {
	$bouquetUrl: string; // 꽃다발 이미지 url
	$index: number; // 현재 꽃의 위치
	$name: string; // 꽃 이름
	$meaning: string[]; // 꽃말
	$color: string; // 꽃 색
	$recommendByMeaning: FlowerDto; // 꽃말에 의한 추천 꽃 목록
	$userSelectId: number; // 사용자가 바꾸고자 하는 꽃의 id
	$empty: boolean; // 현재 칸이 비었는지 여부
	openListModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	changeFlower: (index: number, newFlower: number) => void;
	setUsedState: (index: number, state: boolean) => void;
	deleteAddedFlower: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Accordion = ({
	$bouquetUrl,
	$index,
	$name,
	$meaning,
	$color,
	$recommendByMeaning,
	$userSelectId,
	$empty = false,
	openListModal,
	changeFlower,
	setUsedState,
	deleteAddedFlower,
}: RecommendProps) => {
	const { allFlowers, recommendByPopularity } = bouquetStore.getState();

	const [active, setActive] = useState(false); // 아코디언 활성 여부
	const [height, setHeight] = useState('0px'); // 아코디언 메뉴 높이
	const [empty, setEmpty] = useState($empty); // 아코디언 활성 여부
	const [clickIndex, setClickIndex] = useState<number>(-1); // 클릭 인덱스

	const [recommendIndexByColor, setRecommendIndexByColor] = useState<number>(0); // 색상에 의한 추천
	const [recommendIndexByPopularity, setRecommendIndexByPopularity] = useState<number>(0); // 인기에 의한 추천

	const content = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setHeight(active ? `${content.current?.scrollHeight}px` : '0px');
	}, [active]); // 활성 여부에 따라 높이 조정

	const toggleAccordion = () => {
		setActive(!active);

		if (active) {
			setClickIndex(-1);
		} else {
			setClickIndex($index);
		}
	}; // 활성 여부 변경

	const clickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setEmpty(true);
		setActive(false);
		setUsedState($index, false);
		e.stopPropagation();
	}; // 삭제버튼 클릭

	const clickAddFlower = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setEmpty(false);
		setUsedState($index, true);
		e.stopPropagation();
	}; // 추가버튼 클릭

	useEffect(() => {
		setEmpty(false);
	}, [$recommendByMeaning]);

	const meaningsByMeaning = $recommendByMeaning.meaning
		? $recommendByMeaning.meaning.split(',').map((item) => item.trim())
		: [];
	// 꽃말에 의한 추천, 꽃말만 추출 후 분리

	const flowersByColor = allFlowers.filter(
		(flower) => $color === flower.color && !($name === flower.name) && !(flower.name === $recommendByMeaning.name),
	);

	useEffect(() => {
		let randomIndex = Math.floor(Math.random() * flowersByColor.length);

		while (flowersByColor.length <= randomIndex) randomIndex = Math.floor(Math.random() * flowersByColor.length);
		setRecommendIndexByColor(randomIndex);
	}, []);
	// useEffect 사용 이유 : 최초 랜덤값 추출 이후, 랜덤값의 변화가 없어야해서

	const meaningsByColor =
		flowersByColor.length > recommendIndexByColor
			? flowersByColor[recommendIndexByColor].meaning.split(',').map((item) => item.trim())
			: [];
	// 색상이 같은 꽃들 추출, 같은 꽃이면 추천 안 받도록 하기
	// 색상에 의한 추천, 색상이 같은 꽃 중 랜덤으로 하나 추천
	// 이후 선정된 꽃의 꽃말 분리

	// 인기도에 의한 추천
	const flowersByPopularity = recommendByPopularity.length > 0 ? 
	allFlowers.filter(
		(flower) =>
			!(flower.name === $recommendByMeaning.name) &&
			flowersByColor.length > recommendIndexByColor &&
			!(flower.name === flowersByColor[recommendIndexByColor].name) &&
			!(flower.name === $name) &&
			recommendByPopularity.includes(flower.flowerId),
	) : []; // 꽃말에 의한 추천, 색에 의한 추천, 원래 꽃을 제외하고
	// 그 중에서 인기도에 의한 추천에 해당하는 꽃을 추출

	useEffect(() => {
		let randomIndex = Math.floor(Math.random() * flowersByPopularity.length);

		while (flowersByPopularity.length <= randomIndex)
			randomIndex = Math.floor(Math.random() * flowersByPopularity.length);
		setRecommendIndexByPopularity(randomIndex);
	}, []); // 인기도에 의한 추천 리스트 중 랜덤으로 하나 추천

	const meaningsByPopularity =
		flowersByPopularity.length > recommendIndexByPopularity && flowersByPopularity.length > 0
			? flowersByPopularity[recommendIndexByPopularity].meaning.split(',').map((item) => item.trim())
			: [];
	// 인기도에 의한 추천, 선정된 꽃의 꽃말 분리

	const flowersBySelect = allFlowers.filter((flower) => flower.flowerId === $userSelectId && $userSelectId !== -1);

	const toggleFlower = (index : number, flowerId : number) => {
		changeFlower(index, flowerId)
		toggleAccordion()
	} // 꽃 교체, 교체 시 아코디언도 닫히도록 설정

	return (
		<AccordionSection>
			<div className='accordion__section'>
				{/* 아코디언 상단 메뉴 */}
				{!empty && (
					<AccordionMenu className={`accordion ${active ? 'active' : ''}`} onClick={toggleAccordion}>
						{/* 메인 꽃 여부, 버튼 클릭 여부, 추천 꽃여부, 이름, 꽃말, 이미지 주소 */}
						<FlowerCard
							$bouquetUrl={$bouquetUrl}
							$isMain={$index === 0}
							$isSelected={active}
							$recommend={true}
							$name={$name}
							$meaning={$meaning}
							$isChoice={$index === clickIndex}
							clickDelete={(e) => clickDelete(e)}
						/>
						<AccordionIcon className={active ? 'rotate' : ''}>▶</AccordionIcon>
					</AccordionMenu>
				)}

				{/* 상단 메뉴이고, 삭제해서 현재 빈 칸인 경우 */}
				{empty && (
					<AccordionMenu>
						<EmptyFlowerCard $recommend={true} clickAddFlower={(e) => clickAddFlower(e)}></EmptyFlowerCard>
					</AccordionMenu>
				)}

				{/* 아코디언 collapse 메뉴 */}
				<AccordionContent ref={content} style={{ height: height }}>
					<AccordionText $marginLeft='2.5vw' $marginTop='2vh' $marginBottom='-2vh'>
						이 꽃은 어떠세요?
					</AccordionText>
					{/* 꽃말에 의한 추천 */}
					{Array.isArray($meaning) && $meaning.length > 0 && (
						<div onClick={() => toggleFlower($index, $recommendByMeaning.flowerId)}>
							<FlowerCard
								$bouquetUrl={$recommendByMeaning.imgUrl}
								$isMain={false}
								$name={$recommendByMeaning.name}
								$meaning={meaningsByMeaning}
								$isCollapse={true}
							/>
						</div>
					)}
					{/* 색상에 의한 추천 */}
					<div onClick={() => toggleFlower($index, flowersByColor[recommendIndexByColor].flowerId)}>
						{flowersByColor.length > recommendIndexByColor ? (
							<FlowerCard
								$bouquetUrl={flowersByColor[recommendIndexByColor].imgUrl}
								$isMain={false}
								$name={flowersByColor[recommendIndexByColor].name}
								$meaning={meaningsByColor}
								$isCollapse={true}
							/>
						) : (
							<div></div>
						)}
					</div>
					{/* 인기에 의한 추천 */}
					<div onClick={() => toggleFlower($index, flowersByPopularity[recommendIndexByPopularity].flowerId)}>
						{flowersByPopularity.length > recommendIndexByPopularity && flowersByPopularity.length > 0 &&
						(Array.isArray(recommendByPopularity) && recommendByPopularity.length > 0) ? (
							<FlowerCard 
								$bouquetUrl={flowersByPopularity[recommendIndexByPopularity].imgUrl}
								$isMain={false}
								$name={flowersByPopularity[recommendIndexByPopularity].name}
								$meaning={meaningsByPopularity}
								$isCollapse={true}
							/>
						) : (
							<div></div>
						)}
					</div>
					{/* 모든 꽃 리스트를 보는 버튼(공간) && 꽃 리스트애서 선택한 것이 있으면 보여주는 공간 */}
					{$userSelectId === undefined || $userSelectId === -1 ? (
						<EmptyFlowerCard $recommend={false} openListModal={openListModal}></EmptyFlowerCard>
					) : (
						<div onClick={() => toggleFlower($index, $userSelectId)}>
							<FlowerCard
								$bouquetUrl={flowersBySelect[0].imgUrl}
								$isMain={false}
								$userSelect={true}
								$name={flowersBySelect[0].name}
								$meaning={flowersBySelect[0].meaning.split(',').map((item) => item.trim())}
								$isCollapse={true}
								deleteAddedFlower={deleteAddedFlower}
							/>
						</div>
					)}
				</AccordionContent>
			</div>
		</AccordionSection>
	);
};
