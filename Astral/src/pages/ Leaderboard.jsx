import MainBackground from '../components/MainBackground';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';
import StyledLogo from '../components/LogoHeader';
import { WrapperFlex } from '../components/WrapperFlex';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MoveToTop from '../components/MoveToTop';
const LeaderboardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-inline: 1rem;
	width: calc(100% + 3rem);
	background-color: rgba(29, 37, 53, 0.7);
	height: auto;
	position: relative;
	z-index: 2;
	margin-left: -1.5rem;
	/* margin-top: 2rem; */
`;
const LeaderboardHeadersWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: colums;
	width: 100%;
	height: 15%;
`;

const LeaderboardHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	height: 3rem;
	padding-block: 1rem;
`;

const SpanStyled = styled.span`
	color: #d9d9d9;
	font-family: Lato;
	font-size: 1.1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	@media (min-width: 640px) {
		white-space: nowrap;
	}
	@media (min-width: 740px) {
		font-size: 1.25rem;
	}
`;
const WrapperFlexResponsive = styled(WrapperFlex)`
	/* width: clamp(15rem, 80vw, 43rem); */
	width: calc(100% + 2rem);
	justify-content: left;
	margin: 3rem 0 0 -1rem;
	overflow: visible;
	height: 4rem;
	@media (min-width: 600px) {
		width: clamp(15rem, 85vw, 43rem);
	}
`;
const ButtonStyled = styled.button`
	width: 33.3%;
	height: 100%;
	background-color: rgba(29, 37, 53, 0.7);
	padding-inline: 0.5rem;
	padding-block: 0.25rem;
	border: none;
	text-align: left;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
	}
`;
const WrapperGrid = styled.div`
	display: grid;
	width: 100%;
	height: auto;
	grid-template-columns: 25% 40% 35%;
	grid-auto-flow: row;
	row-gap: 1.5rem;
`;
const LeaderboardRowElement = styled(SpanStyled)`
	font-size: 1.5rem;
`;
// const MoveBtn = styled(MoveToTop)`
// 	position: relative;
// 	z-index: 3;
// 	top: 0;
// 	left: 0;
// 	background-color: red;
// `;
const LeaderboardRow = ({ place, name, score }) => {
	let colorCode;
	switch (place) {
		case 1:
			colorCode = '#FFD700';
			break;
		case 2:
			colorCode = '#c0c0c0';
			break;
		case 3:
			colorCode = '#CD7F32';
			break;
		default:
			colorCode = '#d9d9d9';
	}

	return (
		<>
			<LeaderboardRowElement style={{ color: colorCode }}>{place}</LeaderboardRowElement>
			<LeaderboardRowElement style={{ color: colorCode }}>{name}</LeaderboardRowElement>
			<LeaderboardRowElement style={{ color: colorCode }}>{score}</LeaderboardRowElement>
		</>
	);
};
const Leaderboard = () => {
	let navigate = useNavigate();
	const toLibrary = () => {
		let path = `/library`;
		navigate(path);
	};
	const [ReviewsState, setReviewsState] = useState(true);
	const [BookmarkedState, setBookmarkedState] = useState(false);
	const [CommentState, setCommentState] = useState(false);
	const ReviewsStateHandler = () => {
		setReviewsState(true);
		setBookmarkedState(false);
		setCommentState(false);
	};
	const BookmarkedStateHandler = () => {
		setReviewsState(false);
		setBookmarkedState(true);
		setCommentState(false);
	};
	const CommentStateHandler = () => {
		setReviewsState(false);
		setBookmarkedState(false);
		setCommentState(true);
	};

	return (
		<>
			<MainBackground />

			<Menu />
			<WrapperFlex style={{ cursor: 'pointer', marginBottom: '1.5rem' }} onClick={toLibrary}>
				<StyledLogo />
			</WrapperFlex>
			<Avatar />
			<WrapperFlexResponsive $justifyContent='left' $margin='3rem  0 0  -1rem'>
				<ButtonStyled onClick={ReviewsStateHandler} style={{ opacity: ReviewsState ? 1 : 0.5 }}>
					<SpanStyled>Reviews Royale</SpanStyled>
				</ButtonStyled>
				<ButtonStyled
					onClick={BookmarkedStateHandler}
					style={{ opacity: BookmarkedState ? 1 : 0.5 }}>
					<SpanStyled>Bookmarked Bests</SpanStyled>
				</ButtonStyled>
				<ButtonStyled
					style={{ borderTopRightRadius: '20px', opacity: CommentState ? 1 : 0.5 }}
					onClick={CommentStateHandler}>
					<SpanStyled>Comment Champions</SpanStyled>
				</ButtonStyled>
			</WrapperFlexResponsive>
			<LeaderboardWrapper>
				<LeaderboardHeadersWrapper>
					<LeaderboardHeaderWrapper style={{ minWidth: '25%' }}>
						<SpanStyled style={{ fontSize: '1.5rem' }}>Place</SpanStyled>
					</LeaderboardHeaderWrapper>
					<LeaderboardHeaderWrapper style={{ minWidth: '40%' }}>
						<SpanStyled style={{ fontSize: '1.5rem' }}> Nickname</SpanStyled>
					</LeaderboardHeaderWrapper>
					<LeaderboardHeaderWrapper style={{ minWidth: '35%' }}>
						<SpanStyled style={{ fontSize: '1.5rem' }}>Score</SpanStyled>
					</LeaderboardHeaderWrapper>
				</LeaderboardHeadersWrapper>
				<div style={{ height: '100%', width: '100%' }}>
					<WrapperGrid>
						{ReviewsState ? (
							<>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow place={1} name='Patryk' score={1123}></LeaderboardRow>
								<LeaderboardRow place={2} name='Patryk 2 i 3' score={123}></LeaderboardRow>
								<LeaderboardRow place={3} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
							</>
						) : null}
						{BookmarkedState ? (
							<>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow place={1} name='Patryk' score={1123}></LeaderboardRow>
								<LeaderboardRow place={2} name='Patryk 2 i 3' score={123}></LeaderboardRow>
								<LeaderboardRow place={3} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
							</>
						) : null}
						{CommentState ? (
							<>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow place={1} name='Patryk' score={1123}></LeaderboardRow>
								<LeaderboardRow place={2} name='Patryk 2 i 3' score={123}></LeaderboardRow>
								<LeaderboardRow place={3} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow place={4} name='Patryk 3' score={12}></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
								<LeaderboardRow></LeaderboardRow>
							</>
						) : null}
					</WrapperGrid>
				</div>
			</LeaderboardWrapper>
			<MoveToTop />
			<Footer />
		</>
	);
};
LeaderboardRow.propTypes = {
	place: PropTypes.number,
	name: PropTypes.string,
	score: PropTypes.number,
};
export default Leaderboard;
