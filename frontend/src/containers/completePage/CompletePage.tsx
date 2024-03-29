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

	const downloadImage =  () => {
		const link = document.createElement('a');
		link.href = bouquetUrl;
		link.setAttribute('download', 'flower_image');
		link.click();
	}

	return (
		<>
			<StyledCompletePage>
				<Header></Header>
				<StyledText $marginTop='0vh' $marginBottom='0.5vh'>
					꽃마리 님에게 전달할{' '}
				</StyledText>
				<StyledText $marginTop='0vh' $marginBottom='0.5vh'>
					꽃다발이 완성되었어요!{' '}
				</StyledText>
				<StyledImageArea>
					<StyledBouquetImage src={bouquetUrl} alt='img'>
					</StyledBouquetImage>
					<StyledDownloadButton onClick={downloadImage}>
						<DownloadSpan className='material-symbols-outlined'>download</DownloadSpan>
						<a href={bouquetUrl} download></a>
					</StyledDownloadButton>
				</StyledImageArea>
			</StyledCompletePage>
			<Menu></Menu>
		</>
	);
};
