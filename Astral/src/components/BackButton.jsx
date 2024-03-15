import { useState } from "react";
import { StyledBtn } from "./Btn";
import { Paragraph } from "./Paragraph";
import PropTypes from "prop-types";

const BackButton = ({ closeHandler }) => {
	// eslint-disable-next-line no-unused-vars
	const [closeState, setCloseState] = useState(true);
	const closeStateHandle = () => {
		setCloseState((prevCloseState) => {
			// Use the previous state to ensure you're working with the latest value
			closeHandler(!prevCloseState); // Pass the updated value to closeHandler
			return !prevCloseState; // Return the new state value
		});
	};
	return (
		<StyledBtn $width="45%" $margin="auto" onClick={closeStateHandle}>
			<Paragraph $fontSize="1.5rem" $fontWeight="600">
				BACK
			</Paragraph>
		</StyledBtn>
	);
};
BackButton.propTypes = {
	closeHandler: PropTypes.func.isRequired,
	Paragraph: PropTypes.any,
};
export default BackButton;
