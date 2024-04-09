import styled from "styled-components";
import { LineBreak } from "./LineBreak";
import { MdManageAccounts } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import DeleteAccount from "./DeleteAccount";
import ChangeAvatar from "./ChangeAvatar";
import ChangeEmail from "./ChangeEmail";
import ChangeNickname from "./ChangeNickname";
import ChangePassword from "./ChangePassword";
const MenuExtendedStyling = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 3;
	bottom: calc(100% - 2rem);
	width: clamp(12rem, 100%, 35rem);
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	overflow: visible;
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);
	transition: all 0.3s ease;

	@media (min-width: 1200px) {
		display: none;
	}
`;
const UlList = styled.ul`
	text-align: left;
	width: 100%;
	text-decoration: none;
	list-style: none;
	overflow: hidden;
	height: ${(props) => (props.$toggleValue ? 19 : 0)}rem;
	transition: all 0.3s ease;
	@media (min-width: 550px) {
		height: ${(props) => (props.$toggleValue ? 23 : 0)}rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
`;
const LiElement = styled.li`
	padding: 1rem;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const Span = styled.span`
	color: #e5e9f1;
	text-align: center;
	font-family: Inter;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	@media (min-width: 360px) {
		font-size: 1rem;
	}
	@media (min-width: 550px) {
		font-size: 1.625rem;
		font-weight: 400;
	}
`;
const ExtendedLineBreak = styled(LineBreak)`
	margin: 0;
`;
const Account = styled(MdManageAccounts)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
	scale: 1.3;
`;
const WrapperIcon = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	position: relative;
	z-index: 4;
	height: 100%;
	width: 33%;
	padding-block: 10px;
	padding-left: 0.5rem;
	padding-right: 3.5rem;
	overflow: hidden;
	background: inherit;
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

const MenuExtendedAccount = () => {
	const [toggle, setToggle] = useState(false);
	const justToggle = () => {
		setToggle((prev) => !prev);
	};
	let menuExtendedAccount = useRef();
	let btnToExtendAccount = useRef();
	useEffect(() => {
		let handlerAccount = (e) => {
			if (
				toggle &&
				!menuExtendedAccount.current.contains(e.target) &&
				!btnToExtendAccount.current.contains(e.target)
			) {
				justToggle();
			}
		};
		document.addEventListener("mousedown", handlerAccount);
		return () => {
			document.removeEventListener("mousedown", handlerAccount);
		};
	}, [toggle]);
	const [activeComponent, setActiveComponent] = useState(null);
	const handleClick = (componentName) => {
		setActiveComponent(componentName);
		setToggle((prev) => !prev);
	};
	return (
		<>
			<WrapperIcon onClick={() => justToggle()} ref={btnToExtendAccount}>
				<Account></Account>
			</WrapperIcon>
			<MenuExtendedStyling ref={menuExtendedAccount}>
				<UlList $toggleValue={toggle}>
					<LiElement
						style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}
						onClick={() => handleClick("ChangePassword")}>
						<Span>Change Password</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement onClick={() => handleClick("ChangeEmail")}>
						<Span>Change Email</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement onClick={() => handleClick("ChangeNickname")}>
						<Span>Change Nickname</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement onClick={() => handleClick("ChangeAvatar")}>
						<Span>Change Avatar</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement
						onClick={() => handleClick("DeleteAccount")}
						style={{
							paddingBottom: "3rem",
							borderBottomRightRadius: "20px",
							borderBottomLeftRadius: "20px",
						}}>
						<Span>Delete Account</Span>
					</LiElement>
				</UlList>
			</MenuExtendedStyling>
			{activeComponent === "ChangePassword" && <ChangePassword />}
			{activeComponent === "ChangeEmail" && <ChangeEmail />}
			{activeComponent === "ChangeNickname" && <ChangeNickname />}
			{activeComponent === "ChangeAvatar" && <ChangeAvatar />}
			{activeComponent === "DeleteAccount" && <DeleteAccount />}
		</>
	);
};

export default MenuExtendedAccount;
