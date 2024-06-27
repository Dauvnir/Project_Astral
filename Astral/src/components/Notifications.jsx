import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
import { Paragraph } from "./Paragraph";

const Notifications = ({ closeComponent }) => {
	return (
		<>
			<WindowTemplateStyling style={{ transform: "translate(-50%, -150%)" }}>
				<div>
					<h2>Work in progress</h2>
					<p>
						<span>I dont have actually idea what should be there :D </span>
					</p>
				</div>
				<WrapperFlex $overflow="visible" $margin="1rem  0">
					<StyledBtn $width="45%" $margin="auto" onClick={closeComponent}>
						<Paragraph $fontSize="1.5rem" $fontWeight="600">
							BACK
						</Paragraph>
					</StyledBtn>
					<StyledBtn $width="45%" $margin="auto" onClick={closeComponent}>
						<Paragraph $fontSize="1.5rem" $fontWeight="600">
							CONFIRM
						</Paragraph>
					</StyledBtn>
				</WrapperFlex>
			</WindowTemplateStyling>
		</>
	);
};
Notifications.propTypes = {
	closeComponent: PropTypes.func,
};
export default Notifications;
