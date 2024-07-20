import { Paragraph } from "./Paragraph";
import { useState, useRef, useEffect } from "react";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useChangePassword from "../hooks/useChangePassword";

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

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;

const ChangePassword = ({ closeComponent }) => {
	const changedPassword = useChangePassword();

	const [success, setSuccess] = useState(false);
	const [display, setDisplay] = useState(true);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const errRef = useRef();
	const passwordRef = useRef();

	const handleCloseSuccess = () => {
		setSuccess(false);
		closeComponent();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await changedPassword(pwd);
			setPwd("");
			setMatchPwd("");
			setDisplay(false);

			setSuccess(true);
		} catch (error) {
			console.error(Error);
			errRef.current.focus();
		}
	};

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd]);

	useEffect(() => {
		passwordRef.current.focus();
	}, []);

	return (
		<>
			{display && (
				<Wrap>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						Change Password
					</Paragraph>
					<form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
						<Label
							style={{ fontWeight: "600", whiteSpace: "nowrap" }}
							htmlFor="password">
							New Password:
							<span
								style={{
									display: validPwd && pwd != "" ? "block" : "none",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaCheck style={{ color: "green" }} />
							</span>
							<span
								style={{
									display: validPwd || !pwd ? "none" : "block",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaTimes style={{ color: "red" }} />
							</span>
						</Label>
						<Input
							type="password"
							id="password"
							ref={passwordRef}
							onChange={(e) => setPwd(e.target.value)}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<Uidnote
							id="pwdnote"
							style={{
								display: pwdFocus && !validPwd && pwd != "" ? "block" : "none",
							}}>
							<IoInformationCircleSharp style={{ marginRight: "0.35rem" }} />
							8 to 24 characters. <br />
							Must include uppercase and lowercase letters,
							<br /> a number and a special character. <br />
							Allowed special characters:
							<span aria-label="exclamation mark">! </span>
							<span aria-label="at symbol">@ </span>
							<span aria-label="hashtag"># </span>
							<span aria-label="dollar sign">$ </span>
							<span aria-label="percent">%</span>
							<span aria-label="ampersand">&</span>
						</Uidnote>
						<Label
							style={{ fontWeight: "600", whiteSpace: "nowrap" }}
							htmlFor="confirm_pwd">
							Confirm New Password:
							<span
								style={{
									display: validMatch && matchPwd ? "block" : "none",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaCheck style={{ color: "green" }} />
							</span>
							<span
								style={{
									display: validMatch || !matchPwd ? "none" : "block",
									marginLeft: "0.5rem",
									marginBottom: "-.5rem",
								}}>
								<FaTimes style={{ color: "red" }} />
							</span>
						</Label>
						<Input
							type="password"
							id="confirm_pwd"
							onChange={(e) => setMatchPwd(e.target.value)}
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
							Must match the first password input field.
						</Uidnote>
						<WrapBtns>
							<Button type="button" onClick={closeComponent}>
								<Span>Back</Span>
							</Button>
							<Button
								type="submit"
								disabled={!validPwd || !validMatch ? true : false}>
								<Span>Confirm</Span>
							</Button>
						</WrapBtns>
					</form>
				</Wrap>
			)}

			{success && (
				<Wrap style={{ gap: "1.5rem" }}>
					<Header>Password Changed Successfully</Header>
					<Paragraph style={{ fontSize: "1.25rem" }}>
						Your password has been updated successfully.
					</Paragraph>
					<Button onClick={handleCloseSuccess}>
						<Span>Close</Span>
					</Button>
				</Wrap>
			)}
		</>
	);
};
ChangePassword.propTypes = {
	closeComponent: PropTypes.func,
};
export default ChangePassword;
