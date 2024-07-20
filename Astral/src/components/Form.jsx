import styled from "styled-components";
import { Paragraph } from "./Paragraph";
import { StyledInput } from "./StyledInput";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect } from "react";
import useSendEmail from "../hooks/useSendEmail";
import SubmittedMessage from "./SubmittedMessage";
const Wrap = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	position: relative;
	z-index: 2;
	width: clamp(25rem, 90vw + 1rem, 40rem);
	margin: 1rem;
	min-height: 15rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	padding-block: 2rem;
	border-radius: 20px;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	padding-inline: 2rem;
	@media (min-width: 1200px) {
		width: 35rem;
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	height: 6rem;
	resize: none;
	box-sizing: border-box;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	padding: 0.5rem;
	border-radius: 5px;
	font-weight: 600;
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
	margin-top: 1rem;
`;
const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: left;
	flex-wrap: wrap;
	white-space: wrap;
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
const Input = styled(StyledInput)`
	margin: 1rem auto;
`;
const Button = styled.button`
	border-radius: 10px;
	background: #28344b;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
	border: none;
	cursor: pointer;
	height: 4rem;
	padding: 0.8rem;
	margin: auto;
	width: 8rem;
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
	margin-top: 2rem;
`;

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const Form = () => {
	const [showMessage, setShowMessage] = useState(false);
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [topic, setTopic] = useState("");
	const [validTopic, setValidTopic] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [message, setMessage] = useState("");
	const [validMessage, setValidMessage] = useState(false);
	const [messageFocus, setMessageFocus] = useState(false);

	const sendEmail = useSendEmail();

	const emailRef = useRef();

	useEffect(() => {
		if (topic.length > 3) {
			setValidTopic(true);
		} else {
			setValidTopic(false);
		}
		if (message.length > 15) {
			setValidMessage(true);
		} else {
			setValidMessage(false);
		}
	}, [topic, message]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await sendEmail(email, topic, message);
			setShowMessage(true);
			setEmail("");
			setTopic("");
			setMessage("");
		} catch (error) {
			console.error(Error);
		}
	};
	return (
		<Wrap style={{ borderRadius: "20px" }}>
			<div
				style={{
					filter: showMessage && "blur(2px)",
					pointerEvents: showMessage && "none",
					width: "100%",
				}}>
				<Paragraph
					$fontSize="2rem"
					$fontWeight="600"
					$textAlign="center"
					style={{ width: "100%", marginBottom: "1rem" }}>
					Get in touch with me.
				</Paragraph>
				<form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
					<Label
						style={{ fontWeight: "600", whiteSpace: "nowrap" }}
						htmlFor="email">
						Your email:
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
						<IoInformationCircleSharp
							style={{ marginRight: "0.35rem", marginBottom: "-0.12rem" }}
						/>
						Must include @ letter and . following by domain. <br />
						Letters, numbers, underscores, hyphens and other special characters
						allowed.
					</Uidnote>
					<Label
						style={{ fontWeight: "600", whiteSpace: "nowrap" }}
						htmlFor="problem">
						Topic:
						<span
							style={{
								display: topic && validTopic ? "block" : "none",
								marginLeft: "0.5rem",
								marginBottom: "-.5rem",
							}}>
							<FaCheck style={{ color: "green" }} />
						</span>
						<span
							style={{
								display: validTopic || !topic ? "none" : "block",
								marginLeft: "0.5rem",
								marginBottom: "-.5rem",
							}}>
							<FaTimes style={{ color: "red" }} />
						</span>
					</Label>
					<Input
						type="text"
						id="problem"
						autoComplete="off"
						onChange={(e) => setTopic(e.target.value)}
						required
						aria-invalid={validTopic ? "false" : "true"}
						aria-describedby="topicnote"
						onFocus={() => setMatchFocus(true)}
						onBlur={() => setMatchFocus(false)}
					/>
					<Uidnote
						id="topicnote"
						style={{
							display:
								matchFocus && !validTopic && topic !== "" ? "block" : "none",
							marginBottom: "1rem",
						}}>
						<IoInformationCircleSharp
							style={{ marginRight: "0.35rem", marginBottom: "-0.12rem" }}
						/>
						The minimum length for a topic is 4 letters.
					</Uidnote>
					<Label
						style={{ fontWeight: "600", whiteSpace: "nowrap" }}
						htmlFor="discuss">
						Your message:
						<span
							style={{
								display: message && validMessage ? "block" : "none",
								marginLeft: "0.5rem",
								marginBottom: "-.5rem",
							}}>
							<FaCheck style={{ color: "green" }} />
						</span>
						<span
							style={{
								display: validMessage || !message ? "none" : "block",
								marginLeft: "0.5rem",
								marginBottom: "-.5rem",
							}}>
							<FaTimes style={{ color: "red" }} />
						</span>
					</Label>
					<StyledTextarea
						type="text"
						autoComplete="off"
						id="discuss"
						required
						aria-invalid={validTopic ? "false" : "true"}
						aria-describedby="discussnote"
						onChange={(e) => setMessage(e.target.value)}
						onFocus={() => setMessageFocus(true)}
						onBlur={() => setMessageFocus(false)}
					/>
					<Uidnote
						id="discussnote"
						style={{
							display:
								messageFocus && !validMessage && message !== ""
									? "block"
									: "none",
							marginTop: "1rem",
						}}>
						<IoInformationCircleSharp
							style={{ marginRight: "0.35rem", marginBottom: "-0.12rem" }}
						/>
						The minimum length for a message is 16 letters.
					</Uidnote>
					<WrapBtns>
						<Button
							type="submit"
							disabled={!validEmail || !validTopic ? true : false}>
							<Span>Confirm</Span>
						</Button>
					</WrapBtns>
				</form>
			</div>
			{showMessage && (
				<SubmittedMessage className="Submit" style={{ filter: "blur(0px)" }} />
			)}
		</Wrap>
	);
};

export default Form;
