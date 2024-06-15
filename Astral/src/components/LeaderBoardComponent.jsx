import styled from "styled-components";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { useEffect } from "react";
import { useState } from "react";
import { BarLoader } from "react-spinners";
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
	height: 27rem;
`;
const DivPlaces = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: inherit;
	gap: 1rem;
	padding: 1rem;
	transform: scale(0.85);
`;
const DivFirstPlace = styled(DivPlaces)`
	transform: scale(1);
`;
const DivImageWrapper = styled.div`
	height: 70%;
	border-radius: 15px;
	box-shadow: 0px 0px 16px 5px rgba(255, 230, 0, 1);
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
const Header = styled.h3`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	font-weight: 800;
`;
const Paragraph = styled.p`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
	font-size: 1.15rem;
`;
const DivSecondMain = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 1;
	flex-direction: column;
	flex-grow: 1;
	width: 90%;
	margin: auto;
	background-color: rgba(29, 37, 53, 0.5);
	margin-bottom: 2rem;
	border-radius: 0 0 20px 20px;
`;

const UlPlaces = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	width: 100%;
	height: auto;
	margin: 2rem;
	border-radius: 0px;
`;
const UlElement = styled.ul`
	position: relative;
	z-index: 2;
	width: 100%;
	border-radius: 20px 20px 0px 0px;
	background-color: rgba(29, 37, 53, 0.5);
	padding: 2rem 1rem;
	box-shadow: 0px 0px 3px 3px rgba(230, 230, 250, 0.7);
`;
const LiHeader = styled.li`
	display: inline-block;
	width: 20%;
	text-align: center;
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 800;
	font-size: 1.75rem;
`;
const LiElement = styled(LiHeader)`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
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
			const mainPlaces = data.slice(0, 3);
			const rest = data.slice(3);
			setFirstPlaces(mainPlaces);
			setLeaderboard(rest);
			setLoading(false);
		}
	}, [fetchLeaderboard.leaderboard]);

	if (loading) {
		return (
			<DivFirstMain>
				<BarLoader height={5} width={300} color="#d9d9d9" />
			</DivFirstMain>
		);
	}

	return (
		<>
			<DivFirstMain>
				<DivPlaces>
					<DivImageWrapper
						style={{ boxShadow: "0px 0px 16px 5px rgba(192, 192, 192, 1)" }}>
						<ImgPlaces src={firstPlaces[1].srcimg} alt={firstPlaces[1].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[1].title}</Header>
						<Paragraph>
							<span>#2 Place </span>
							<span>{firstPlaces[1].favorite_count}</span>
						</Paragraph>
					</DivData>
				</DivPlaces>
				<DivFirstPlace>
					<DivImageWrapper>
						<ImgPlaces src={firstPlaces[0].srcimg} alt={firstPlaces[0].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[0].title} </Header>
						<Paragraph>
							<span>#1 Place </span>
							<span>{firstPlaces[0].favorite_count}</span>
						</Paragraph>
					</DivData>
				</DivFirstPlace>
				<DivPlaces>
					<DivImageWrapper
						style={{ boxShadow: "0px 0px 16px 5px rgba(205, 127, 50, 1)" }}>
						<ImgPlaces src={firstPlaces[2].srcimg} alt={firstPlaces[2].title} />
					</DivImageWrapper>
					<DivData>
						<Header>{firstPlaces[2].title}</Header>
						<Paragraph>
							<span>#3 Place </span>
							<span>{firstPlaces[2].favorite_count}</span>
						</Paragraph>
					</DivData>
				</DivPlaces>
			</DivFirstMain>
			<DivSecondMain>
				<UlElement>
					<LiHeader>Place</LiHeader>
					<LiHeader />
					<LiHeader style={{ width: "40%" }}>Title</LiHeader>
					<LiHeader>Followers number</LiHeader>
				</UlElement>
				{leaderboard.map((book, index) => (
					<UlPlaces key={book.i}>
						<LiElement style={{ fontSize: "3rem" }}>{index + 4}</LiElement>
						<LiElement>
							<span style={{ height: "13rem" }}>
								<ImgPlaces src={book.srcimg} alt={book.title} />
							</span>
						</LiElement>
						<LiElement style={{ width: "40%" }}>{book.title}</LiElement>
						<LiElement>{book.favorite_count}</LiElement>
					</UlPlaces>
				))}
			</DivSecondMain>
		</>
	);
};

export default LeaderBoardComponent;
