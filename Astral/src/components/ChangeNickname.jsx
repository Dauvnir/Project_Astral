import { Paragraph } from "./Paragraph";
import { useState, useRef, useEffect } from "react";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";
import useChangeNickname from "../hooks/useChangeNickname";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
const Input = styled(StyledInput)`
	margin: 1rem auto;
`;

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

const Uidnote = styled(Paragraph)`
	text-align: left;
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 1rem;
	border-radius: 20px;
	padding: 1rem;
	background: #28344b;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
`;

const Header = styled.h2`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
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
const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: left;
	flex-wrap: nowrap;
	white-space: nowrap;
	width: 100%;
	text-align: left;
	font-size: 1.25rem;
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
	margin-bottom: 6px;
`;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const ChangeNickname = ({ clearComponents }) => {
	const [display, setDisplay] = useState(true);
	const [nickname, setNickname] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);
	const [success, setSuccess] = useState(false);
	const errRef = useRef();
	const nicknameRef = useRef();
	const changedNickname = useChangeNickname();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await changedNickname(nickname);
			setNickname("");
			setDisplay(false);
			setSuccess(true);
		} catch (error) {
			console.error(Error);
			errRef.current.focus();
		}
	};

	const handleDisplay = () => {
		setDisplay(false);
		clearComponents();
	};

	const handleCloseSuccess = () => {
		setSuccess(false);
		clearComponents();
	};

	useEffect(() => {
		const result = USER_REGEX.test(nickname);
		setValidName(result);
	}, [nickname]);

	useEffect(() => {
		nicknameRef.current.focus();
	}, []);

	return (
		<>
			{display && (
				<Wrap>
					<Paragraph
						$fontSize="1.75rem"
						$fontWeight="600"
						$margin="0 auto 1rem auto"
						style={{ width: "100%" }}>
						Change Nickname
					</Paragraph>

					<form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
						<Label
							style={{ fontWeight: "600", whiteSpace: "nowrap" }}
							htmlFor="nickname">
							New Nickname:
							<span
								style={{
									display: validName ? "block" : "none",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaCheck style={{ color: "green" }} />
							</span>
							<span
								style={{
									display: validName || !nickname ? "none" : "block",
									marginLeft: "0.5rem",
									marginBottom: "-0.5rem",
								}}>
								<FaTimes style={{ color: "red" }} />
							</span>
						</Label>
						<Input
							type="text"
							id="nickname"
							autoComplete="off"
							ref={nicknameRef}
							onChange={(e) => setNickname(e.target.value)}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<Uidnote
							id="uidnote"
							style={{
								display:
									userFocus && !validName && nickname != "" ? "block" : "none",
							}}>
							<IoInformationCircleSharp style={{ marginRight: "0.35rem" }} />
							4 to 24 characters. <br />
							Must begin with a letter. <br />
							Letters, numbers, underscores, hyphens allowed.
						</Uidnote>
						<WrapBtns>
							<Button type="button" onClick={handleDisplay}>
								<Span>Back</Span>
							</Button>
							<Button type="submit">
								<Span>Confirm</Span>
							</Button>
						</WrapBtns>
					</form>
				</Wrap>
			)}
			{success && (
				<Wrap style={{ gap: "1.5rem" }}>
					<Header>Nickname Changed Successfully</Header>
					<Paragraph style={{ fontSize: "1.25rem" }}>
						Your nickname has been updated successfully.
					</Paragraph>
					<Button onClick={handleCloseSuccess}>
						<Span>Close</Span>
					</Button>
				</Wrap>
			)}
		</>
	);
};
ChangeNickname.propTypes = {
	clearComponents: PropTypes.func,
};
export default ChangeNickname;
