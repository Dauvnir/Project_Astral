import styled from "styled-components";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { useEffect } from "react";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { FaHeart } from "react-icons/fa";

const DivFirstMain = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	gap: 3rem;
	margin-top: 2rem;
	height: 30rem;
	@media (max-width: 700px) {
		width: 100vw;
		padding-inline: 1rem;
		flex-wrap: wrap;
		height: 80rem;
		gap: 0px;
	}
	@media (min-width: 701px) and (max-width: 1000px) {
		width: 100vw;
		padding-inline: 1rem;
		height: clamp(25rem, 65vw + 1rem, 30rem);
		gap: 0px;
	}
`;
const DivPlaces = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: inherit;
	gap: 1rem;
	padding: 1rem;
	width: 20rem;
	transform: scale(0.85);
	@media (max-width: 700px) {
		width: 100%;
		height: 27rem;
		transform: scale(0.85);
	}
	@media (min-width: 701px) and (max-width: 1000px) {
		transform: scale(0.9);
		height: 100%;
		gap: 2rem;
	}
`;
const SecondPlace = styled(DivPlaces)`
	@media (max-width: 700px) {
		order: 2;
	}
`;
const ThirdPlace = styled(DivPlaces)`
	@media (max-width: 700px) {
		order: 3;
	}
`;
const DivFirstPlace = styled(DivPlaces)`
	transform: scale(1);
	@media (max-width: 700px) {
		transform: scale(1);
		order: 1;
	}
`;
const DivImageWrapper = styled.div`
	height: 70%;
	border-radius: 15px;
	box-shadow: 0px 0px 16px 5px rgba(255, 230, 0, 1);
	@media (min-width: 701px) and (max-width: 1000px) {
		transform: scale(1);
		height: 55%;
	}
`;
const ImgPlaces = styled.img`
	height: 100%;
	width: 100%;
	object-fit: scale-down;
	border-radius: 15px;
	filter: drop-shadow(0 0 0.5rem black);
`;
const DivData = styled.div`
	height: 30%;
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	gap: 0.5rem;
`;
const Header = styled.h2`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	font-weight: 800;
`;
const Paragraph = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
	font-size: 1.5rem;
	white-space: nowrap;
`;

const FaHeartStyled = styled(FaHeart)`
	width: 2rem;
	height: 2rem;
	color: #e74c3c;
	margin-left: 0.75rem;
`;
const HeaderH1 = styled.h1`
	position: relative;
	z-index: 1;
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 700;
	font-size: clamp(2rem, 2vw + 1rem, 5rem);
	margin-left: 1rem;
	@media (max-width: 700px) {
		font-size: 2rem;
	}
`;
const DivSecondMain = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	position: relative;
	z-index: 1;
	max-width: 45rem;
	height: 10rem;
	overflow: hidden;
	border-radius: 10px;
	background-color: rgba(29, 37, 53, 0.7);
	margin-inline: 1rem;
	box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.56);
	margin-bottom: 2rem;
	/* color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 700; */
	@media (min-width: 700px) {
		height: 15rem;
		margin-inline: 5rem;
		max-width: 55rem;
	}
	@media (min-width: 1000px) {
		margin-inline: auto;
	}
`;
const Place = styled.p`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 700;
	font-size: 1.25rem;
	text-align: center;
	margin-block: auto;
	margin-left: 0.5rem;
	width: 10%;
	@media (min-width: 700px) {
		font-size: 2rem;
		margin-left: 0px;
	}
`;
const Image = styled.img`
	border-radius: 10px;
	margin-block: auto;
	filter: drop-shadow(0px 0px 5px black);
	object-fit: scale-down;
	height: 80%;
`;
const Title = styled(Place)`
	width: 100%;
	margin: 0;
	@media (min-width: 700px) {
		width: 70%;
	}
`;
const Follows = styled(Place)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	margin: 0;
	@media (min-width: 700px) {
		width: 30%;
	}
`;
const TitleAndFollow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 50%;
	margin-right: 0.5rem;
	height: 80%;
	gap: 1rem;
	@media (min-width: 700px) {
		flex-direction: row;
		margin-right: 2rem;
	}
`;
const ImageWrap = styled(TitleAndFollow)`
	padding: 0px;
	gap: 0px;
	width: 40%;
	height: 100%;
	@media (min-width: 700px) {
		margin-right: 0rem;
	}
`;
const LeaderBoardComponent = () => {
	const [leaderboard, setLeaderboard] = useState([]);
	const [firstPlaces, setFirstPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchLeaderboard = useGetLeaderboard();

	useEffect(() => {
		if (
			fetchLeaderboard.leaderboard &&
			fetchLeaderboard.leaderboard.length > 0
		) {
			const data = fetchLeaderboard.leaderboard;
			data.sort((a, b) => {
				return parseInt(b.favorite_count) - parseInt(a.favorite_count);
			});
			const mainPlaces = data.slice(0, 3);
			const rest = data.slice(3);
			setFirstPlaces(mainPlaces);
			setLeaderboard(rest);
			setLoading(false);
		}
	}, [fetchLeaderboard.leaderboard]);

	if (loading) {
		return (
			<>
				<HeaderH1>Top popular</HeaderH1>
				<DivFirstMain>
					<BarLoader height={5} width={300} color="#d9d9d9" />
				</DivFirstMain>
			</>
		);
	}

	return (
		<>
			<HeaderH1>Top popular</HeaderH1>
			<DivFirstMain>
				<SecondPlace>
					<DivImageWrapper
						style={{ boxShadow: "0px 0px 16px 5px rgba(192, 192, 192, 1)" }}>
						<ImgPlaces src={firstPlaces[1].srcimg} alt={firstPlaces[1].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[1].title}</Header>
						<Paragraph>
							<span>{firstPlaces[1].favorite_count}</span>
							<FaHeartStyled />
						</Paragraph>
					</DivData>
				</SecondPlace>
				<DivFirstPlace>
					<DivImageWrapper>
						<ImgPlaces src={firstPlaces[0].srcimg} alt={firstPlaces[0].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[0].title} </Header>
						<Paragraph>
							<span>{firstPlaces[0].favorite_count}</span>
							<FaHeartStyled />
						</Paragraph>
					</DivData>
				</DivFirstPlace>
				<ThirdPlace>
					<DivImageWrapper
						style={{ boxShadow: "0px 0px 16px 5px rgba(205, 127, 50, 1)" }}>
						<ImgPlaces src={firstPlaces[2].srcimg} alt={firstPlaces[2].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[2].title}</Header>
						<Paragraph>
							<span>{firstPlaces[2].favorite_count}</span>
							<FaHeartStyled />
						</Paragraph>
					</DivData>
				</ThirdPlace>
			</DivFirstMain>
			{leaderboard.map((book, index) => (
				<DivSecondMain key={book.i}>
					<Place>{index + 4}.</Place>
					<ImageWrap>
						<Image src={book.srcimg} alt={book.title} />
					</ImageWrap>
					<TitleAndFollow>
						<Title>
							{book.title.length >= 45
								? book.title.slice(0, 45).replace(/\s+$/, "") + "..."
								: book.title}
						</Title>
						<Follows>
							{book.favorite_count}
							<FaHeartStyled />
						</Follows>
					</TitleAndFollow>
				</DivSecondMain>
			))}
		</>
	);
};

export default LeaderBoardComponent;
{
	/* <DivSecondMain>
{leaderboard.map((book, index) => (
	<UlPlaces key={book.i}>
		<LiPlace>{index + 4}</LiPlace>
		<LiElement>
			<ImgPlaces src={book.srcimg} alt={book.title} />
		</LiElement>
		<LiWrapper>
			<LiWrapperElement>{book.title}</LiWrapperElement>
			<LiWrapperElement>
				{book.favorite_count} <FaHeartStyled />
			</LiWrapperElement>
		</LiWrapper>
	</UlPlaces>
	</DivSecondMain>
))} */
}
