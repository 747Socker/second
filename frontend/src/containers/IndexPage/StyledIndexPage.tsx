import styled from 'styled-components';

interface HeightProps {
	height?: string;
} // textarea 높이

interface AlignProps {
	$align?: string;
} // text 정렬

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

export const StyledIndexPage = styled.div`
	height: calc(var(--vh, 1vh) * 100 - 60px);
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;
`;
// 인덱스 페이지 전체

export const StyledBox = styled.div`
	width: 85vw;
	height: 85vh;
	
	@media (min-width: 340px) {
		height: 80vh;
		
		@media (max-height: 658px) {
			height: 85vh;
		}
	}

	border-radius: 15px;
	padding: 5px;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	background-color: #e2d5e7;

`;
// 인덱스 페이지 설명 영역

export const StyledLetter = styled.div`
	width: 75vw;
	height: 42vh;

	border: 2px solid #fff6f2;
	border-radius: 15px;
	margin-top: 1vh;

	padding-top: 1.5vh;
	padding-bottom: 1.5vh;

	display: flex;
	justify-content: center;
	flex-direction: column;
`; // 입력 영역

export const StyledInput = styled.input`
	font-family: 'Cafe 24 Oneprettynight-v2.0';

	width: 68vw;

	border-left-width: 0;
	border-right-width: 0;
	border-top-width: 0;
	border-bottom-width: 1.5px;
	border-bottom-color: #fff6f2;

	padding-bottom: -1px;

	background-color: transparent;

	line-height: 1.32rem;
	font-size: 1.32rem;

	@media (max-width: 340px) {
		line-height: 0.945rem;
		font-size: 0.945rem;
	}

	&::placeholder {
		font-family: 'Cafe 24 Oneprettynight-v2.0';
		font-weight: 400;
		font-size: 1rem;
		color: #9d86a6 !important;
	}

	&:focus {
		outline: none;
		border-bottom-width: 1.5px;
		border-bottom-color: #fff6f2;
	}
`;
// 상황 input

export const StyledTextarea = styled.textarea<HeightProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';

	width: 68vw;
	height: ${(props) => props.height || '3rem'};

	background-attachment: local;
	background-image: linear-gradient(to right, transparent 15px, transparent 15px),
		linear-gradient(to left, transparent 15px, transparent 15px),
		repeating-linear-gradient(transparent, transparent 1.375rem, #fff6f2 1.4375rem, #fff6f2 1.5rem, #fff6f2 0.625px);
	line-height: 1.5rem;
	font-size: 1.375rem;

	@media (max-width: 340px) {
		font-size: 0.945rem;
	}

	border: none;
	background-color: inherit;
	resize: none;
	overflow: hidden;

	word-break: break-all;

	&:focus {
		outline: none;
	}

	&::placeholder {
		font-family: 'Cafe 24 Oneprettynight-v2.0';
		font-weight: 400;
		font-size: 1rem;
		color: #9d86a6 !important;

		@media (max-width: 340px) {
			font-size: 0.945rem;
		}
	}
`;
// 상대, 메시지 입력 영역

export const StyledText = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 1.2rem;

	@media (max-width: 340px) {
		font-size: 0.945rem;
	}

	@media (min-width: 767px) {
		font-size: 1.5rem;
	}

	display: block;
	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`; // 단순 텍스트용

export const StyledImage = styled.img`
	width: 100px;
	height: auto;

	@media (max-height: 610px) {
		width: 75px;
		height: auto;
	}
`;
// 이미지

export const InfoAlign = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const TextAlign = styled.div<AlignProps>`
	text-align: ${(props) => props.$align || 'center'};
`;
// 텍스트 정렬
