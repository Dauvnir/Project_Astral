import {StyledImgCarouselWrapper} from './styled_components/Carousel/StyledImgCarouselWrapper';
import {StyledImgCarouselElements} from './styled_components/Carousel/StyledImgCarouselElements';
import {StyledImgCarouselElement} from './styled_components/Carousel/StyledImgCarouselElement';
import {StyledImgElement} from './styled_components/Carousel/StyledImgElement';
import ImgLinks from './ImgLinks';
const ImgCarouselWrapper = () => {
	return (
		<StyledImgCarouselWrapper>
			<StyledImgCarouselElements>
				{ImgLinks.map((links, index) => (
					<StyledImgCarouselElement key={index}>
						<StyledImgElement src={links.image}></StyledImgElement>
					</StyledImgCarouselElement>
				))}
				{ImgLinks.map((links, index) => (
					<StyledImgCarouselElement key={index}>
						<StyledImgElement src={links.image}></StyledImgElement>
					</StyledImgCarouselElement>
				))}
			</StyledImgCarouselElements>
		</StyledImgCarouselWrapper>
	);
};

export default ImgCarouselWrapper;
