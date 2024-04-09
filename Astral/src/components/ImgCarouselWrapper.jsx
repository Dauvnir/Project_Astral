import ImgLinks from "./ImgLinks";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
const slider = keyframes`
	to{
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
	}	
`;
const slider2 = keyframes`
	to{
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
	}	
`;

const StyledImgCarouselWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	height: 14rem;
	overflow: hidden;
	position: relative;
	z-index: 2;
	width: 100vw;
	mask: linear-gradient((90deg, transparent, black 20%, black 80%, transparent));
	-webkit-mask: linear-gradient(90deg, transparent, black 20%, black 80%, transparent);
	@media (min-width: 801px) {
		height: 17rem;
	}
`;

const StyledImgCarouselElements = styled.ul`
	display: flex;
	z-index: 2;
	align-items: flex-start;
	white-space: nowrap;
	height: 100%;
	gap: 1rem;
	margin-bottom: 1rem;
	animation: ${slider} 70s linear infinite reverse; // variable for reverse can be created
	-webkit-animation: ${slider} 70s linear infinite reverse;
	-moz-animation: ${slider} 70s linear infinite reverse;

	width: max-content;
	pointer-events: none;
	&:hover {
		animation-play-state: paused, running;
	}
	@media (min-width: 801px) {
		gap: 2rem;
		animation: ${slider2} 70s linear infinite reverse;
		-webkit-animation: ${slider2} 70s linear infinite reverse;
		-moz-animation: ${slider2} 70s -inear infinite reverse;
	}
`;

const StyledImgCarouselElement = styled.li`
	will-change: transform;
	cursor: pointer;
	flex-shrink: 0;
	position: relative;
	list-style-type: none;
	width: 8rem;
	height: 12rem;
	transform: scale(1);
	pointer-events: auto;
	margin-block: auto;
	&:hover {
		transform: scale(1.1);
		z-index: 3;
		animation-play-state: paused, running;
	}
	@media (min-width: 801px) {
		transform: scale(1.1);
		&:hover {
			transform: scale(1.25);
			overflow: visible;
		}
	}
`;
const StyledImgElement = styled.img`
	border-radius: 0.3125rem;
	/* border: 2px solid #000; */
	box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.56);
	width: 100%;
	height: 100%;
	transform: translateZ(0) scale(1, 1);
	-webkit-transform: translateZ(0) scale(1, 1);
`;

const ImgCarouselWrapper = () => {
	return (
		<StyledImgCarouselWrapper>
			<StyledImgCarouselElements>
				{ImgLinks.map((links, index) => (
					<StyledImgCarouselElement key={index}>
						<StyledImgElement src={links.image} loading="lazy"></StyledImgElement>
					</StyledImgCarouselElement>
				))}
				{ImgLinks.map((links, index) => (
					<StyledImgCarouselElement key={index}>
						<StyledImgElement src={links.image} loading="lazy"></StyledImgElement>
					</StyledImgCarouselElement>
				))}
			</StyledImgCarouselElements>
		</StyledImgCarouselWrapper>
	);
};
ImgCarouselWrapper.propTypes = {
	customWidth: PropTypes.any,
};
export default ImgCarouselWrapper;
