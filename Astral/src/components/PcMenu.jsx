import styled from "styled-components";
import { FaTrophy } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdManageAccounts } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReportBug from "./ReportBug";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeNickname from "./ChangeNickname";
import DeleteAccount from "./DeleteAccount";
import Logout from "./Logout";
import Notifications from "./Notifications";
const UlList = styled.ul`
	display: flex;
	list-style: none;
	height: 100%;
`;
const LiElement = styled.li`
	position: relative;
	height: inherit;
`;
const BtnElement = styled.button`
	background-color: rgba(29, 37, 53, 1);
	display: flex;
	place-items: center;
	height: inherit;
	border: none;
	color: #d9d9d9;
	font-size: 1.25rem;
	padding: 1rem;
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
const Wrapper = styled.div`
	display: flex;
	height: inherit;
	position: relative;
	z-index: 3;
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
	border-radius: 0 10px 10px 0;
	@media (max-width: 1199px) {
		display: none;
	}
`;
const Hamburger = styled(RxHamburgerMenu)`
	display: inline-block;
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;
const Account = styled(MdManageAccounts)`
	display: inline-block;
	height: 80%;
	width: 100%;
	color: #d9d9d9;
`;

const Leaderboard = styled(FaTrophy)`
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;

const AllBooksIcon = styled(FaBook)`
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;
const DropdownIcon = styled(IoMdArrowDropdown)`
	height: 70%;
	width: 70%;
	color: #d9d9d9;
`;
const SubMenu = styled.div`
	display: flex;
	position: absolute;
	z-index: 3;
	left: 0;
	height: ${(props) => (props.$toggleValue ? 19 : 0)}rem;
	overflow: hidden;
	transition: height 0.4s ease;
`;

const AccountSubMenu = styled.div`
	display: flex;
	position: absolute;
	z-index: 3;
	left: 0;
	height: ${(props) => (props.$toggleValue ? 19 : 0)}rem;
	overflow: hidden;
	transition: height 0.4s ease;
`;
const SubMenuBtn = styled(BtnElement)`
	width: 10.45rem;
	border-bottom: 2px solid #afbfd5;
`;
const AccountSubMenuBtn = styled(SubMenuBtn)`
	width: 12.1rem;
	white-space: nowrap;
`;
const UlListSubMenu = styled.ul`
	text-align: left;
	width: 100%;
	text-decoration: none;
	list-style: none;
	overflow: hidden;
	height: ${(props) => (props.$toggleValue ? 19 : 0)}rem;
	transition: all 0.4s ease;
`;
const PcMenu = () => {
	let navigate = useNavigate();
	const toLeaderboard = () => {
		let path = "leaderboard";
		navigate(path);
	};
	let navigate2 = useNavigate();
	const toBooks = () => {
		let path2 = "books";
		navigate2(path2);
	};
	let navigate3 = useNavigate();
	const toHome = () => {
		let path3 = "/library";
		navigate3(path3);
	};
	const [toggleValue, setToggleValue] = useState(false);
	const changeValueOfToggle = () => {
		setToggleValue((prev) => !prev);
	};
	const [toggleValue2, setToggleValue2] = useState(false);
	const changeValueOfToggle2 = () => {
		setToggleValue2((prev) => !prev);
	};
	let subMenuRef = useRef();
	let accountMenuRef = useRef();
	let subMenuRefList = useRef();
	let accountMenuRefList = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (
				toggleValue &&
				!subMenuRef.current.contains(e.target) &&
				!subMenuRefList.current.contains(e.target)
			) {
				changeValueOfToggle();
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, [toggleValue]);
	useEffect(() => {
		let handler2 = (e) => {
			if (
				toggleValue2 &&
				!accountMenuRefList.current.contains(e.target) &&
				!accountMenuRef.current.contains(e.target)
			) {
				changeValueOfToggle2();
			}
		};
		document.addEventListener("mousedown", handler2);
		return () => {
			document.removeEventListener("mousedown", handler2);
		};
	}, [toggleValue2]);

	const [activeComponent, setActiveComponent] = useState(null);
	const handleClick = (componentName) => {
		setActiveComponent(componentName);
		setToggleValue((prev) => !prev);
		setToggleValue2(false);
	};
	const [activeComponent2, setActiveComponent2] = useState(null);
	const handleClick2 = (componentName) => {
		setActiveComponent2(componentName);
		setToggleValue2((prev) => !prev);
	};
	const closeComponent = () => {
		setActiveComponent(null);
		setActiveComponent2(null);
	};
	return (
		<>
			{activeComponent2 === "ChangePassword" && (
				<ChangePassword closeComponent={closeComponent} />
			)}
			{activeComponent2 === "ChangeEmail" && (
				<ChangeEmail closeComponent={closeComponent} />
			)}
			{activeComponent2 === "ChangeNickname" && (
				<ChangeNickname closeComponent={closeComponent} />
			)}
			{activeComponent2 === "DeleteAccount" && (
				<DeleteAccount closeComponent={closeComponent} />
			)}
			{activeComponent === "Notifications" && (
				<Notifications closeComponent={closeComponent} />
			)}
			{activeComponent === "ReportBug" && (
				<ReportBug closeComponent={closeComponent} />
			)}
			{activeComponent === "LogOut" && (
				<Logout closeComponent={closeComponent} />
			)}
			<Wrapper>
				<UlList>
					<LiElement ref={subMenuRef}>
						<BtnElement onClick={() => changeValueOfToggle()}>
							<Hamburger></Hamburger>
							<span style={{ marginInline: "0.5rem" }}>Menu</span>
							<DropdownIcon />
						</BtnElement>
						<SubMenu $toggleValue={toggleValue} ref={subMenuRefList}>
							<UlListSubMenu $toggleValue={toggleValue}>
								<li>
									<SubMenuBtn onClick={toHome}>
										<span>Home</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn onClick={() => handleClick("Notifications")}>
										<span>Settings</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn onClick={() => handleClick("ReportBug")}>
										<span>Report bug</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn
										style={{
											borderBottomRightRadius: "20px",
											borderBottom: "none",
										}}
										onClick={() => handleClick("LogOut")}>
										<span>Logout</span>
									</SubMenuBtn>
								</li>
							</UlListSubMenu>
						</SubMenu>
					</LiElement>
					<LiElement ref={accountMenuRef}>
						<BtnElement onClick={() => changeValueOfToggle2()}>
							<Account></Account>
							<span style={{ marginInline: "0.5rem" }}>Account</span>
							<DropdownIcon />
						</BtnElement>
						<AccountSubMenu
							$toggleValue={toggleValue2}
							ref={accountMenuRefList}>
							<UlListSubMenu $toggleValue={toggleValue2}>
								<li>
									<AccountSubMenuBtn
										onClick={() => handleClick2("ChangePassword")}>
										<span>Change Password</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn
										onClick={() => handleClick2("ChangeEmail")}>
										<span>Change Email</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn
										onClick={() => handleClick2("ChangeNickname")}>
										<span style={{ whiteSpace: "nowrap" }}>
											Change Nickname
										</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn
										onClick={() => handleClick2("DeleteAccount")}
										style={{
											borderBottom: "none",
											borderRadius: "0px 0px 20px 20px",
										}}>
										<span>Delete Account</span>
									</AccountSubMenuBtn>
								</li>
							</UlListSubMenu>
						</AccountSubMenu>
					</LiElement>
					<LiElement>
						<BtnElement onClick={toLeaderboard}>
							<Leaderboard></Leaderboard>
							<span style={{ marginLeft: "0.5rem" }}>Leaderboards</span>
						</BtnElement>
					</LiElement>
					<LiElement>
						<BtnElement
							style={{ borderRadius: " 0 10px 10px 0" }}
							onClick={toBooks}>
							<AllBooksIcon></AllBooksIcon>
							<span style={{ marginLeft: "0.5rem", whiteSpace: "nowrap" }}>
								Books
							</span>
						</BtnElement>
					</LiElement>
				</UlList>
			</Wrapper>
		</>
	);
};

export default PcMenu;
