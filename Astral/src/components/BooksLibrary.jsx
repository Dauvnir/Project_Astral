import WrapperGrid from "../components/WrapperGrid";
import { LineBreak } from "../components/LineBreak";
import ChapterListForLibrary from "../components/ChapterListForLibrary";
import styled from "styled-components";
import { WrapperFlex } from "./WrapperFlex";
import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { RiBookFill } from "react-icons/ri";
import { RiBookMarkFill } from "react-icons/ri";
const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: 100vw;
	height: auto;
	position: relative;
	z-index: 2;
	padding-block: 1rem;
`;
const ChapterWrapper = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	width: 100vw;
	height: auto;
	flex-grow: 1;
	position: relative;
	z-index: 2;
	padding: 2rem 1rem;
	overflow: hidden;
`;
const ModifiedWrapperFlex = styled(WrapperFlex)`
	overflow: visible;
	width: auto;
	margin-left: 1rem;
`;
const ModifiedWrapperFlexBtn = styled(WrapperFlex)`
	overflow: visible;
	width: auto;
	gap: 1rem;
	justify-content: flex-start;
	transform: scale(0.9);
	margin-right: 0.25rem;
	@media (min-width: 501px) {
		transform: scale(1);
		margin-right: 1rem;
	}
	@media (min-width: 801px) {
		gap: 2rem;
		margin-right: 2rem;
	}
`;
const LockStyled = styled(FaLock)`
	color: rgba(217, 217, 217, 0.9);
	width: 60%;
	height: auto;
`;

const FaUnlockStyled = styled(FaUnlock)`
	color: rgba(217, 217, 217, 0.9);
	width: 60%;
	height: auto;
`;
const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #afbfd5;
	border-radius: 10px;
	width: 56px;
	height: 56px;
	cursor: pointer;
`;
const RiBookFillStyled = styled(RiBookFill)`
	width: 100%;
	height: 80%;
	cursor: pointer;
	color: rgba(217, 217, 217, 0.9);
`;
const RiBookBookmarkStyled = styled(RiBookMarkFill)`
	width: 100%;
	height: 80%;
	cursor: pointer;
	color: rgba(217, 217, 217, 0.9);
`;
const BooksLibrary = () => {
	const [isEditable, setIsEditable] = useState(false);
	const handleIsEditable = () => {
		setIsEditable((prev) => !prev);
	};
	const [isFavourite, setIsFavourite] = useState(false);
	const isFavouriteHandler = () => {
		setIsFavourite((prev) => !prev);
	};
	return (
		<>
			<BookWrapper>
				<ModifiedWrapperFlex>
					<Paragraph
						$fontSize="clamp(2rem, 2vw + 1rem , 5rem)"
						$textAlign="left"
						$fontWeight="600">
						Library
					</Paragraph>
				</ModifiedWrapperFlex>
				<ModifiedWrapperFlexBtn>
					<StyledDiv onClick={isFavouriteHandler}>
						{!isFavourite ? <RiBookFillStyled /> : <RiBookBookmarkStyled />}
					</StyledDiv>
					<StyledDiv onClick={handleIsEditable}>
						{!isEditable ? <LockStyled /> : <FaUnlockStyled />}
					</StyledDiv>
				</ModifiedWrapperFlexBtn>
			</BookWrapper>
			<LineBreak style={{ width: "100vw", height: "2px", margin: "0" }} />
			<ChapterWrapper>
				<WrapperGrid>
					<ChapterListForLibrary
						isEditable={isEditable}
						isFavourite={isFavourite}
					/>
				</WrapperGrid>
			</ChapterWrapper>
		</>
	);
};

export default BooksLibrary;
