import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './containers/IndexPage/IndexPage.tsx';
import { useEffect } from 'react';
import { LoginPage } from './containers/loginPage/LoginPage.tsx';
import { GeneratePage } from './containers/generatePage/GeneratePage.tsx';
import { CompletePage } from './containers/completePage/CompletePage.tsx';
import { BouquetListPage } from './containers/bouquetListPage/BouquetListPage.tsx';
// import { GenerateTestPage} from "./containers/generatePage/GenerateTestPage.tsx";
import {KakaoCallback} from "./utils/Kakao.tsx";
import { FindFlowerShopPage } from './containers/findFlowerShop/FindFlowerShopPage.tsx';
import {BouquetListTestPage} from "./containers/bouquetListPage/BoutquetListTestPage.tsx";

export default function App() {
	function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	useEffect(() => {
		setScreenSize();

		const handleResize = () => {
			setScreenSize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route>
						{/* 레이아웃이 필요한 페이지 */}
						<Route path='/' element={<LoginPage />} />
						<Route path='/index' element={<IndexPage />} />
						<Route path='/generate' element={<GeneratePage />} />
						{/*<Route path='/gtp' element={<GenerateTestPage />} />*/}
						<Route path='/complete' element={<CompletePage />} />
						<Route path='/list' element={<BouquetListPage />} />
						<Route path='/map' element={<FindFlowerShopPage />} />
						<Route path='/ltp' element={<BouquetListTestPage />}/>
					</Route>
					<Route>
						<Route path="/auth/kakao" element={<KakaoCallback />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
