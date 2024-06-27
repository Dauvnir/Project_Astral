import { Paragraph } from "./Paragraph";
import { useState, useEffect, useRef } from "react";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";
import useChangeEmail from "../hooks/useChangeEmail";
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
const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const ChangeEmail = ({ closeComponent }) => {
	const [success, setSuccess] = useState(false);
	const [display, setDisplay] = useState(true);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [matchEmail, setMatchEmail] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const changedEmail = useChangeEmail();

	const errRef = useRef();
	const emailRef = useRef();

	const handleCloseSuccess = () => {
		setSuccess(false);
		closeComponent();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await changedEmail(email);
			setEmail("");
			setMatchEmail("");
			setSuccess(true);
			setDisplay(false);
		} catch (error) {
			console.error(Error);
			errRef.current.focus();
		}
	};
	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
		const match = email === matchEmail;
		setValidMatch(match);
	}, [email, matchEmail]);
	useEffect(() => {
		emailRef.current.focus();
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
						Change Email
					</Paragraph>
					<form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
						<Label
							style={{ fontWeight: "600", whiteSpace: "nowrap" }}
							htmlFor="email">
							New Email:
							<span
								style={{
									display: validEmail && email != "" ? "block" : "none",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaCheck style={{ color: "green" }} />
							</span>
							<span
								style={{
									display: validEmail || !email ? "none" : "block",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaTimes style={{ color: "red" }} />
							</span>
						</Label>
						<Input
							type="email"
							id="email"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							required
							aria-invalid={validEmail ? "false" : "true"}
							aria-describedby="emailnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>
						<Uidnote
							id="emailnote"
							style={{
								display:
									emailFocus && !validEmail && email != "" ? "block" : "none",
							}}>
							<IoInformationCircleSharp style={{ marginRight: "0.35rem" }} />
							Must include @ letter and . following by domain. <br />
							Letters, numbers, underscores, hyphens and other special
							characters allowed.
						</Uidnote>
						<Label
							style={{ fontWeight: "600", whiteSpace: "nowrap" }}
							htmlFor="confirm_email">
							Confirm New Email:
							<span
								style={{
									display: validMatch && matchEmail ? "block" : "none",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaCheck style={{ color: "green" }} />
							</span>
							<span
								style={{
									display: validMatch || !matchEmail ? "none" : "block",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaTimes style={{ color: "red" }} />
							</span>
						</Label>
						<Input
							type="email"
							id="confirm_email"
							autoComplete="off"
							onChange={(e) => setMatchEmail(e.target.value)}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<Uidnote
							id="confirmnote"
							style={{
								display: matchFocus && !validMatch ? "block" : "none",
								marginBottom: "0rem",
							}}>
							<IoInformationCircleSharp style={{ marginRight: "0.35rem" }} />
							Must match the first email input field.
						</Uidnote>
						<WrapBtns>
							<Button type="button" onClick={closeComponent}>
								<Span>Back</Span>
							</Button>
							<Button
								type="submit"
								disabled={!validEmail || !validMatch ? true : false}>
								<Span>Confirm</Span>
							</Button>
						</WrapBtns>
					</form>
				</Wrap>
			)}

			{success && (
				<Wrap style={{ gap: "1.5rem" }}>
					<Header>Email Changed Successfully</Header>
					<Paragraph style={{ fontSize: "1.25rem" }}>
						Your email has been updated successfully.
					</Paragraph>
					<Button onClick={handleCloseSuccess}>
						<Span>Close</Span>
					</Button>
				</Wrap>
			)}
		</>
	);
};
ChangeEmail.propTypes = {
	closeComponent: PropTypes.func,
};
export default ChangeEmail;
