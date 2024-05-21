import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import { Label } from "./Label";
import { StyledInput } from "./StyledInput";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyledBtn } from "./Btn";
import { WrapperFlex } from "./WrapperFlex";
const Input = styled(StyledInput)`
	margin: 1rem auto;
`;
const ChangeNickname = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};

	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -70%)" }}>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						Change Nickname
					</Paragraph>
					<Label $textAlign="left" $width="100%" $cursor="default">
						New Nickname
					</Label>
					<Input placeholder="New Nickname"></Input>
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
ChangeNickname.propTypes = {
	clearComponents: PropTypes.func,
};
export default ChangeNickname;
