import { Menu } from '../../components/menu/Menubar';
import { Header } from '../../components/header/Headerbar';
import {
	StyledCompletePage,
	StyledBouquetImage,
	StyledText,
	StyledImageArea,
	DownloadSpan,
	StyledDownloadButton,
} from './StyledCompletePage';
import { bouquetStore } from '../../stores/bouquetStore';

export const CompletePage = () => {
	const { bouquetUrl } = bouquetStore.getState();
	
	return (
		<>
			<StyledCompletePage>
				<Header link='https://src.hidoc.co.kr/image/lib/2022/11/15/1668491763670_0.jpg'></Header>
				<StyledText $marginTop='0vh' $marginBottom='0.5vh'>
					꽃마리 님에게 전달할{' '}
				</StyledText>
				<StyledText $marginTop='0vh' $marginBottom='0.5vh'>
					꽃다발이 완성되었어요!{' '}
				</StyledText>
				<StyledImageArea>
					<StyledBouquetImage
						src={bouquetUrl}
						alt='img'
					></StyledBouquetImage>
					<StyledDownloadButton>
						<DownloadSpan className='material-symbols-outlined'>download</DownloadSpan>
					</StyledDownloadButton>
				</StyledImageArea>
			</StyledCompletePage>
			<Menu></Menu>
		</>
	);
};
