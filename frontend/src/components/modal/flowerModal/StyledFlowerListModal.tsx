import styled from 'styled-components';

interface listProps {
	$isChoice?: boolean;
}

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
`; // 모달 바깥 배경

export const StyledModal = styled.div`
	width: 90vw;
	height: 85vh;

	position: relative;
	overflow-y: auto;

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

	@media (max-height: 625px) {
		height: 470px;
	}
	@media (min-height: 665px) {
		height: 600px;
	}
	@media (min-height: 768px) {
		height: 700px;
	}

	display: flex;
	flex-direction: column;

	border-radius: 15px;
	background-color: white;
	box-shadow: 2px 7px 15px 8px rgba(0, 0, 0, 0.3);
`; // 모달 영역

export const CloseSpan = styled.span`
	color: #bdbdbd;
	&.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 100,
			'GRAD' 0,
			'opsz' 24;
	}
`; // 닫기 span class

export const StyledCloseButton = styled.button`
	position: fixed;

	background: none;
	border: none;

	transition:
		box-shadow 0.3s ease,
		background-color 0.3s ease;

	margin-left: auto;
	margin-top: 1vh;
	margin-right: 1vw;

	&:hover ${CloseSpan} {
		color: #505050;
		transition: color 0.3s ease;
	}
`; // 닫기 버튼

export const StyledClickArea = styled.button<listProps>`
	border: none;
	outline: none;

	width: 100%;

	background-color: ${(props) => (props.$isChoice ? '#e1e1e1' : 'transparent')};

	&:hover {
		background-color: #f3f3f3;
		transition: color 0.3s ease;
	}
`

export const StyledConfirmInfo = styled.div<{ $fixedHeight: number }>`
  height: calc(110% - ${({ $fixedHeight }) => $fixedHeight}px);
	// 수정해야하는 부분

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: relative;

	margin: auto;
	margin-top: 5vh;
`; // 정보 영역

export const ColorButtonList = styled.div`
	width: 90%;
	height: max-content;

	margin: auto;

	display: flex;
	justify-content: space-around;
`; // 색상 버튼

export const StyledScroll = styled.div`
	overflow: scroll;
`; // 무한 스크롤 영역

export const StyledFixed = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`; // 하단 버튼 영역
