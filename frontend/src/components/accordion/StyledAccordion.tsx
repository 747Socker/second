import styled from 'styled-components';

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

export const AccordionSection = styled.div`
	display: flex;
	flex-direction: column;
`; // 페이지 전체

export const AccordionMenu = styled.div`
	cursor: pointer;
	
	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	outline: none;

	background-color: transparent;
	transition: background-color 0.6s ease;

	&:hover,
	&.active {
		background-color: #FFD9E5;
	}
`; // 아코디언 상단 메뉴

export const AccordionIcon = styled.div`
	margin-left: auto;
	transition: transform 0.6s ease;

	@media (min-width: 768px) {
		margin-left: 1vw;
		margin-right: 1vw;
	}

	&.rotate {
		transform: rotate(90deg);
	}
`; // 아이콘

export const AccordionContent = styled.div`
	overflow: hidden;
	transition: height 0.8s ease;
	background-color: #fff1f1;

	@media (min-width: 768px) {
		margin-top: 2vh;
		margin-bottom: 2vh;
	}
`; // 아코디언 collapse 메뉴

export const AccordionText = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';

	font-size: 1.3rem;
	display: block;

	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};

	@media (min-width: 768px) {
		margin-top: 1vh;
		margin-bottom: -1vh;
	}

`; // 단순 텍스트용
