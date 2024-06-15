/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import useRemoveBook from "../hooks/useRemoveBook";
import { FaXmark } from "react-icons/fa6";
import useIsFavourite from "../hooks/useIsFavourite";
import { useState } from "react";
import { useEffect } from "react";
import useToggleFavourite from "../hooks/useToggleFavourite";
import useAddUserChapter from "../hooks/useAddUserChapter";
import useDebounce from "../hooks/useDebounce";
import useFetchUserChapter from "../hooks/useFetchUserChapter";
const enlargeAndShrink = keyframes`
    0% {
        transform: scale(1); /* Normal size at the beginning */
    }
    50% {
        transform: scale(1.2); /* Enlarged size halfway through */
    }
    100% {
        transform: scale(1); /* Back to normal size at the end */
    }
`;
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
	height: 14rem;
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
	border-radius: 0px 0px 5px 5px;
	cursor: pointer;
	overflow: hidden;
	border: none;
	height: 100%;
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
	transition: transform 0.3s ease;
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
	justify-content: end;
	align-items: center;
	flex-direction: column;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.9);
	opacity: 1;
	transition: opacity 0.3s ease;
	gap: 3rem;
`;

const ScalingWrap = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	overflow: hidden;
	justify-self: center;
	box-shadow: ${(props) =>
		props.$favoured === "false"
			? "0px 0px 3px 3px rgba(0, 0, 0, 0.56)"
			: "0px 0px 16px 5px rgba(230, 230, 250, 0.7)"};
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
`;
//0px 0px 20px 10px rgba(42, 82, 190, 0.7)
//0px 0px 20px 10px rgba(46, 204, 113, 0.7)
const IconsWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 30%;
	flex-direction: row;
	gap: 6px;
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
const Input = styled.input`
	width: 100%;
	height: 6rem;
	padding: 0.25rem;
	background: #1d2535e8;
	border: none;
	color: #e5e9f1;
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	white-space: normal;
	text-align: center;
	text-decoration: none;
	&:focus {
		outline: none;
		border-top: none;
	}
`;
const InputWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 10rem;
	text-align: center;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const InputSpan = styled(Span)`
	background: #1d2535e8;
	height: 4rem;
	width: 100%;
	padding: 0.25rem;
`;
const AnimatedSpan = styled(Span)`
	animation: ${enlargeAndShrink} 4s ease-in-out infinite;
	text-shadow: 0px 0px 8px rgba(229, 233, 241, 0.5);
	height: 30%;
`;
const ChapterForLibrary = ({
	imageUrl,
	title,
	srcUrl,
	chapterNumber,
	isEditable,
	manhwaID,
}) => {
	const [favoured, setFavoured] = useState(false);
	const [chapter, setChapter] = useState(chapterNumber);
	const [chapterChanged, setChapterChanged] = useState(false);
	const removeBook = useRemoveBook();
	const isFavouried = useIsFavourite();
	const toggleFavouriedStatus = useToggleFavourite();
	const addUserChapter = useAddUserChapter();
	const debouncedChapter = useDebounce(chapter, 2000);
	const fetchedUserChapter = useFetchUserChapter();

	const handleAddUserChapter = async () => {
		await addUserChapter(manhwaID, chapter);
	};
	const handleToggleFavouriedStatus = async () => {
		await toggleFavouriedStatus(manhwaID, favoured);
		setFavoured(!favoured);
	};
	const handleInputChange = (e) => {
		setChapter(e.target.value);
	};

	const handleRemoveBook = async () => {
		await removeBook(manhwaID);
	};

	const handleChangeChapterOnClick = async () => {
		setChapterChanged(false);
		setChapter(chapterNumber);
		await addUserChapter(manhwaID, chapterNumber);
	};

	useEffect(() => {
		const handleFetchedUserChapter = async () => {
			const chapter_user = await fetchedUserChapter(manhwaID);
			setChapter(chapter_user);
		};
		handleFetchedUserChapter();
	}, [manhwaID]);

	useEffect(() => {
		const fetchIsFavoured = async () => {
			const boolean = await isFavouried(manhwaID);
			setFavoured(boolean);
		};

		fetchIsFavoured();
	}, [isFavouried, manhwaID]);

	useEffect(() => {
		if (isEditable === true) {
			if (debouncedChapter !== chapterNumber) {
				handleAddUserChapter();
			}
		}
	}, [debouncedChapter]);

	useEffect(() => {
		if (chapterNumber !== chapter) {
			setChapterChanged(true);
		} else {
			setChapterChanged(false);
		}
	}, [chapterNumber, chapter]);

	return (
		<ScalingWrap $favoured={`${favoured}`}>
			{isEditable && (
				<Overlay>
					<IconsWrap>
						<div
							style={{ width: "40px", height: "40px" }}
							onClick={handleToggleFavouriedStatus}>
							{favoured ? <FaHeartBrokenStyled /> : <FaHeartStyled />}
						</div>
						<div
							style={{ width: "50px", height: "50px", marginRight: "-8px" }}
							onClick={handleRemoveBook}>
							<FaXmarkStyled />
						</div>
					</IconsWrap>
					<InputWrapper>
						<InputSpan>You can edit chapter now:</InputSpan>
						<Input type="text" value={chapter} onChange={handleInputChange} />
					</InputWrapper>
				</Overlay>
			)}
			<Wrapper
				href={srcUrl}
				target="_blank"
				onClick={handleChangeChapterOnClick}>
				<Image src={imageUrl} loading="lazy" alt={title} />
			</Wrapper>
			<ChapterInformationWrapper>
				<TitleInformation id="chapter">
					<Span style={{ height: "40%" }}>{title}</Span>
					{chapterChanged ? (
						<AnimatedSpan>{chapterNumber}</AnimatedSpan>
					) : (
						<Span style={{ height: "30%" }}> {chapterNumber}</Span>
					)}
					{!isEditable && <Span style={{ height: "30%" }}>{chapter}</Span>}
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
