import styled from "styled-components";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { Paragraph } from "../components/Paragraph";
import { StyledBtn } from "../components/Btn";
import { StyledText } from "../components/StyledTextForBtn";
import { LineBreak } from "../components/LineBreak";
import { StyledInput } from "../components/StyledInput";
import { StyledForm } from "../components/StyledForm";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const RegisteredParagraph = styled(Paragraph)`
	text-align: left;
	font-weight: 600;
	font-size: 1.15rem;
	text-decoration: none;
	margin-inline: none;
	width: 50%;
	height: 100%;
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
const ParagrapthWrap = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	gap: 1rem;
	margin-top: 1.5rem;
`;
const LoginForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "success";
	const { setAuth, persist, setPersist } = useAuth();
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		userRef.current.focus();
	}, []);
	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			const accessToken = response?.data?.accessToken;
			setAuth({ user, accessToken });
			setPwd("");
			setUser("");
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No Server Response");
			} else if (error.response?.status === 400) {
				setErrMsg("Missing username or password");
			} else if (error.response?.status === 401) {
				setErrMsg("Invalid username or password");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};
	const togglePersist = () => {
		setPersist((prev) => !prev);
	};
	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);
	return (
		<>
			<BackgroundWrapper
				style={{
					width: "clamp(20rem, 85% + 1rem, 35rem)",
					margin: "0 0 1rem 0",
					paddingInline: "max(2rem, 3vw + 1rem)",
					backdropFilter: "blur(1px)",
					overflow: "visible",
				}}>
				<section style={{ width: "100%" }}>
					<Uidnote
						ref={errRef}
						style={{ display: errMsg ? "block" : "none" }}
						aria-live="assertive">
						{errMsg}
					</Uidnote>
					<Paragraph $fontWeight="600" $fontSize="2rem">
						Sign In
					</Paragraph>
					<LineBreak />
					<StyledForm onSubmit={handleSubmit}>
						<LabelS htmlFor="username">Username:</LabelS>
						<StyledInput
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							style={{ margin: "0.5rem 0 2rem 0" }}
						/>
						<LabelS htmlFor="password">Password:</LabelS>
						<StyledInput
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							style={{ margin: "0rem 0 1rem 0" }}
						/>
						<LineBreak />
						<div
							style={{
								width: "100%",
								display: " flex",
								justifyContent: "left",
								alignItems: "center",
								textAlign: "center",
								flexDirection: "row",
								marginBottom: "1rem",
								cursor: "pointer",
							}}>
							<StyledInput
								type="checkbox"
								id="persist"
								onChange={togglePersist}
								checked={persist}
								style={{ width: "20px", height: "20px", cursor: "pointer" }}
							/>
							<LabelS
								htmlFor="persist"
								style={{ margin: "0 0 0 0.5rem", cursor: "pointer" }}>
								Trust This Device
							</LabelS>
						</div>
						<StyledBtn $width="65%">
							<StyledText>Sign In</StyledText>
						</StyledBtn>
					</StyledForm>
					<ParagrapthWrap>
						<RegisteredParagraph>
							Need an Account? <br />
							<span>
								<Link to="/form/register" style={{ color: "inherit" }}>
									Sign Up
								</Link>
							</span>
						</RegisteredParagraph>
						<RegisteredParagraph style={{ textAlign: "right" }}>
							Forgot password? <br />
							<span>
								<Link to="/form/resetLink" style={{ color: "inherit" }}>
									Reset password
								</Link>
							</span>
						</RegisteredParagraph>
					</ParagrapthWrap>
				</section>
			</BackgroundWrapper>
		</>
	);
};

export default LoginForm;
