import styled from 'styled-components';

interface AlignProps {
	$align?: string;
} // text 정렬

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;

	$textSize?: string;
} // 마진용

export const StyledModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	backdrop-filter: blur(3px);
	display: flex;
	align-items: center;
	justify-content: center;

	z-index: 2;
`; // 모달 바깥쪽 배경

// 모달창
export const StyledModal = styled.div`
	width: 90vw;
	height: 78vh;

	// 너비
	@media (max-width: 290px) {
		width: 270px;
	}
	@media (min-width: 400px) {
		width: 380px;
	}
	@media (min-width: 440px) {
		width: 420px;
	}
	@media (min-width: 520px) {
		width: 500px;
	}
	@media (min-width: 620px) {
		width: 590px;
	}
	@media (min-width: 680px) {
		width: 650px;
	}
	@media (min-width: 768px) {
		width: 700px;
	}

	// ------------------------

	// 높이
	@media (max-height: 625px) {
		height: 480px;
	}
	@media (min-height: 665px) {
		height: 600px;
	}
	@media (min-height: 768px) {
		height: 680px;
	}

	display: flex;
	flex-direction: column;
	justify-content: center;

	border-radius: 15px;
	background-color: white;
	box-shadow: 2px 7px 15px 8px rgba(0, 0, 0, 0.3);

`;

export const CloseSpan = styled.span`
	color: #bdbdbd;

	&.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 100,
			'GRAD' 0,
			'opsz' 24;
	}
`; // 닫기 span

export const StyledCloseButton = styled.button`
	background: none;
	border: none;

	border-radius: 30%;

	transition:
		box-shadow 0.3s ease,
		background-color 0.3s ease;

	margin-left: auto;
	margin-top: 1vh;
	margin-right: 1vw;

	&:hover ${CloseSpan} {
		color:  #505050;
		transition: color 0.3s ease;
	}
`; // 닫기 버튼

export const StyledConfirmInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	margin: auto;
`; // 꽃 정보

// 꽃 이름
export const StyledName = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: ${(props) => props.$textSize || '1.25rem' };

	@media (min-width: 768px) {
		font-size: ${(props) => props.$textSize ? parseFloat(props.$textSize) * 1.44 + 'rem' : '1.5rem'};
	}

	display: block;
	text-align: left;
	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`;

// 꽃말
export const StyledMeaning = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 1.0rem;

	@media (max-width: 320px) {
		font-size: 0.7rem;
	}

	@media (min-width: 560px) {
		font-size: 1.125rem;
	}

	@media (min-width: 768px) {
		font-size: 1.23rem;
	}

	display: block;

	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`;

export const TextAlign = styled.div<AlignProps>`
	text-align: ${(props) => props.$align || 'center'};
`; // 텍스트 마진