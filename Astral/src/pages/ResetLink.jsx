import styled from "styled-components";
import { Paragraph } from "../components/Paragraph";
import { StyledInput } from "../components/StyledInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "../api/axios";
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 5;
	width: clamp(15rem, 90%, 25rem);
	height: auto;
	background-color: rgba(29, 37, 53, 0.7);
	left: 50%;
	top: 50%;
	margin: 0 auto;
	transform: translate(-50%, -50%);
	border-radius: 20px;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 4px 1px;
	pointer-events: auto;
`;
const Header = styled(Paragraph)`
	font-size: 1.75rem;
	font-weight: 600;
	margin: 0 auto 1rem auto;
	width: 100%;
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
const Input = styled(StyledInput)`
	margin: 1rem auto;
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
const Uidnote = styled(Paragraph)`
	text-align: left;
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 1rem;
	border-radius: 20px;
	padding: 1rem;
	background: #28344b;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: 100%;
`;

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const ResetLink = () => {
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	const [display, setDisplay] = useState(true);
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const emailRef = useRef();
	const errRef = useRef();

	const handleSubmit = async (e) => {
		const test = EMAIL_REGEX.test(email);

		if (!test) {
			setErrMsg("Invalid Entry");
			return;
		}

		e.preventDefault();

		try {
			await axios.post(
				"/forgotPassword",
				{ email },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			setDisplay(false);
			setSuccess(true);
			setEmail("");
			setErrMsg("");
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No Server Response");
			} else if (error.response?.status === 404) {
				setErrMsg("Email not found");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [email]);

	return (
		<>
			{display && (
				<Wrap>
					<Header>Send Reset Link</Header>
					<Uidnote
						ref={errRef}
						style={{ display: errMsg ? "block" : "none" }}
						aria-live="assertive">
						{errMsg}
					</Uidnote>
					<form onSubmit={handleSubmit}>
						<Label htmlFor="email">
							Your email address:
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
							autoComplete="off"
							ref={emailRef}
							onChange={(e) => setEmail(e.target.value)}
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
							<IoInformationCircleSharp
								style={{ marginRight: "0.35rem", marginBottom: "-0.12rem" }}
							/>
							Must include @ letter and . following by domain. <br />
							Letters, numbers, underscores, hyphens and other special
							characters allowed.
						</Uidnote>
						<WrapBtns>
							<Link
								to="/form/login"
								style={{ textDecoration: "none", margin: "auto" }}>
								<Button type="button">
									<Span>Back</Span>
								</Button>
							</Link>
							<Button type="submit" disabled={!validEmail ? true : false}>
								<Span>Confirm</Span>
							</Button>
						</WrapBtns>
					</form>
				</Wrap>
			)}

			{success && (
				<Wrap style={{ gap: "1.5rem" }}>
					<Header>Reset Link Sent</Header>
					<Paragraph style={{ fontSize: "1.25rem" }}>
						Reset link was sent to your email address.
					</Paragraph>
					<Link
						to="/form/login"
						style={{ textDecoration: "none", margin: "auto" }}>
						<Button type="button">
							<Span>Confirm</Span>
						</Button>
					</Link>
				</Wrap>
			)}
		</>
	);
};

export default ResetLink;
