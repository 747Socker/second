import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';

interface AlignProps {
	$align?: string;
} // text 정렬

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

export const StyledFindFlowerShopPage = styled.div`
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



