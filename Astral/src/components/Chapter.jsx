import styled from "styled-components";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";
import { useState } from "react";
import useAddBook from "../hooks/useAddBook";
const Wrapper = styled.a`
	display: flex;
	flex-direction: column;
	z-index: 2;
	position: relative;
	width: 8rem;
	height: 12rem;
	border-radius: 5px 5px 0 0;
	@media (min-width: 1000px) {
		width: 9rem;
		height: 13rem;
	}
`;
const ChapterInformationWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 8rem;
	height: 10rem;
	background: rgba(29, 37, 53, 0.8);
	backdrop-filter: blur(2px);
	border-radius: 0 0 5px 5px;
	border-top: 0px;
	@media (min-width: 1000px) {
		width: 9rem;
	}
`;
const TitleInformation = styled.p`
	display: flex;
	flex-wrap: wrap;
	background: rgba(7, 9, 13, 0.5);
	backdrop-filter: blur(2px);
	border-radius: 0px;
	cursor: pointer;
	overflow: hidden;
	border: none;
	cursor: pointer;
`;

const Span = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #e5e9f1;
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	white-space: normal;
	width: 100%;
	padding: 0.5rem;
`;
const Image = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 5px 5px 0 0;
	color: #d9d9d9;
	cursor: pointer;
`;
const Overlay = styled.div`
	position: absolute;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	opacity: 0;
	transition: opacity 0.3s ease;
`;

const ScalingWrap = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	overflow: hidden;
	justify-self: center;
	box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.56);
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
	&:hover ${Overlay} {
		opacity: 1;
	}
`;
const OverlayWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	flex-direction: column;
`;
const Button = styled.div`
	cursor: pointer;
	border: none;
	background: rgba(29, 37, 53, 1);
	border-radius: 10px;
	margin-top: 1rem;
	padding: 0.5rem;
	color: #d9d9d9;
	transition: all ease 0.5s;
	&:hover {
		background: #d9d9d9;
		color: rgba(29, 37, 53, 0.8);
	}
`;
const Chapter = ({ imageUrl, title, chapterNumber, manhwaID }) => {
	const addBook = useAddBook();
	const [isClicked, setIsClicked] = useState(false);

	const handlerMouseLeave = () => {
		setTimeout(() => {
			setIsClicked(false);
		}, 500);
	};
	const handleAddBook = () => {
		addBook(manhwaID, chapterNumber);
		setIsClicked(true);
	};
	return (
		<ScalingWrap onMouseLeave={() => handlerMouseLeave()}>
			<Overlay>
				<OverlayWrap>
					<>
						{!isClicked ? (
							<>
								<Paragraph
									$margin="0px"
									$fontWeight="600"
									style={{ paddingInline: "0.25rem" }}>
									Would you like to add this to your library?
								</Paragraph>
								<Button onClick={handleAddBook}>Yes.</Button>
							</>
						) : (
							<Paragraph $fontWeight="600">
								Successfully added to your library.
							</Paragraph>
						)}
					</>
				</OverlayWrap>
			</Overlay>
			<Wrapper>
				<Image src={imageUrl} loading="lazy" alt={title} />
			</Wrapper>
			<ChapterInformationWrapper>
				<TitleInformation id="chapter">
					<Span>{title}</Span>
					<Span> {chapterNumber}</Span>
				</TitleInformation>
			</ChapterInformationWrapper>
		</ScalingWrap>
	);
};
Chapter.propTypes = {
	imageUrl: PropTypes.any,
	manhwaID: PropTypes.any,
	title: PropTypes.string,
	srcUrl: PropTypes.string,
	chapterNumber: PropTypes.string,
};

export default Chapter;
