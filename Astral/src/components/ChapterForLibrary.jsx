import styled from "styled-components";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { Paragraph } from "./Paragraph";
import useRemoveBook from "../hooks/useRemoveBook";
import { FaXmark } from "react-icons/fa6";
import useIsFavourite from "../hooks/useIsFavourite";
import { useState } from "react";
import { useEffect } from "react";
import useToggleFavourite from "../hooks/useToggleFavourite";
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
	cursor: pointer;
`;
const Overlay = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	opacity: 1;
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
`;
const IconsWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 30%;
	flex-direction: row;
	gap: calc((100% - 90px) / 2);
`;
const FaHeartStyled = styled(FaHeart)`
	width: 100%;
	height: auto;
	cursor: pointer;
	color: #e74c3c;
	transition: all 0.3s ease;
	&:hover {
		filter: brightness(85%);
		scale: 1.3;
	}
`;
const FaHeartBrokenStyled = styled(FaHeartBroken)`
	width: 100%;
	height: auto;
	cursor: pointer;
	color: #e74c3c;
	transition: all 0.3s ease;
	&:hover {
		filter: brightness(80%);
		scale: 1.3;
	}
`;
const FaXmarkStyled = styled(FaXmark)`
	width: 100%;
	height: auto;
	cursor: pointer;
	color: #e74c3c;
	transition: all 0.3s ease;
	&:hover {
		filter: brightness(80%);
		scale: 1.3;
	}
`;
const ChapterForLibrary = ({
	imageUrl,
	title,
	srcUrl,
	chapterNumber,
	isEditable,
	manhwaID,
}) => {
	let edit = isEditable;
	const [favoured, setFavoured] = useState(false);
	const removeBook = useRemoveBook();
	const isFavouried = useIsFavourite();
	const toggleFavouriedStatus = useToggleFavourite();

	const handleToggleFavouriedStatus = async () => {
		await toggleFavouriedStatus(manhwaID, favoured);
		setFavoured(!favoured);
	};

	const handleRemoveBook = async () => {
		await removeBook(manhwaID);
	};
	const handleIsFavouried = async () => {
		const boolean = await isFavouried(manhwaID);
		setFavoured(boolean);
	};
	useEffect(() => {
		handleIsFavouried();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ScalingWrap>
			{edit && !favoured ? (
				<Overlay>
					<Paragraph
						$fontWeight={"800"}
						$margin={"0"}
						style={{ marginBottom: "1rem" }}>
						Add to favourite or remove book from library.
					</Paragraph>
					<IconsWrap>
						<div
							style={{ width: "40px", height: "40px" }}
							onClick={handleToggleFavouriedStatus}>
							<FaHeartStyled />
						</div>
						<div
							style={{ width: "50px", height: "50px" }}
							onClick={handleRemoveBook}>
							<FaXmarkStyled />
						</div>
					</IconsWrap>
				</Overlay>
			) : null}
			{edit && favoured ? (
				<Overlay>
					<Paragraph
						$fontWeight={"800"}
						$margin={"0"}
						style={{ marginBottom: "1rem" }}>
						Remove favourite or remove book from library.
					</Paragraph>
					<IconsWrap>
						<div
							style={{ width: "40px", height: "40px" }}
							onClick={handleToggleFavouriedStatus}>
							<FaHeartBrokenStyled />
						</div>
						<div
							style={{ width: "50px", height: "50px" }}
							onClick={handleRemoveBook}>
							<FaXmarkStyled />
						</div>
					</IconsWrap>
				</Overlay>
			) : null}
			<Wrapper href={srcUrl} target="_blank">
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
ChapterForLibrary.propTypes = {
	isEditable: PropTypes.bool.isRequired,
	imageUrl: PropTypes.any,
	manhwaID: PropTypes.any,
	title: PropTypes.string,
	srcUrl: PropTypes.string,
	chapterNumber: PropTypes.string,
};

export default ChapterForLibrary;
