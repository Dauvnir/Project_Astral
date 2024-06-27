import styled from "styled-components";
import { FaTrophy } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MenuExtended from "./MenuExtended";
import MenuExtendedAccount from "./MenuExtendedAccount";
const MenuStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 6;
	width: clamp(12rem, calc(100% - 2rem), 35rem);
	height: 4rem;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0rem;
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	overflow: visible;
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);
	margin-bottom: 2rem;

	@media (min-width: 550px) {
		height: 4.5rem;
	}
	@media (min-width: 800px) {
		height: 5rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
`;
const Leaderboard = styled(FaTrophy)`
	height: 80%;
	width: 100%;
	color: #d9d9d9;
`;

const AllBooksIcon = styled(FaBook)`
	height: 80%;
	width: 100%;
	color: #d9d9d9;
`;

const IconWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 5;
	width: 25%;
	height: 100%;
	background: rgba(29, 37, 53, 1);
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 1);
		transition: background ease 0.5s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const IconWrapRight = styled(IconWrap)`
	border-radius: 0 20px 20px 0;
`;
const Menu = () => {
	let navigate = useNavigate();
	const toBooks = () => {
		let path = `/books`;
		navigate(path);
	};

	let navigate2 = useNavigate();
	const toLeaderboard = () => {
		let path2 = "/leaderboard";
		navigate2(path2);
	};

	return (
		<>
			<MenuStyled>
				<MenuExtended />
				<MenuExtendedAccount />
				<IconWrap>
					<Leaderboard onClick={toLeaderboard} />
				</IconWrap>
				<IconWrapRight>
					<AllBooksIcon onClick={toBooks} />
				</IconWrapRight>
			</MenuStyled>
		</>
	);
};

export default Menu;
