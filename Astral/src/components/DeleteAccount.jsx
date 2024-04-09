import ChangeWindowTemplate from "./ChangeWindowTemplate";
import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
const DeleteAccount = ({ resetComponent, closeHandler }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -100%)" }}>
					<Paragraph $fontSize="2rem" $fontWeight="500" $margin="0 auto 1rem auto">
						Delete Account
					</Paragraph>
					<Paragraph $fontSize="1.125rem" $fontWeight="500" $margin="0 auto 1rem auto">
						Do you really want to leave us? Are you sure about this ? All your information will be
						deleted.
					</Paragraph>
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
DeleteAccount.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default DeleteAccount;
