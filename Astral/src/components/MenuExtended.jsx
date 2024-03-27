import styled from "styled-components";
import { LineBreak } from "./LineBreak";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect } from "react";
import { useRef } from "react";
import ReportBug from "./ReportBug";
import Notifications from "./Notifications";
import Logout from "./Logout";
import AboutUs from "./AboutUsMenuComponent";
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
	height: ${(props) => (props.$toggleValue ? 19 : 0)}rem;
	@media (min-width: 550px) {
		height: ${(props) => (props.$toggleValue ? 23 : 0)}rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
	transition: height 0.3s ease;
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
const WrapperIconLeft = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	position: relative;
	z-index: 5;
	height: 100%;
	width: 17%;
	padding-block: 10px;
	padding-inline: 0.5rem;
	overflow: visible;
	cursor: pointer;
	background: inherit;
	&:hover {
		background: rgba(217, 217, 217, 1);
		transition: background ease 0.5s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
	border-bottom-left-radius: 20px;
	border-top-left-radius: 20px;
`;
const Hamburger = styled(RxHamburgerMenu)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
	scale: 1.1;
`;
const MenuExtended = () => {
	let navigate = useNavigate();
	const toHome = () => {
		let path = `/library`;
		navigate(path);
	};
	const [toggleValue, setToggleValue] = useState(false);
	const changeValueOfToggle = () => {
		setToggleValue((prev) => !prev);
	};
	let menuExtended = useRef();
	let btnToExtend = useRef();
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

	const [activeComponent, setActiveComponent] = useState(null);
	const handleClick = (componentName) => {
		setActiveComponent(componentName);
		setToggleValue((prev) => !prev);
	};

	return (
		<>
			<WrapperIconLeft onClick={() => changeValueOfToggle()} ref={btnToExtend}>
				<Hamburger />
			</WrapperIconLeft>
			<MenuExtendedStyling ref={menuExtended}>
				<UlList $toggleValue={toggleValue}>
					<LiElement
						onClick={toHome}
						style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>
						<Span>Home</Span>
					</LiElement>
					<ExtendedLineBreak />
					<LiElement onClick={() => handleClick("Notifications")}>
						<Span>Notifications</Span>
					</LiElement>
					<ExtendedLineBreak />
					<LiElement onClick={() => handleClick("ReportBug")}>
						<Span>Report bug</Span>
					</LiElement>
					<ExtendedLineBreak />
					<LiElement onClick={() => handleClick("AboutUs")}>
						<Span>About us</Span>
					</LiElement>
					<ExtendedLineBreak />
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
			{activeComponent === "Notifications" && <Notifications />}
			{activeComponent === "ReportBug" && <ReportBug />}
			{activeComponent === "AboutUs" && <AboutUs />}
			{activeComponent === "LogOut" && <Logout />}
		</>
	);
};

export default MenuExtended;
