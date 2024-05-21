import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
import { Paragraph } from "./Paragraph";

const Notifications = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -150%)" }}>
					<div>
						<h2>Work in progress</h2>
						<p>
							<span>I dont have actually idea what should be there :D </span>
						</p>
					</div>
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
Notifications.propTypes = {
	clearComponents: PropTypes.func,
};
export default Notifications;
