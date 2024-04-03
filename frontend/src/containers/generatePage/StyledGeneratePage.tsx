import styled from 'styled-components';

export const StyledGeneratePage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	margin: auto;
	margin-top: 55px;
`; // 페이지

export const StyledBouquetImage = styled.img`
	width: 260px;
	height: auto;

	border-radius: 15px;

	margin-top: 2.5vh;
	margin-bottom: 2vh;
`; // 꽃다발 이미지

export const StyledLoadingButton = styled.button`
	height: 35px;
	width: 280px;

	border-radius: 30px;
	border: none;
	outline: none;
	text-align: center;
	margin-top: 5px;
	transition:
		box-shadow 0.3s ease,
		background-color 0.3s ease;
	font-family: 'Cafe 24 Oneprettynight-v2.0';

	background: #FFD9E5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	&:hover {
		background: #e4e4e4;
	}
`;
