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

const ChangePassword = ({ resetComponent, closeHandler }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};

	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize="2rem" $fontWeight="500" $margin="0 auto 1rem auto">
						Change Password
					</Paragraph>
					<Label $textAlign="left" $width="100%" $cursor="default">
						Old Password
					</Label>
					<Input placeholder="Old Password"></Input>
					<Label $textAlign="left" $width="100%" $cursor="default">
						New Password
					</Label>
					<Input placeholder="New Password"></Input>
					<Label $textAlign="left" $width="100%" $cursor="default">
						Confirm New Password
					</Label>
					<Input placeholder="Confirm New Password"></Input>
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
ChangePassword.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default ChangePassword;
