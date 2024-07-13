import { Paragraph } from "./Paragraph";
import PropTypes from "prop-types";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 5;
	width: clamp(15rem, 90%, 25rem);
	height: auto;
	background-color: rgba(29, 37, 53, 1);
	left: 50%;
	top: 50%;
	margin: 0 auto;
	transform: translate(-50%, -50%);
	border-radius: 20px;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 10px 4px;
	pointer-events: auto;
	@media (max-width: 1199px) {
		top: -450%;
	}
`;
const Button = styled.button`
	border-radius: 10px;
	background: #28344b;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
	border: none;
	cursor: pointer;
	height: auto;
	padding: 0.8rem;
	margin: auto;
	width: 6rem;
	text-align: center;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease-in-out 0.3s;
		:is(span) {
			color: #28344b;
			transition: color ease-in-out 0.3s;
		}
	}
`;
const Span = styled.span`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
	font-size: 1.25rem;
`;
const WrapBtns = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	width: 100%;
	height: auto;
	overflow: visible;
	margin-block: 1rem;
`;
const Logout = ({ closeComponent }) => {
	const logout = useLogout();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		closeComponent();
		navigate("/form/login");
	};
	return (
		<>
			<Wrap>
				<Paragraph
					$fontSize="2rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					Logout
				</Paragraph>
				<Paragraph
					$fontSize="1.125rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					Do you really want to logout from your library?
				</Paragraph>
				<WrapBtns>
					<Button type="button" onClick={closeComponent}>
						<Span>Back</Span>
					</Button>
					<Button type="button" onClick={signOut}>
						<Span>Confirm</Span>
					</Button>
				</WrapBtns>
			</Wrap>
		</>
	);
};
Logout.propTypes = {
	closeComponent: PropTypes.func,
};
export default Logout;
