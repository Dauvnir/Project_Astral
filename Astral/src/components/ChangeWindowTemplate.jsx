import BackButton from "./BackButton";
import { StyledBtn } from "./Btn";
import { Paragraph } from "./Paragraph";
import { WrapperFlex } from "./WrapperFlex";
import PropTypes from "prop-types";

const ChangeWindowTemplate = ({ closeHandler }) => {
	return (
		<>
			<WrapperFlex $overflow="visible" $margin="1rem  0">
				<BackButton closeHandler={closeHandler}></BackButton>
				<StyledBtn $width="45%" $margin="auto">
					<Paragraph $fontSize="1.5rem" $fontWeight="600">
						CONFIRM
					</Paragraph>
				</StyledBtn>
			</WrapperFlex>
		</>
	);
};
ChangeWindowTemplate.propTypes = {
	closeHandler: PropTypes.func.isRequired,
};
export default ChangeWindowTemplate;
