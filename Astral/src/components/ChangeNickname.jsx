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
const ChangeNickname = ({ resetComponent, closeHandler }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -70%)" }}>
					<Paragraph $fontSize="2rem" $fontWeight="500" $margin="0 auto 1rem auto">
						Change Nickname
					</Paragraph>
					<Label $textAlign="left" $width="100%" $cursor="default">
						New Nickname
					</Label>
					<Input placeholder="New Nickname"></Input>
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
ChangeNickname.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default ChangeNickname;
