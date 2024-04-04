import { useState } from 'react';
import {
	StyledCard,
	StyledInfo,
	StyledFlowerArea,
	StyledRecommend,
	StyledName,
	StyledMeaning,
	TextAlign,
	StyledCloseButton,
	CloseSpan,
} from './StyledFlowerCard';

interface FlowerProps {
	$bouquetUrl?: string;
	$isMain?: boolean;
	$isSelected?: boolean;
	$name?: string;
	$recommend?: boolean;
	$meaning?: String[];
	$isChoice?: boolean;
	$isCollapse?: boolean;
	$userSelect?: boolean;
	clickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	deleteAddedFlower?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const FlowerCard = ({ $bouquetUrl, $isMain, $isSelected, $name, $recommend, $meaning, $isChoice, $isCollapse, $userSelect, clickDelete, deleteAddedFlower }: FlowerProps) => {
	return (
		<>
			<StyledCard $isChoice={$isChoice} $isCollapse={$isCollapse}>
				{/* 꽃 이미지 */}
				<StyledFlowerArea>
					<div style={{ marginLeft: 'auto' }}>
						{!$isMain && $recommend && (
							<StyledCloseButton onClick={clickDelete}>
								<CloseSpan className='material-symbols-outlined'>cancel</CloseSpan>
							</StyledCloseButton>
						)}
						{!$isMain && $userSelect && (
							<StyledCloseButton onClick={deleteAddedFlower}>
								<CloseSpan className='material-symbols-outlined'>cancel</CloseSpan>
							</StyledCloseButton>
						)}
					</div>
					<StyledRecommend src={$bouquetUrl} $isMain={$isMain} $isSelected={$isSelected}></StyledRecommend>
				</StyledFlowerArea>
				{/* 꽃말 정보 */}
				<StyledInfo>
					<TextAlign $align='left'>
						<StyledName $marginLeft='1.0vw' $marginTop='0.8vh'>
							{$name}
						</StyledName>
						{$meaning &&
							$meaning.length > 0 &&
							$meaning.map((meaning, index) => (
								<StyledMeaning key={index} $marginLeft='0.5vw' $marginTop='0.5vh'>
									{' '}
									{'ㆍ'}
									{meaning}{' '}
								</StyledMeaning>
							))}
					</TextAlign>
				</StyledInfo>
			</StyledCard>
		</>
	);
};
