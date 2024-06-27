// import { useEffect, useState } from "react";
// import useRandomPick from "../hooks/useRandomPick";
import useRandomImage from "../hooks/useRandomImage";
import styled, { keyframes } from "styled-components";
// import { BarLoader } from "react-spinners";
const Slider = keyframes`
	to{
		transform: translateX(calc(-50%));
		-webkit-transform: translateX(calc(-50%));
	}
`;

const Wrap = styled.div`
	width: 100vw;
	height: 16rem;
	position: relative;
	z-index: 2;
	mask: linear-gradient(
		(90deg, transparent, black 20%, black 80%, transparent)
	);
	-webkit-mask: linear-gradient(
		90deg,
		transparent,
		black 20%,
		black 80%,
		transparent
	);
`;

// const WrapSpinner = styled(Wrap)`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// `;
const ImagesContainer = styled.div`
	height: 100%;
	width: max-content;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 2rem;
	animation: ${Slider} 150s linear infinite reverse;
	pointer-events: none;
	&:hover {
		animation-play-state: paused, running;
	}
`;
const ImageWrap = styled.div`
	display: block;
	height: 100%;
	width: 10rem;
	overflow: visible;
	padding-block: 1rem;
	pointer-events: auto;
	&:hover {
		transform: scale(1.1);
		z-index: 3;
		animation-play-state: paused, running;
	}
`;
const Anchor = styled.a`
	display: block;
	height: 14rem;
	object-fit: contain;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.56);
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
const ImgCarouselWrapper = () => {
	const { imageArray } = useRandomImage();
	// const [loading, setLoading] = useState(true);

	// const imagesHandler = async () => {
	// 	const array = await images();
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	imagesHandler();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	// if (loading) {
	// 	return (
	// 		<WrapSpinner>
	// 			<BarLoader height={5} width={400} color="#d9d9d9" />
	// 		</WrapSpinner>
	// 	);
	// }
	return (
		<Wrap>
			<ImagesContainer>
				{imageArray.map((image, index) => (
					<ImageWrap key={index}>
						<Anchor href={image.websiteurl} target="_blank">
							<Image src={image.srcimg} alt={image.title} />
						</Anchor>
					</ImageWrap>
				))}
				{imageArray.map((image, index) => (
					<ImageWrap key={index}>
						<Anchor href={image.websiteurl} target="_blank">
							<Image src={image.srcimg} alt={image.title} />
						</Anchor>
					</ImageWrap>
				))}
			</ImagesContainer>
		</Wrap>
	);
};

export default ImgCarouselWrapper;

// const StyledImgCarouselWrapper = styled.div`
// 	display: flex;
// 	flex-wrap: wrap;
// 	align-items: center;
// 	justify-content: space-between;
// 	height: 14rem;
// 	overflow: hidden;
// 	position: relative;
// 	z-index: 2;
// 	width: 100vw;
// 	mask: linear-gradient((90deg, transparent, black 20%, black 80%, transparent));
// 	-webkit-mask: linear-gradient(90deg, transparent, black 20%, black 80%, transparent);
// 	@media (min-width: 801px) {
// 		height: 17rem;
// 	}
// `;

// const StyledImgCarouselElements = styled.ul`
// 	display: flex;
// 	z-index: 2;
// 	align-items: flex-start;
// 	white-space: nowrap;
// 	height: 100%;
// 	gap: 1rem;
// 	margin-bottom: 1rem;
// 	animation: ${slider} 70s linear infinite reverse; // variable for reverse can be created
// 	-webkit-animation: ${slider} 70s linear infinite reverse;
// 	-moz-animation: ${slider} 70s linear infinite reverse;

// 	width: max-content;
// 	pointer-events: none;
// 	&:hover {
// 		animation-play-state: paused, running;
// 	}
// 	@media (min-width: 801px) {
// 		gap: 2rem;
// 		animation: ${slider2} 70s linear infinite reverse;
// 		-webkit-animation: ${slider2} 70s linear infinite reverse;
// 		-moz-animation: ${slider2} 70s -inear infinite reverse;
// 	}
// `;

// const StyledImgCarouselElement = styled.li`
// 	will-change: transform;
// 	cursor: pointer;
// 	flex-shrink: 0;
// 	position: relative;
// 	list-style-type: none;
// 	width: 8rem;
// 	height: 12rem;
// 	transform: scale(1);
// 	pointer-events: auto;
// 	margin-block: auto;

// 	@media (min-width: 801px) {
// 		transform: scale(1.1);
// 		&:hover {
// 			transform: scale(1.25);
// 			overflow: visible;
// 		}
// 	}
// `;
// const StyledImgElement = styled.img`
// 	border-radius: 0.3125rem;
// 	/* border: 2px solid #000; */
// 	box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.56);
// 	width: 100%;
// 	height: 100%;
// 	transform: translateZ(0) scale(1, 1);
// 	-webkit-transform: translateZ(0) scale(1, 1);
// `;
