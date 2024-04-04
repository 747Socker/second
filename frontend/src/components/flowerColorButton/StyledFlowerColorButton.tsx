import styled from 'styled-components';

interface SvgProps {
	$fillColor?: string;
	$strokeColor?: string;
}

export const StyledSVG = styled.svg<SvgProps>`
	fill: ${(props) => props.$fillColor || 'none'};
	stroke: ${(props) => props.$strokeColor || '#D1D1D1'};

	transition:
		fill 0.3s ease,
		stroke 0.3s ease;
`; // SVG, 색상을 동적으로

export const StyledColorButton = styled.button<SvgProps>`
  height: fit-content;
  
	background: none;
	border: none;
	display: flex;

	transition:
		box-shadow 0.3s ease,
		background-color 0.3s ease;

	margin-left: auto;
	margin-top: 1vh;
	margin-right: 1vw;

	&:hover {
		${StyledSVG} {
			filter: brightness(0.8);
			// 호버시 SVG 색상을 어둡게

			transition:
				filter 0.5s ease,
		}
	}
`; // SVG를 둘러싸고 있는 버튼
