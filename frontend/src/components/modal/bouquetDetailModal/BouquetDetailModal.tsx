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

interface ModalProps {
	closeModal: () => void;
	$flowers: RecommendItem[];
}

type RecommendItem = {
	$url: string;
	$name: string;
	$meaning: string[];
};

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
							{/* 구성된 꽃 목록을 loop */}
							{$flowers &&
								$flowers.length > 0 &&
								$flowers.map((flower, index) => (
									<div key={index}>
										{/* 꽃 이름 */}
										<StyledName $marginLeft='1.0vw' $marginTop='0.8vh'>
											{flower.$name}
										</StyledName>
										<ul>
											{/* 각 꽃마다 꽃말 loop */}
											{flower.$meaning &&
												flower.$meaning.length > 0 &&
												flower.$meaning.map((meaning, meaningIndex) => (
													<li key={meaningIndex}>
														{/* 꽃말 */}
														<StyledMeaning $marginLeft='0.5vw' $marginTop='0.5vh'>
															{' '}
															{'ㆍ'} {meaning}{' '}
														</StyledMeaning>
													</li>
												))}
										</ul>
									</div>
								))}
						</TextAlign>
					</StyledConfirmInfo>
				</StyledModal>
			</StyledModalBackground>
		</>
	);
};
