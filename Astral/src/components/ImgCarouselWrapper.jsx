import ImgLinks from './ImgLinks';
import styled, {keyframes} from 'styled-components';

const slider = keyframes`
	to{
		transform: translateX(calc(-50% - 0.25rem))
		
	}	
`;

const StyledImgCarouselWrapper = styled.div`
	max-width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	margin-top: 1.5rem;
	padding-top: 1rem;
	padding-bottom: 0.5rem;
	overflow: hidden;
`;

const StyledImgCarouselElements = styled.ul`
	display: flex;
	z-index: 2;
	align-items: flex-start;
	white-space: nowrap;
	height: auto;
	gap: 0.5rem;
	margin-bottom: 1rem;
	animation: ${slider} 40s linear infinite reverse; // variable for reverse can be created
	width: max-content;
	pointer-events: none;
	&:hover {
		animation-play-state: paused, running;
	}
`;

const StyledImgCarouselElement = styled.li`
	flex-shrink: 0;
	position: relative;
	list-style-type: none;
	width: 7rem;
	height: 11rem;
	transform: scale(0.9);
	pointer-events: auto;
	&:hover {
		transform: scale(1.1);
		z-index: 3;
		animation-play-state: paused, running;
	}
`;

const StyledImgElement = styled.img`
	border-radius: 0.3125rem;
	border: 2px solid #000;
	box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.56);
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

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
