import styled from 'styled-components';

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
`;

export const StyledModal = styled.div`
	width: 90vw;
	height: 75vh;

	@media (max-width: 290px) {
		width: 270px;
	}
	
	@media (min-width: 400px) {
		width: 360px
	}

	@media (max-height: 625px) {
		height: 470px
	}

	@media (min-height: 665px) {
		height: 530px
	}
	
	display: flex;
	flex-direction: column;

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
`;

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
`;

export const StyledBouquetImage = styled.img`
	width: 260px;
	height: auto;

	border-radius: 15px;

	margin-top: 2.5vh;
	margin-bottom: 2.5vh;
`;

export const StyledConfirmInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	margin: auto;
`;
