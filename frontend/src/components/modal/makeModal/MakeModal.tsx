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
import {AxiosInstance} from "axios";
import {postBouquetConfirm} from "../../../api/bouquetConfirm.ts";

interface ModalProps {
	closeModal: () => void;
	axiosInstance: AxiosInstance;
}

export const MakeModal = ({ closeModal, axiosInstance }: ModalProps) => {
	const { bouquetUrl} = bouquetStore.getState();

	const navigate = useNavigate();

	const goToComplete = async () => {
		closeModal();
		try {
			await postBouquetConfirm(axiosInstance); // API 호출
			navigate('/complete');
		} catch (error) {
			console.error(error);
			// 에러 처리 로직 (예: 에러 메시지 표시)
		}
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
							src={bouquetUrl}
							alt='img'
						></StyledBouquetImage>
						<CustomButton $check={true} onClick={goToComplete}>만들기</CustomButton>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
