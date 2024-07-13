import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";
import styled from "styled-components";
import { useState } from "react";
import useSetAvatar from "../hooks/useSetAvatar";
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 5;
	width: clamp(15rem, 90%, 25rem);
	height: 30rem;
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

const Span = styled.span`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 700;
	font-size: 1rem;
	@media (min-width: 420px) {
		font-size: 1.25rem;
	}
`;
const WrapBtns = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 100%;
	height: 30%;
`;

const Title = styled(Paragraph)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-weight: 600;
	height: 20%;
	width: 100%;
`;
const Settings = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const List = styled.ul`
	width: 100%;
	height: 70%;
	list-style: none;
	text-align: center;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;
const ListElement = styled.li`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SettingButton = styled.button`
	border: none;
	background: #283449;
	height: 5rem;
	width: 7rem;
	border-radius: 20px;
	padding: 0.25rem;
	cursor: pointer;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease-in-out 0.3s;
		:is(span) {
			color: #28344b;
			transition: color ease-in-out 0.3s;
		}
	}
	@media (min-width: 420px) {
		width: 9rem;
	}
`;
const SettingWindow = styled.div`
	width: 18rem;
	height: auto;
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	grid-auto-flow: row;
`;
const AvatarWrap = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Img = styled.img`
	height: 80%;
	width: 100%;
	object-fit: contain;
	cursor: pointer;
`;

const SuccessMessage = styled.p`
	height: 40%;
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const avatarNames = [
	"chicken",
	"dog",
	"dog2",
	"gamer",
	"girl",
	"man",
	"panda",
	"woman",
	"woman2",
];
const Notifications = ({ closeComponent }) => {
	const [activeComponent, setActiveComponent] = useState("");
	const [success, setSuccess] = useState(false);
	const setAvatar = useSetAvatar();

	const handlerActiveComponent = (component) => {
		setActiveComponent(component);
	};
	const handlerCloseActiveComponent = () => {
		setActiveComponent("");
	};

	const handlerAvatarName = (name) => {
		setAvatar(name);
		handlerCloseActiveComponent();
		setSuccess(true);
	};

	return (
		<Wrap>
			{!success ? (
				<>
					<Title>
						{activeComponent === "" && "Settings"}
						{activeComponent === "Avatar" && "Change Avatar"}
						{activeComponent === "Notifications" && "Set Notifications"}
					</Title>
					<Settings>
						{activeComponent === "" && (
							<List>
								<ListElement>
									<SettingButton
										onClick={() => handlerActiveComponent("Avatar")}>
										<Span>Avatar</Span>
									</SettingButton>
								</ListElement>
								<ListElement>
									<SettingButton
										onClick={() => handlerActiveComponent("Notifications")}>
										<Span>Notifications</Span>
									</SettingButton>
								</ListElement>
								<ListElement>
									<SettingButton disabled>
										<Span>In progress</Span>
									</SettingButton>
								</ListElement>
								<ListElement>
									<SettingButton disabled>
										<Span>In progress</Span>
									</SettingButton>
								</ListElement>
							</List>
						)}
						{activeComponent === "Avatar" && (
							<SettingWindow>
								{avatarNames.map((avatar, index) => {
									return (
										<AvatarWrap key={index}>
											<Img
												src={`/assets/avatars/${avatar}.png`}
												alt={avatar}
												onClick={() => handlerAvatarName(avatar)}
											/>
										</AvatarWrap>
									);
								})}
							</SettingWindow>
						)}
						{activeComponent === "Notifications" && (
							<SettingWindow>
								<p>Avatar</p>
							</SettingWindow>
						)}
						<WrapBtns>
							<SettingButton
								style={{ height: "4rem" }}
								onClick={
									activeComponent === ""
										? closeComponent
										: handlerCloseActiveComponent
								}>
								<Span>Back</Span>
							</SettingButton>
						</WrapBtns>
					</Settings>
				</>
			) : (
				<>
					<Title>Success!</Title>
					<SuccessMessage>
						<Span style={{ fontSize: "1.5rem" }}>
							Your avatar was changed succesfully!
							<br />
							To see changes you must re-log.
						</Span>
					</SuccessMessage>
					<WrapBtns style={{ alignItems: "center" }}>
						<SettingButton style={{ height: "4rem" }} onClick={closeComponent}>
							<Span>Confirm</Span>
						</SettingButton>
					</WrapBtns>
				</>
			)}
		</Wrap>
	);
};
Notifications.propTypes = {
	closeComponent: PropTypes.func,
};
export default Notifications;
