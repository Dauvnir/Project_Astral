import styled from "styled-components";
import { WrapperFlex } from "./WrapperFlex";
import PcMenu from "./PcMenu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
const AvatarWrapper = styled.div`
	display: flex;
	height: 100%;
	width: clamp(15rem, 22rem, 30rem);
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;
const AvatarNickname = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 3;
	width: 70%;
	height: 100%;
	background: rgba(29, 37, 53, 0.7);
	font-size: 1rem;
	overflow: hidden;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	text-align: center;
	color: #e5e9f1;
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
const AvatarImage = styled.img`
	position: relative;
	z-index: 3;
	width: 30%;
	height: 100%;
	background: url("/src/assets/avatar.jpeg") no-repeat center center / cover;
`;
const AdjustedWrapper = styled(WrapperFlex)`
	position: static;
	z-index: 3;
	width: 100vw;
	margin: 3rem 0 3rem 0rem;
	height: 5rem;
	justify-content: right;
	overflow: visible;
	@media (min-width: 1200px) {
		justify-content: space-between;
	}
`;
const LogoutWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 3;
	height: 100%;
	width: 5rem;
	background-color: rgba(29, 37, 53, 1);
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 1);
		transition: background ease 0.5s;
		:is(*) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const LogoutBtn = styled(RiLogoutCircleRLine)`
	width: 80%;
	height: 80%;
	padding: 0.6rem;
`;
const Wrap = styled.div`
	display: flex;
	z-index: 3;
	height: 100%;
	justify-content: right;
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
	border-radius: 10px 0 0 10px;
`;
const Avatar = () => {
	const logout = useLogout();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		navigate("/form/login");
	};
	return (
		<>
			<AdjustedWrapper>
				<PcMenu />
				<Wrap>
					<AvatarWrapper>
						<AvatarNickname>Alicja z kotem</AvatarNickname>
						<AvatarImage></AvatarImage>
					</AvatarWrapper>
					<LogoutWrapper>
						<LogoutBtn style={{ color: "#d9d9d9" }} onClick={signOut} />
					</LogoutWrapper>
				</Wrap>
			</AdjustedWrapper>
		</>
	);
};

export default Avatar;
