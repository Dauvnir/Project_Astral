import ChangeWindowTemplate from "./ChangeWindowTemplate";
import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import { Label } from "./Label";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = styled(StyledInput)`
	margin: 1rem auto;
`;

const ChangeEmail = ({ resetComponent, closeHandler }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -50%)" }}>
					<Paragraph $fontSize="2rem" $fontWeight="500" $margin="0 auto 1rem auto">
						Change Email
					</Paragraph>
					<Label $textAlign="left" $width="100%" $cursor="default">
						New Email
					</Label>
					<Input placeholder="New Email"></Input>
					<Label $textAlign="left" $width="100%" $cursor="default">
						Confirm New Email
					</Label>
					<Input placeholder="Confirm New Email ?"></Input>
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
ChangeEmail.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default ChangeEmail;
