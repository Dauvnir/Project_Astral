import styled from "styled-components";
import { Paragraph } from "./Paragraph";

const ExtendedParagraph = styled(Paragraph)`
	text-align: left;
	padding-bottom: 0.5rem;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
`;

const SubmitMessageBg = styled.div`
	display: flex;
	place-content: center;
	flex-direction: column;
	position: absolute;
	width: 70%;
	height: auto;
	z-index: 3;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.56);
	padding: 1rem;
`;

const SubmittedMessage = () => {
	return (
		<SubmitMessageBg>
			<Paragraph
				$fontSize="1.5rem"
				$fontWeight="800"
				$textAlign="center"
				style={{ width: "100%", marginBottom: "2rem" }}>
				Thank you for sending us a message!
			</Paragraph>
			<ExtendedParagraph style={{ textAlign: "center" }}>
				We will try to answer as fast as we can.
			</ExtendedParagraph>
		</SubmitMessageBg>
	);
};

export default SubmittedMessage;
