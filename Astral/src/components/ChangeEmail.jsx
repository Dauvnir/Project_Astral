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

const ChangeEmail = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -50%)" }}>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						Change Email
					</Paragraph>
					<Label $textAlign="left" $width="100%" $cursor="default">
						New Email
					</Label>
					<Input placeholder="New Email"></Input>
					<Label $textAlign="left" $width="100%" $cursor="default">
						Confirm New Email
					</Label>
					<Input placeholder="Confirm New Email "></Input>
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
ChangeEmail.propTypes = {
	clearComponents: PropTypes.func,
};
export default ChangeEmail;
