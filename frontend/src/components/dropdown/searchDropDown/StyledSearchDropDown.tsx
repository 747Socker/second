import styled from 'styled-components';

interface dropdownProp {
	$visible: boolean;
}

export const DropdownMain = styled.div`
	position: relative;
	display: inline-block;
	user-select: none;
`; // 드롭다운 wrapper

export const DropdownBar = styled.div`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	text-align: center;

	display: inline-flex;
	justify-content: center;
	align-items: center;
	
	cursor: pointer;
	// 커서가 올라오면 손모양 커서로 변경

	font-size: 1.2rem;
	color: black;

	width: 100px;
	height: 35px;

	@media (max-width : 380px) {
		width: 80px;
	}
	
	@media (max-width : 300px) {
		width: 70px;
	}

	background:  #FFD9E5;

	border-radius: 30px;
`; // 드롭 다운 상단

export const DropdownMenu = styled.div<dropdownProp>`
	position: absolute; // relative인 부모 요소 위치를 기준으로 배치하기
	display: ${(props) => (props.$visible ? 'flex' : 'none')};
	flex-direction: column;

	width: 100px;

	@media (max-width : 380px) {
		width: 80px;
	}
	
	@media (max-width : 300px) {
		width: 75px;
	}

	background: linear-gradient(to bottom, #FFD9E5, #b636cd);
	// 색상 그라데이션 - 아래로 방향으로 진행됨

	border-radius: 5%;

	box-shadow: 4px 4px 10px #c5b0b0;
	animation: fade-in 1s ease;
	// fade-in시 애니메이션

	left: 50%;
	transform: translateX(-50%);
	// 부모 요소의 가로 너비에 맞춰 가운데로 이동 

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`; // 드롭다운 열었을 때 나오는 메뉴

export const DropdownMenuText = styled.button`
	font-family: 'Cafe 24 Oneprettynight-v2.0';
	text-align: center;
	color: black;
	text-decoration: none;
	// 텍스트를 선으로 꾸미는 요소
	font-size: 1.2rem;

	padding: 0.5rem;
	display: block;

	border: none;
	background-color: transparent;
`; // 드롭다운 메뉴들 버튼
