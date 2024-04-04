import { StyledColorButton, StyledSVG } from '../flowerColorButton/StyledFlowerColorButton';
interface SvgProps {
	$fillColor?: string;
	$strokeColor?: string;
	// 채우는 색과 테두리 색
	clickColorButton: () => void
}

export const FlowerColor = ({ $fillColor, $strokeColor, clickColorButton }: SvgProps) => {
	// 색상버튼 SVG

	return (
		<>
			<StyledColorButton onClick={clickColorButton}>
				<StyledSVG
					width='31'
					height='36'
					viewBox='0 0 31 36'
					$fillColor={$fillColor}
					$strokeColor={$strokeColor}
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M22.283 0.724626C3.88304 -0.10231 -0.216868 20.3644 1.28317 32.2516C7.28286 18.6071 11.8277 14.8746 13.828 14.7023C9.42796 18.837 3.5 28.6094 2.32796 34.3421C7.78401 28.6337 13.2393 27.6462 19.7832 23.9822C29.3832 18.6071 30.1165 8.8217 29.2832 5.37614L22.283 6.43299V0.724626Z' />
				</StyledSVG>
			</StyledColorButton>
		</>
	);
};
