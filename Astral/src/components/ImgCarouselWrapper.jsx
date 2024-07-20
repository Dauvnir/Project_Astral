// import { useEffect, useState } from "react";
// import useRandomPick from "../hooks/useRandomPick";
import useRandomImage from "../hooks/useRandomImage";
import styled, { keyframes } from "styled-components";
import { BarLoader } from "react-spinners";
import { useState } from "react";
import { useEffect } from "react";
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

const WrapSpinner = styled(Wrap)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	padding: 1rem;
	@media (max-width: 450px) {
		transform: scale(0.8);
	}
`;
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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, [imageArray]);

	if (isLoading || imageArray.length <= 1) {
		return (
			<WrapSpinner>
				<BarLoader height={5} width={400} color="#d9d9d9" />
			</WrapSpinner>
		);
	}
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
