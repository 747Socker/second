import { StyledMenu, StyledMenuButton, StyledMenuImg, StyledMenuText } from "./StyledMenu";
import { Avatar } from "../avatar/Avatar";
import { useNavigate } from 'react-router-dom';
import make from './../../assets/images/make.svg'
import search from './../../assets/images/search.svg'
import find from './../../assets/images/find.svg'


export const Menu = () => {

  const navigate = useNavigate();

  const goToGenerate = () => {
		navigate('/index');
	};

  const goToList = () => {
		navigate('/list');
	};

  const goToFind = () => {
		navigate('/find');
	};

  return (
    <StyledMenu>
      {/* 메뉴바 */}
      <StyledMenuButton onClick={goToGenerate}>
        <StyledMenuImg src={make} alt="make"></StyledMenuImg>
        {/* 만들기 버튼과 아이콘*/}
        <StyledMenuText $marginLeft="-0.6vw">만들기</StyledMenuText>
      </StyledMenuButton>

      <StyledMenuButton onClick={goToList}>
        {/* 검색 버튼과 아이콘 */}
        <StyledMenuImg src={search} alt="search"></StyledMenuImg>
        <StyledMenuText>검색</StyledMenuText>
      </StyledMenuButton>

      <StyledMenuButton>
        {/* 꽃집 찾기 버튼과 아이콘 */}
        <StyledMenuImg src={find} alt="find"></StyledMenuImg>
        <StyledMenuText>꽃집 찾기</StyledMenuText>
      </StyledMenuButton>
    </StyledMenu>
  );
};