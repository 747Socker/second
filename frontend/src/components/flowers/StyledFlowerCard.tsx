import styled from 'styled-components';

interface borderProps {
	$isMain?: boolean;
	$isSelected?: boolean;
	src?: String;
}

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

interface AlignProps {
	$align?: string;
} // text 정렬

interface isMain {
	$main?: boolean;
}

interface listProps {
	$isChoice?: boolean;
	$isCollapse?: boolean
}

// 전체
export const StyledCard = styled.div<MarginProps & listProps>`
	width: max-content;
	height: max-content;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 1vh;
	margin-bottom: 1vh;

	border: none;

	@media (min-width: 768px) {
		height: 190px;

		margin-top: 4vh;
		margin-bottom: 4vh;
	}

`; 

// 꽃 사진 + 버튼 영역
export const StyledFlowerArea = styled.div`
	position: relative;

	display: 'flex';
	flex-direction: 'column';
`;

// 꽃 사진
export const StyledRecommend = styled.div<borderProps>`
	width: 100px;
	height: 130px;

	@media (min-width: 768px) {
		width: 130px;
		height: 169px;

		border-top-left-radius: 65px;
		border-top-right-radius: 65px;

		margin-right: 1vw;
		margin-left: 1vw;
	}

	border-top-left-radius: 50px;
	border-top-right-radius: 50px;

	border: ${(props) => (props.$isSelected ? '1.5px solid #FBBB95' : props.$isMain ? '1.5px solid #C7C151' : 'none')};

	background: ${(props) => `url(${props.src})`} no-repeat;
	background-size: 100% 100%;
	margin: auto;
	overflow: hidden;
`;

// 삭제 span 
export const CloseSpan = styled.span`

	&.material-symbols-outlined {
		color: #975aad;
		font-size: 28px;

		@media (min-width: 768px) {
			font-size: 36px;
		}

		font-variation-settings:
			'FILL' 0,
			'wght' 100,
			'GRAD' 0,
			'opsz' 24;
	}
`;

// 삭제 버튼
export const StyledCloseButton = styled.button`
	position: absolute;
	left: 65px;

	@media (min-width: 768px) {
		left: 100px;
	}

	background: none;
	border: none;

	&:hover {
		${CloseSpan} {
			color: #5a2e6b;
			transition: color 0.3s ease;
		}
	}
`;

// 꽃 정보
export const StyledInfo = styled.div<isMain>`
	width: 55vw;
	height: 133px;

	@media (min-width: 768px) {
		height: 169px;
		width: 423px;

		margin-right: 1vw;
		margin-left: 1vw;
	}

	@media (max-width: 767px) {
		height: 138px;
	}

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	margin: auto;
	margin-left: 2.5vw;
`;

// 꽃 이름
export const StyledName = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 1.5rem;

	@media (min-width: 768px) {
		font-size: 1.8rem;
	}

	display: block;
	text-align: center;
	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`;

// 꽃말
export const StyledMeaning = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 1.1rem;

	@media (max-width: 300px) {
		font-size: 0.9rem;
	}

	@media (min-width: 640px) {
		font-size: 1.2rem;
	}

	@media (min-width: 768px) {
		font-size: 1.55rem
	}

	display: block;

	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`;

export const TextAlign = styled.div<AlignProps>`
	text-align: ${(props) => props.$align || 'center'};
`; // 텍스트 마진
