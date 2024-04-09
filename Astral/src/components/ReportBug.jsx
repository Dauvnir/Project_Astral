import styled from "styled-components";
import { StyledForm } from "../components/StyledForm";
import ChangeWindowTemplate from "./ChangeWindowTemplate";
import { Paragraph } from "./Paragraph";
import { StyledInput } from "./StyledInput";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";

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
`;

const WrapDivForm = styled.div`
	width: 100%;
`;
const ExtendedParagraph = styled(Paragraph)`
	text-align: left;
	padding-bottom: 0.5rem;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
`;

const ReportBug = ({ closeHandler }) => {
	const [manageState, setManageState] = useState(true);

	const handler = () => {
		setManageState(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -30%)" }}>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="600"
						$textAlign="center"
						style={{ width: "100%", marginBottom: "1rem" }}>
						Report Bug
					</Paragraph>
					<StyledForm id="form" method="post" action="">
						<WrapperFlex $flexWrap="wrap" $gap="1rem" $overflow="visible">
							<WrapDivForm>
								<ExtendedParagraph>Your e-mail address.</ExtendedParagraph>
								<StyledInput
									pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
									required
									type="e-mail"
									placeholder="E-mail"></StyledInput>
							</WrapDivForm>
							<WrapDivForm>
								<ExtendedParagraph>You want to talk about..</ExtendedParagraph>
								<StyledInput required placeholder="Topic"></StyledInput>
							</WrapDivForm>
							<WrapDivForm>
								<ExtendedParagraph>Your message.</ExtendedParagraph>
								<StyledTextarea
									required
									placeholder="I want to say that I very like eating tacos...."></StyledTextarea>
							</WrapDivForm>
						</WrapperFlex>
					</StyledForm>
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
ReportBug.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default ReportBug;
