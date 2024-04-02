import {
	StyledModalBackground,
	StyledModal,
	StyledCloseButton,
	CloseSpan,
	StyledConfirmInfo,
	TextAlign,
	StyledName,
	StyledMeaning,
} from './StyledBouquetDetailModal';
import { Bouquet } from '../../../types/BouquetList';
import { bouquetStore } from '../../../stores/bouquetStore';

interface ModalProps {
	closeModal: () => void;
	$flowers: Bouquet;
}

export const BouquetDetailModal = ({ closeModal, $flowers }: ModalProps) => {
	const { allFlowers } = bouquetStore();

	const tempFlowers = [
    {"flowerId": 1, "name": "빨강 장미"},
    {"flowerId": 2, "name": "하양 장미"},
    {"flowerId": 3, "name": "분홍 장미"},
    {"flowerId": 4, "name": "빨강 튤립"},
    {"flowerId": 5, "name": "노랑 튤립"},
    {"flowerId": 6, "name": "보라 튤립"},
    {"flowerId": 7, "name": "안개꽃"},
    {"flowerId": 8, "name": "아이리스"},
    {"flowerId": 9, "name": "백합"},
    {"flowerId": 10, "name": "빨강 카네이션"},
    {"flowerId": 11, "name": "분홍 카네이션"},
    {"flowerId": 12, "name": "수국"},
    {"flowerId": 13, "name": "거베라"},
    {"flowerId": 14, "name": "라벤더"},
    {"flowerId": 15, "name": "히아신스"},
    {"flowerId": 16, "name": "해바라기"}
] // allFlowers가 없을 때 추출용

	const extractedFlowers = allFlowers.length > 0 ? allFlowers.filter((flower) => $flowers.flowerId.includes(flower.flowerId))
	: tempFlowers.filter((flower) => $flowers.flowerId.includes(flower.flowerId));

	return (
		<>
			{/* 모달 */}
			<StyledModalBackground onClick={() => closeModal()}>
				<StyledModal onClick={(e) => e.stopPropagation()}>
					{/* 닫기 버튼 영역 */}
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<StyledCloseButton onClick={() => closeModal()}>
							<CloseSpan className='material-symbols-outlined'>close</CloseSpan>
						</StyledCloseButton>
					</div>
					{/* 그 외 영역 */}
					<StyledConfirmInfo>
						<TextAlign $align='left'>
							<StyledName $marginLeft='5vw' $marginRight='5vw' $marginTop='0.8vh'>
								{'Dear.'} {$flowers.whom}
							</StyledName>
							<StyledName $marginLeft='5vw' $marginRight='5vw' $marginTop='0.8vh'>
								{$flowers.situation}
							</StyledName>
							<StyledMeaning $marginLeft='6vw' $marginRight='6vw' $marginTop='0.5vh'>
								{' '}
								{'메시지 : '} {$flowers.message}{' '}
							</StyledMeaning>
							<br></br>
							<StyledName $marginLeft='5vw' $marginRight='5vw' $marginTop='0.8vh'>
								사용한 꽃
							</StyledName>
							{extractedFlowers.map((item, index) => (
								<StyledMeaning $marginLeft='6vw' $marginRight='6vw' $marginTop='0.5vh'>
									{' '}
									{'ㆍ'} {item.name}{' '}
								</StyledMeaning>
							))}
						</TextAlign>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
