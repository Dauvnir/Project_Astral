import styled, { keyframes } from "styled-components";

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
	z-index: 5;
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
	margin-block: 1rem;
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
const names = [
	"Cover_1",
	"Cover_2",
	"Cover_3",
	"Cover_4",
	"Cover_5",
	"Cover_6",
	"Cover_7",
	"Cover_8",
	"Cover_9",
	"Cover_10",
	"Cover_11",
	"Cover_12",
	"Cover_13",
	"Cover_14",
	"Cover_15",
	"Cover_16",
	"Cover_17",
	"Cover_18",
];
const ImageCarouselWelcome = () => {
	return (
		<Wrap>
			<ImagesContainer>
				{names.map((name, index) => {
					return (
						<ImageWrap key={index}>
							<Anchor>
								<Image src={`/assets/images/${name}.png`} />
							</Anchor>
						</ImageWrap>
					);
				})}
				{names.map((name, index) => {
					return (
						<ImageWrap key={index}>
							<Anchor>
								<Image src={`/assets/images/${name}.png`} />
							</Anchor>
						</ImageWrap>
					);
				})}
			</ImagesContainer>
		</Wrap>
	);
};

export default ImageCarouselWelcome;
