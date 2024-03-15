import ChangeWindowTemplate from "./ChangeWindowTemplate";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";

const Notifications = ({ resetComponent, closeHandler }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
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
					<ChangeWindowTemplate closeHandler={() => handler()} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
Notifications.propTypes = {
	resetComponent: PropTypes.func,
	closeHandler: PropTypes.any,
};
export default Notifications;
