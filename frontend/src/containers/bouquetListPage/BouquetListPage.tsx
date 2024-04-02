import { Menu } from '../../components/menu/Menubar';
import { Header } from '../../components/header/Headerbar';
import {
	StyledBouquetListPage,
	StyledInput,
	BouquetListGrid,
	StyledBouquetImage,
	SearchBar,
	SortBar,
	SortButton,
	StyledImageArea,
	StyledDownloadButton,
	DownloadSpan,
} from './StyledBouquetListPage';
import { BouquetDetailModal } from '../../components/modal/bouquetDetailModal/BouquetDetailModal';
import { SearchDropdown } from '../../components/dropdown/searchDropDown/SearchDropDown';
import { SortDropdown } from '../../components/dropdown/sortDropDown/SortDropDown';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useBouquetList } from '../../api/useBouquetList';
import { Bouquet } from '../../types/BouquetList'
import CustomButton from '../../components/button/CustomButton';
import white from '../../assets/images/white.jpg'

export const BouquetListPage = () => {
	const [type, setType] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [orderBy, setOrderBy] = useState('');
	const [searchParams, setSearchParams] = useState({
			type: '',
			searchKeyword: '',
			orderBy: ''
	});
	const [isBouquetDetailModal, setIsBouquetDetailModal] = useState(false);
	const [extractedItems, setExtractedItems] = useState<Bouquet>();

	const { bouquets, loading, error, hasMore,fetchMoreData  } = useBouquetList(searchParams.type, searchParams.searchKeyword, searchParams.orderBy);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastBouquetElementRef = useCallback((node: Element | null) => {
			if (loading || !hasMore) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
					if (entries[0].isIntersecting && hasMore && !loading) {
							fetchMoreData ();
					}
			});
			if (node) observer.current.observe(node);
	}, [loading, hasMore]);

	useEffect(() => {
		setSearchParams({
			type: type, 
			searchKeyword: searchKeyword, 
			orderBy: orderBy 
		});
	}, [searchKeyword, orderBy, type])

	const handleSearch = () => {
			setSearchParams({
        type: type, 
        searchKeyword: searchKeyword, 
        orderBy: orderBy 
			});
	};

	const html = document.querySelector('html');

	const openModal = (bouquet : Bouquet) => {
		setIsBouquetDetailModal(true);
		setExtractedItems(bouquet)

		html?.classList.add('scroll-locked');
	};

	const closeModal = () => {
		setIsBouquetDetailModal(false);
		html?.classList.remove('scroll-locked');
	};

	const downloadImage = (url: string) => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'flower_image');
		link.click();
	};

	const onErrorImg = (e: any) => {
		e.target.src = white;
	};

	return (
		<>
			<StyledBouquetListPage>
				{/* 로그인 헤더 */}
				<Header></Header>
				{/* 검색창 - 드롭다운, 입력창, 버튼 순 */}
				<SearchBar>
					<SearchDropdown setType={setType}></SearchDropdown>
					<StyledInput onChange={e => setSearchKeyword(e.target.value)}></StyledInput>
					<CustomButton $check={true} onClick={handleSearch}>검색</CustomButton>
				</SearchBar>
				<SortBar>
					<SortDropdown setOrderBy={setOrderBy}></SortDropdown>
				</SortBar>
				{/* 꽃다발 사진 그리드 */}
				<BouquetListGrid>
					{bouquets.map((bouquet, index) => (
						<StyledImageArea
							key={bouquet.bouquetId}
							ref={index === bouquets.length - 1 ? lastBouquetElementRef : null}
						>
							<StyledBouquetImage src={bouquet.imageUrl} onClick={() => openModal(bouquet)} onError={onErrorImg}></StyledBouquetImage>
							<StyledDownloadButton onClick={() => downloadImage(bouquet.imageUrl)}>
								<DownloadSpan className='material-symbols-outlined'>download</DownloadSpan>
								<a href={bouquet.imageUrl} download></a>
							</StyledDownloadButton>
						</StyledImageArea>
					)
					)}
				</BouquetListGrid>
			</StyledBouquetListPage>
			{/* 하단 메뉴바 */}
			<Menu></Menu>
			{/* 꽃다발 상세 정보 모달 */}
			{isBouquetDetailModal && extractedItems && (
				<BouquetDetailModal closeModal={closeModal} $flowers={extractedItems}></BouquetDetailModal>
			)}
		</>
	);
};
