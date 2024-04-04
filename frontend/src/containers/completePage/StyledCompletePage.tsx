import styled from 'styled-components';

interface AlignProps {
	$align?: string;
} // text 정렬

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

export const StyledCompletePage = styled.div`
	width: 100vw;
	height: calc(var(--vh, 1vh) * 100 - 60px);

	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: #fff6f2;
`; // 완성 페이지 전체

export const StyledText = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 1.725rem;

	@media (min-width: 768px) {
		font-size: 2.7rem;
	}

	display: block;
	margin: auto;
	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`; // 단순 텍스트용

export const TextAlign = styled.div<AlignProps>`
	text-align: ${(props) => props.$align || 'center'};
`;
// 텍스트 정렬
export const StyledImageArea = styled.div`
	position: relative;

	display: 'flex';
	flex-direction: 'column';
`; // 이미지 영역

export const StyledBouquetImage = styled.img`
	width: 260px;
	height: auto;

	@media (max-height: 625px) {
		width: 200px;
	}

	border-radius: 15px;

	margin-top: 2.5vh;
`; // 꽃다발 이미지

export const DownloadSpan = styled.span`
	&.material-symbols-outlined {
		color: #000000;
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
`; // 다운로드 span 

export const StyledDownloadButton = styled.button`
	position: absolute;

	left: 200px;
	bottom: 20px;
	border-radius: 20%;
	background-color: rgba(255, 255, 255, 0.5);

	@media (min-width: 768px) {
		left: 190px;
	}

	@media (max-height: 625px) {
		left: 140px;
	}

	border: none;

	&:hover {
		background-color: #efefef;
		${DownloadSpan} {
			color: #4a4a4a;
			transition: color 0.3s ease;
		} // 호버시 배경색 및 다운로드 span 색상 변경 
	}
`; // 다운로드 버튼 
