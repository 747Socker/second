import {
	StyledModalBackground,
	StyledModal,
	StyledCloseButton,
	CloseSpan,
	StyledConfirmInfo,
	ColorButtonList,
	StyledScroll,
	StyledFixed,
	StyledClickArea,
} from './StyledFlowerListModal';
import { FlowerColor } from '../../flowerColorButton/FlowerColorButton';
import { FlowerCard } from '../../../components/flowers/FlowerCard';
import { useEffect, useRef, useState } from 'react';
import { bouquetStore } from '../../../stores/bouquetStore';
import CustomButton from '../../button/CustomButton';

interface RecommendProps {
	CloseListModal: () => void;
	selectUserFlower: (id : number) => void;
}

interface FlowerDto {
	flowerId: number;
	name: string;
	color: string;
	meaning: string;
	imgUrl: string;
}

export const FlowerListModal = ({ CloseListModal, selectUserFlower }: RecommendProps) => {
	const { allFlowers } = bouquetStore.getState();

	const fixedRef = useRef<HTMLDivElement>(null);
	const [fixedHeight, setFixedHeight] = useState<number>(0);

	const [clickIndex, setClickIndex] = useState<number>(-1);
	const [userFlowerId, setUserFlowerId] = useState<number>(-1);
	const [flowerList, setFlowerList] = useState<FlowerDto[]>(allFlowers);
	// 선택한 위치, 추가하려는 꽃의 id, 초기 시작은 전체 목록

	const colorList = ["White", "Yellow", "Blue", "Red", "Pink"]

	useEffect(() => {
		if (fixedRef.current) {
			setFixedHeight(fixedRef.current.offsetHeight);
		}
	}, []);

	const clickOnList = (index: number) => {
		setClickIndex(index);
	};

	const clickColorButton = (color : String) => {
		setFlowerList(allFlowers.filter(
			(flower) =>
				color === flower.color
		))
	} // 선택한 색 버튼에 해당하는 꽃만 추출

	const goToGenerate = (id : number) => {
		if(userFlowerId >= 0) {
			selectUserFlower(id)
			CloseListModal();
		} else {
			alert("꽃을 선택해주세요.")
		}
	}; // 선택한 꽃이 있을때만 선택 버튼 클릭이 가능
	// 그와 동시에 선택한 꽃의 id를 설정

	return (
		<>
			{/* 모달 */}
			<StyledModalBackground onClick={CloseListModal}>
				<StyledModal onClick={(e) => e.stopPropagation()}>
					{/* 닫기 버튼 영역 */}
					<div>
						<StyledCloseButton onClick={CloseListModal}>
							<CloseSpan className='material-symbols-outlined'>arrow_back_ios_new</CloseSpan>
						</StyledCloseButton>
					</div>
					{/* 그 외 영역 */}
					<StyledConfirmInfo $fixedHeight={fixedHeight}>
						{/* 카드 스크롤 영역 */}
						<StyledScroll>
							{flowerList.map(($item, index) => {
									const meanings = $item.meaning.split(',').map((item) => item.trim());
									// 꽃말에 의한 추천, 꽃말만 추출 후 분리
								return (
									<StyledClickArea
										key={index}
										onClick={() => {
											clickOnList(index)
											setUserFlowerId($item.flowerId)
										}}
										$isChoice={index === clickIndex}
									>
										<FlowerCard
											$bouquetUrl={$item.imgUrl}
											$isMain={true}
											$isSelected={false}
											$recommend={false}
											$name={$item.name}
											$meaning={meanings}
										/>
									</StyledClickArea>
								);
							})}
						</StyledScroll>
						{/* 색상 및 확인 버튼 영역 */}
						<StyledFixed ref={fixedRef}>
							{/* 색상 버튼 */}
							<ColorButtonList>
								<FlowerColor clickColorButton={() => clickColorButton("white")}></FlowerColor>
								<FlowerColor $fillColor='#FFE247' $strokeColor='none' clickColorButton={() => clickColorButton("yellow")}></FlowerColor>
								<FlowerColor $fillColor='#a725fd' $strokeColor='none' clickColorButton={() => clickColorButton("purple")}></FlowerColor>
								<FlowerColor $fillColor='#FF4141' $strokeColor='none' clickColorButton={() => clickColorButton("red")}></FlowerColor>
								<FlowerColor $fillColor='#E28AF1' $strokeColor='none' clickColorButton={() => clickColorButton("pink")}></FlowerColor>
							</ColorButtonList>
							{/* 선택 버튼 */}
							<div style={{ marginBottom: '2vh' }}>
								<CustomButton $check={true} onClick={() => goToGenerate(userFlowerId)}>
									선택
								</CustomButton>
							</div>
						</StyledFixed>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
