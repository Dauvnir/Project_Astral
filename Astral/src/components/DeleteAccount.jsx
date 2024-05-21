import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
const DeleteAccount = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -100%)" }}>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						Delete Account
					</Paragraph>
					<Paragraph
						$fontSize="1.125rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						Do you really want to leave us? Are you sure about this ? All your
						information will be deleted.
					</Paragraph>
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
DeleteAccount.propTypes = {
	clearComponents: PropTypes.func,
};
export default DeleteAccount;
