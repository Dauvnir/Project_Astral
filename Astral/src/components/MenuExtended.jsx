import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect } from "react";
import { useRef } from "react";
import ReportBug from "./ReportBug";
import Notifications from "./Notifications";
import Logout from "./Logout";
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
	height: ${(props) => (props.$toggleValue ? 14.5 : 0)}rem;
	@media (min-width: 550px) {
		height: ${(props) => (props.$toggleValue ? 18 : 0)}rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
	transition: all 0.3s ease;
`;
const LiElement = styled.li`
	padding: 1rem;
	cursor: pointer;
	border-bottom: 1px solid rgba(217, 217, 217, 0.9);
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

const IconWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 5;
	width: 25%;
	height: 100%;
	background: rgba(29, 37, 53, 1);
	border-radius: 20px 0 0 20px;
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
const Hamburger = styled(RxHamburgerMenu)`
	display: inline-block;
	height: 80%;
	width: 100%;
	color: #d9d9d9;
	scale: 1.1;
`;
const MenuExtended = () => {
	const [toggleValue, setToggleValue] = useState(false);
	const [activeComponent, setActiveComponent] = useState(null);

	const changeValueOfToggle = () => {
		setToggleValue((prev) => !prev);
	};
	const handleClick = (componentName) => {
		setActiveComponent(componentName);
		setToggleValue((prev) => !prev);
	};
	const closeComponent = () => {
		setActiveComponent(null);
	};

	let navigate = useNavigate();
	let menuExtended = useRef();
	let btnToExtend = useRef();

	const toHome = () => {
		let path = `/library`;
		navigate(path);
	};

	useEffect(() => {
		let handler = (e) => {
			if (
				toggleValue &&
				!menuExtended.current.contains(e.target) &&
				!btnToExtend.current.contains(e.target)
			) {
				changeValueOfToggle();
			}
		};
		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, [toggleValue]);

	return (
		<>
			<IconWrap onClick={() => changeValueOfToggle()} ref={btnToExtend}>
				<Hamburger />
			</IconWrap>
			<MenuExtendedStyling ref={menuExtended}>
				<UlList $toggleValue={toggleValue}>
					<LiElement
						onClick={toHome}
						style={{
							borderTopRightRadius: "20px",
							borderTopLeftRadius: "20px",
						}}>
						<Span>Home</Span>
					</LiElement>
					<LiElement onClick={() => handleClick("Settings")}>
						<Span>Settings</Span>
					</LiElement>
					<LiElement onClick={() => handleClick("ReportBug")}>
						<Span>Report bug</Span>
					</LiElement>
					<LiElement
						onClick={() => handleClick("LogOut")}
						style={{
							paddingBottom: "3rem",
							borderBottomRightRadius: "20px",
							borderBottomLeftRadius: "20px",
						}}>
						<Span>Log Out</Span>
					</LiElement>
				</UlList>
			</MenuExtendedStyling>
			{activeComponent === "Settings" && (
				<Notifications closeComponent={closeComponent} />
			)}
			{activeComponent === "ReportBug" && (
				<ReportBug closeComponent={closeComponent} />
			)}
			{activeComponent === "LogOut" && (
				<Logout closeComponent={closeComponent} />
			)}
		</>
	);
};

export default MenuExtended;
