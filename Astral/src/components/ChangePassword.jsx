import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import { Label } from "./Label";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";

const Input = styled(StyledInput)`
	margin: 1rem auto;
`;

const ChangePassword = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};

	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
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
					<WrapperFlex $overflow="visible" $margin="1rem  0">
						<StyledBtn $width="45%" $margin="auto" onClick={handler}>
							<Paragraph $fontSize="1.5rem" $fontWeight="600">
								BACK
							</Paragraph>
						</StyledBtn>
						<StyledBtn $width="45%" $margin="auto">
							<Paragraph $fontSize="1.5rem" $fontWeight="600">
								CONFIRM
							</Paragraph>
						</StyledBtn>
					</WrapperFlex>
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
ChangePassword.propTypes = {
	clearComponents: PropTypes.func,
};
export default ChangePassword;
