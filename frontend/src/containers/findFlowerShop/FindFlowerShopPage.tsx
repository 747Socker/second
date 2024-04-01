import { Menu } from '../../components/menu/Menubar';
import { Header } from '../../components/header/Headerbar';
import { StyledFindFlowerShopPage, StyledText } from './StyledFindFlowerShop';
import { Map, MapMarker, MapTypeControl, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import './InfoWindow.css';
const { kakao } = window;

export const FindFlowerShopPage = () => {
	const [search, setSearch] = useState<any>([]);
	const [isOpen, setIsOpen] = useState<boolean[]>([]);

	// 기본 위치 상태
	const [state, setState] = useState({
		center: {
			lat: 37.501283,
			lng: 127.039617,
		},
		errMsg: '',
		isLoading: true,
	});

	// 현재 사용자 위치 받아오기 (geolocation)
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setState((prev) => ({
						...prev,
						center: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						isLoading: false,
					}));
				},
				(err) => {
					setState((prev) => ({
						...prev,
						errMsg: err.message,
						isLoading: false,
					}));
				},
			);
		} else {
			setState((prev) => ({
				...prev,
				errMsg: '사용자의 위치를 찾을 수 없습니다.',
				isLoading: false,
			}));
		}
	}, []);

	useEffect(() => {
		searchPlaces('꽃집');
	}, [state]);

	// 카테고리 검색으로 주변 위치 검색하기
	const searchPlaces = (keyword: string) => {
		// 현재 위치가 없을 경우 함수 종료
		if (!state.center) return;
		// places 서비스 객체 생성
		const ps = new kakao.maps.services.Places();
		// 검색 옵션 설정
		const options = {
			location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
			radius: 5000,
			sort: kakao.maps.services.SortBy.DISTANCE,
		};

		// Places 서비스의 keywordSearch 메소드 호출
		ps.keywordSearch(
			keyword,
			(data: any[], status, _pagination) => {
				if (status === kakao.maps.services.Status.OK) {
					setSearch(data); // 검색 결과를 search 상태에 저장
				} else {
					console.error('검색에 실패하였습니다.');
				}
			},
			options, // 검색 옵션 전달
		);
	};

	return (
		<>
			<StyledFindFlowerShopPage>
				<Header></Header>
				<StyledText $marginTop='0vh' $marginBottom='1.5vh'>
					내 주변 꽃집 찾기
				</StyledText>
				<Map center={state.center} style={{ width: '80vw', height: '50vh' }} level={5} draggable={true}>
					<MapTypeControl position={'TOPRIGHT'} />
					<ZoomControl position={'RIGHT'} />
					<MapMarker
						position={state.center}
						image={{
							src: 'https://cdn-icons-png.flaticon.com/128/7124/7124723.png',
							size: {
								width: 50,
								height: 50,
							},
						}}
					/>
					{search.map((data: any, index: number) => {
						return (
							<>
								<MapMarker
									key={data.id}
									position={{ lat: data.y, lng: data.x }}
									image={{
										src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
										size: {
											width: 35,
											height: 35,
										},
									}}
									onClick={() => {
										const newIsOpen = [...isOpen];
										newIsOpen[index] = true;
										setIsOpen(newIsOpen);
									}}
								></MapMarker>

								{isOpen[index] && (
									<CustomOverlayMap position={{ lat: data.y, lng: data.x }}>
										<div className='wrap'>
											<div className='info'>
												<div className='title'>
													{data.place_name}
													<div
														className='close'
														onClick={() => {
															const newIsOpen = [...isOpen];
															newIsOpen[index] = false;
															setIsOpen(newIsOpen);
														}}
														title='닫기'
													></div>
												</div>
												<div className='body'>
													<div className='desc'>
														<div className='ellipsis'>{data.road_address_name}</div>
														<div className='jibun ellipsis'>(지번) {data.address_name}</div>
														<div className='jibun ellipsis'>(Tel) {data.phone}</div>
														<div>
															<a
																href={data.place_url}
																target='_blank'
																className='link'
																rel='noreferrer'
															>
																상세정보
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
										;
									</CustomOverlayMap>
								)}
							</>
						);
					})}
				</Map>
			</StyledFindFlowerShopPage>
			<Menu></Menu>
		</>
	);
};
