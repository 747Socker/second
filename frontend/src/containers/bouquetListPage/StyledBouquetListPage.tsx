import styled from 'styled-components';

interface clickProp {
	$clicked: boolean;
}

export const StyledBouquetListPage = styled.div`
	width: 100vw;
	height: calc(var(--vh, 1vh) * 100 - 60px);

	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`; // 페이지 전체

export const SearchBar = styled.div`
	display: flex;

	margin-top: 70px;
`// 검색 wrapper

export const StyledInput = styled.input`
	font-family: 'Cafe 24 Oneprettynight-v2.0';

	width: 40vw;

	@media (max-width : 380px) {
		width: 30vw;
	}
	
	@media (max-width : 300px) {
		width: 25vw;
	}

	line-height: 1.2rem;
	font-size: 1.2rem;

	border-radius: 15px;

	margin-right: 2vw;
	margin-left: 2vw;

	border: solid 1.5px #e2d5e7;

	&:focus {
		outline: none;
	}
`; // 검색창

export const SortBar = styled.div`
	width: 100vw;
	display: flex;

	justify-content: flex-end;
	align-items: center;

	margin-right: 7vh;
	
	margin-top: 2vh;
`// 정렬 위치

export const SortButton = styled.button<clickProp>`
font-family: 'Cafe 24 Oneprettynight-v2.0';

	width: 40vw;
	height: 6vh;

	border: none;
	border-radius: 15px;
	background-color: ${(props) => props.$clicked ? '$f3f3f3' : 'transparent'};

	font-size: 1.2rem;

	@media (min-width: 320px) {
		font-size: 1.5rem;
	}

	@media (min-width: 768px) {
		font-size: 1.7rem;
	}

	@media (min-width: 1024px) {
		font-size: 1.9rem;

		@media (min-height: 768px) {
			font-size: 1.7rem;
		}
	}

`

export const BouquetListGrid = styled.div`
	width: 100vw;
	height: 100vh;

	margin-top: 2vh;

	display: grid;

	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(2, 1fr);
		}

	@media (min-width: 1440px) {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}

	gap: 15px;

	justify-items: center;
	align-items: center;

	overflow: scroll;

	// place-items: align-items justify-items;
	// place-items: center start;
`; // 이미지 영역 그리드

export const StyledImageArea = styled.div`
	position: relative;

	display: 'flex';
	flex-direction: 'column';
`; // 이미지 영역

export const StyledBouquetImage = styled.img`
	width: 145px;
	height: 145px;

	border: solid 1px #e2e2e2;

	@media (max-width: 320px) {
		width: 120px;
		height: 120px;
	}

	@media (min-width: 568px) {
		width: 170px;
		height: 170px;
	}

	@media (min-width: 768px) {
		width: 250px;
		height: 250px;

		@media (max-height: 768px) {
			width: 200px;
			height: 200px;
		}
	}

	border-radius: 15px;
	background-color: aliceblue;
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

	right: 10px;
	top: 105px;

	@media (max-width: 320px) {
		right: 5px;
		top: 80px;
	}

	@media (min-width: 568px) {
		right: 10px;
		top: 125px;
	}

	@media (min-width: 768px) {
		right: 10px;
		top: 190px;

		@media (max-height: 768px) {
			top: 150px
		} 

	}
	
	border-radius: 20%;
	background-color: rgba(255, 255, 255, 0.5);


	border: none;

	&:hover {
		background-color: #efefef;
		${DownloadSpan} {
			color: #4a4a4a;
			transition: color 0.3s ease;
		} // 호버시 배경색 및 다운로드 span 색상 변경 
	}
`; // 다운로드 버튼 

