import { StyledLoginPage, StyledLogoImage, StyledKakaoImg } from './StyledLoginPage';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/images/logo.svg';
import CustomButton from '../../components/button/CustomButton';
import kakao from './../../assets/images/kakao.png';
export const LoginPage = () => {
	const navigate = useNavigate();
	const goToIndex = () => {
		navigate('/index');
	};
	const kakaoAuth = () => {
		location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
			import.meta.env.VITE_KAKAO_CLIENT_ID
		}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
	};
	return (
		<>
			<StyledLoginPage>
				{/* 로고 */}
				<StyledLogoImage src={Logo}></StyledLogoImage>
				{/* 카카오 로그인 버튼 */}
				<CustomButton $kakao={true} onClick={kakaoAuth}>
					{' '}
					<StyledKakaoImg src={kakao} alt='kakao'></StyledKakaoImg>카카오 계정으로 로그인하기
				</CustomButton>
			</StyledLoginPage>
		</>
	);
};
