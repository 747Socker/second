import styled from 'styled-components';

interface MarginProps {
	$marginRight?: string;
	$marginLeft?: string;
	$marginTop?: string;
	$marginBottom?: string;
} // 마진용

export const StyledMenu = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 60px;

	display: flex;
	justify-content: space-around;
	align-items: center;

	margin-top: 5px;
	background-color: #e2d5e7;
`; // 메뉴바

export const StyledMenuButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
  flex-direction: column;

  background: none;
  border: none;

	transition:
		box-shadow 0.3s ease,
		background-color 0.3s ease;

	&:hover {
		background-color: #d7c4df;
		// 호버시 변경
	}
`; // 메뉴 버튼 개별

export const StyledMenuImg = styled.img`
	width: 35px;
	height: 35px;
`;

export const StyledMenuText = styled.p<MarginProps>`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	font-size: 0.8rem;

	@media (min-width: 768px) {
		font-size: 1.1rem;
	}

	display: block;
	margin: auto;
	margin: ${(props) => props.$marginTop || 'auto'} ${(props) => props.$marginRight || 'auto'}
		${(props) => props.$marginBottom || 'auto'} ${(props) => props.$marginLeft || 'auto'};
`; // 단순 텍스트용
