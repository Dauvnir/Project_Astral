import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 2;
	position: relative;
	width: 6rem;
	height: 9rem;
	border-radius: 5px 5px 0 0;
	@media (min-width: 470px) {
		width: 7rem;
		height: 10rem;
	}
	@media (min-width: 700px) {
		width: 8rem;
		height: 12rem;
	}
	@media (min-width: 1000px) {
		width: 9rem;
		height: 13rem;
	}
`;
const ChapterInformationWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	width: 6rem;
	height: 7rem;
	flex-shrink: 0;
	background: rgba(29, 37, 53, 0.8);
	backdrop-filter: blur(2px);
	overflow: hidden;
	border-radius: 0 0 5px 5px;
	border-top: 0px;
	@media (min-width: 470px) {
		width: 7rem;
		height: 8rem;
	}
	@media (min-width: 700px) {
		width: 8rem;
		height: 9rem;
	}
	@media (min-width: 1000px) {
		width: 9rem;
		height: 12rem;
	}
`;
const ChapterInformation = styled.button`
	width: 100%;
	height: 50%;
	padding: 0.5rem;
	background: rgba(7, 9, 13, 0.5);
	backdrop-filter: blur(2px);
	border-radius: 5px;
	text-align: center;
	cursor: pointer;
	overflow: hidden;
	border: none;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(span, label) {
			color: rgba(29, 37, 53, 0.9);
			transition: color ease 0.5s;
			cursor: pointer;
		}
	}
`;

const Span = styled.span`
	color: #e5e9f1;
	text-align: center;
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
// const Label = styled.label`
// 	color: #afbfd5;
// 	text-align: center;
// 	font-family: Lato;
// 	font-size: 0.725rem;
// 	font-style: normal;
// 	font-weight: 400;
// 	line-height: normal;
// 	padding-block: 0.5rem;
// 	cursor: pointer;
// `;
const Image = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 5px 5px 0 0;
	cursor: pointer;
`;
const ScalingWrap = styled.div`
	overflow: visible;
	justify-self: center;
	box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.56);
	border-radius: 5px;
	/* @media (min-width: 360px) {
		transform: scale(0.6); 
	}
	@media (min-width: 500px) {
		transform: scale(0.9);
	}
	@media (min-width: 850px) {
		transform: scale(1);
	} */
`;
const Chapter = ({ imageUrl, title, srcUrl, chapterNumber }) => {
	return (
		<>
			<ScalingWrap>
				<Wrapper>
					<Image src={imageUrl} loading="lazy" alt={title} href={srcUrl} />
				</Wrapper>
				<ChapterInformationWrapper>
					<ChapterInformation id="chapter">
						<Span>{title}</Span>
					</ChapterInformation>
					<ChapterInformation id="chapter">
						<Span>{chapterNumber}</Span>
					</ChapterInformation>
				</ChapterInformationWrapper>
			</ScalingWrap>
		</>
	);
};
Chapter.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	srcUrl: PropTypes.string.isRequired,
	chapterNumber: PropTypes.string,
};

export default Chapter;
