import { Paragraph } from "../components/Paragraph";
import { StyledBtn } from "../components/Btn";
import { StyledText } from "../components/StyledTextForBtn";
import { LineBreak } from "../components/LineBreak";
import { StyledInput } from "../components/StyledInput";
import { StyledForm } from "../components/StyledForm";
import styled from "styled-components";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegistrationSuccess from "../components/RegistrationSuccess";
import axios from "../api/axios";

const Wrap = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	position: relative;
	z-index: 2;
	width: clamp(20rem, 85% + 1rem, 30rem);
	padding: 2rem;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	border-radius: 20px;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	transform: scale(0.9);
	margin-top: -1rem;
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
const RegisteredParagraph = styled(Paragraph)`
	text-align: left;
	font-weight: 600;
	margin-top: 1.5rem;
	font-size: 1.15rem;
	text-decoration: none;
`;
const LabelS = styled.label`
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
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const REGISTER_URL = "/registration";
const SignUpPage = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSucces] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const test1 = USER_REGEX.test(user);
		const test2 = PWD_REGEX.test(pwd);
		const test3 = EMAIL_REGEX.test(email);
		if (!test1 || !test2 || !test3) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			await axios.post(REGISTER_URL, JSON.stringify({ user, pwd, email }), {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			setSucces(true);
			setEmail("");
			setPwd("");
			setUser("");
			setMatchPwd("");
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No Server Response");
			} else if (error.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = USER_REGEX.test(user);

		setValidName(result);
	}, [user]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);

		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);

		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd, matchPwd]);
	return (
		<>
			{success ? (
				<section>
					<RegistrationSuccess></RegistrationSuccess>
				</section>
			) : (
				<Wrap>
					<section style={{ width: "100%" }}>
						<Uidnote
							ref={errRef}
							style={{ display: errMsg ? "block" : "none" }}
							aria-live="assertive">
							{errMsg}
						</Uidnote>
						<Paragraph $fontWeight="600" $fontSize="2rem">
							Registration
						</Paragraph>
						<LineBreak />
						<StyledForm id="form2" method="post" onSubmit={handleSubmit}>
							<LabelS htmlFor="username">
								Username:
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
										display: validName || !user ? "none" : "block",
										marginLeft: "0.5rem",
										marginBottom: "-.5rem",
									}}>
									<FaTimes style={{ color: "red" }} />
								</span>
							</LabelS>
							<StyledInput
								type="text"
								id="username"
								autoComplete="off"
								ref={userRef}
								onChange={(e) => setUser(e.target.value)}
								required
								aria-invalid={validName ? "false" : "true"}
								aria-describedby="uidnote"
								onFocus={() => setUserFocus(true)}
								onBlur={() => setUserFocus(false)}
								style={{ margin: "0rem 0 1.5rem 0" }}
							/>
							<Uidnote
								id="uidnote"
								style={{
									display:
										userFocus && !validName && user != "" ? "block" : "none",
								}}>
								<IoInformationCircleSharp style={{ marginRight: "0.35rem" }} />
								4 to 24 characters. <br />
								Must begin with a letter. <br />
								Letters, numbers, underscores, hyphens allowed.
							</Uidnote>
							<LabelS htmlFor="email">
								Email:
								<span
									style={{
										display: validEmail ? "block" : "none",
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
							</LabelS>
							<StyledInput
								type="email"
								id="email"
								autoComplete="off"
								onChange={(e) => setEmail(e.target.value)}
								required
								aria-invalid={validEmail ? "false" : "true"}
								aria-describedby="emailnote"
								onFocus={() => setEmailFocus(true)}
								onBlur={() => setEmailFocus(false)}
								style={{ margin: "0rem 0 1.5rem 0" }}
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
							<LabelS htmlFor=" password">
								Password:
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
							</LabelS>
							<StyledInput
								type="password"
								id="password"
								onChange={(e) => setPwd(e.target.value)}
								required
								aria-invalid={validPwd ? "false" : "true"}
								aria-describedby="pwdnote"
								onFocus={() => setPwdFocus(true)}
								onBlur={() => setPwdFocus(false)}
								style={{ margin: "0rem 0 1.5rem 0" }}
							/>
							<Uidnote
								id="pwdnote"
								style={{
									display:
										pwdFocus && !validPwd && pwd != "" ? "block" : "none",
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
							</Uidnote>
							<LabelS htmlFor="confirm_pwd">
								Confirm Password:
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
							</LabelS>
							<StyledInput
								type="password"
								id="confirm_pwd"
								onChange={(e) => setMatchPwd(e.target.value)}
								required
								aria-invalid={validMatch ? "false" : "true"}
								aria-describedby="confirmnote"
								onFocus={() => setMatchFocus(true)}
								onBlur={() => setMatchFocus(false)}
								style={{ margin: "0rem 0 1rem 0" }}
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
							<LineBreak />
							<StyledBtn
								disabled={!validName || !validPwd || !validMatch ? true : false}
								$width="65%">
								<StyledText>Sign Up</StyledText>
							</StyledBtn>
						</StyledForm>
						<RegisteredParagraph>
							Already registered? <br />
							<span>
								<Link to="/form/login" style={{ color: "inherit" }}>
									Sign In
								</Link>
							</span>
						</RegisteredParagraph>
					</section>
				</Wrap>
			)}
		</>
	);
};

export default SignUpPage;
