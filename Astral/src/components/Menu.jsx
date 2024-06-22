import styled from "styled-components";
import { FaTrophy } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ReportBug from "./ReportBug";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeNickname from "./ChangeNickname";
import ChangeAvatar from "./ChangeAvatar";
import DeleteAccount from "./DeleteAccount";
import Logout from "./Logout";
import Notifications from "./Notifications";
import AboutUs from "./AboutUsMenuComponent";
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
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;

const AllBooksIcon = styled(FaBook)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
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
				<Leaderboard onClick={toLeaderboard}></Leaderboard>
				<AllBooksIcon onClick={toBooks} />
			</MenuStyled>
		</>
	);
};
ChangePassword.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeNickname.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeAvatar.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeEmail.propTypes = {
	resetComponent: PropTypes.func,
};
DeleteAccount.propTypes = {
	resetComponent: PropTypes.func,
};
Logout.propTypes = {
	resetComponent: PropTypes.func,
};
AboutUs.propTypes = {
	resetComponent: PropTypes.func,
};

Notifications.propTypes = {
	resetComponent: PropTypes.func,
};
ReportBug.propTypes = {
	resetComponent: PropTypes.func,
};
export default Menu;
