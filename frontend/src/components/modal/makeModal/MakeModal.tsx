import {
	StyledModalBackground,
	StyledModal,
	StyledCloseButton,
	CloseSpan,
	StyledBouquetImage,
	StyledConfirmInfo,
} from './StyledMakeModal';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../button/CustomButton';
import { bouquetStore } from '../../../stores/bouquetStore';
import { useEffect, useState } from 'react';

interface ModalProps {
	closeModal: () => void;
}

export const MakeModal = ({ closeModal }: ModalProps) => {
	const { bouquetUrl } = bouquetStore.getState();
	const [bouquetImg, setBouquetImg] = useState(bouquetUrl)
	
	useEffect(() => {
		console.log(bouquetUrl)
		setBouquetImg(bouquetUrl)
	}, [bouquetUrl])


	const navigate = useNavigate();

	const goToComplete = () => {
		closeModal()
		navigate('/complete');
	};

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
						<StyledBouquetImage
							src={bouquetImg}
							alt='img'
						></StyledBouquetImage>
						<CustomButton $check={true} onClick={goToComplete}>만들기</CustomButton>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
