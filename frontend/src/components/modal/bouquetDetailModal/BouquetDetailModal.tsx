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

interface ModalProps {
	closeModal: () => void;
	$flowers: Bouquet;
}

export const BouquetDetailModal = ({ closeModal, $flowers }: ModalProps) => {
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
								{$flowers.whom} - {$flowers.situation}
							</StyledName>
							<StyledMeaning $marginLeft='6vw' $marginRight='6vw' $marginTop='0.5vh'>
								{' '}
								{'ㆍ'} {$flowers.message}{' '}
							</StyledMeaning>
						</TextAlign>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
