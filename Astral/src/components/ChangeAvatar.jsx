import { Paragraph } from "./Paragraph";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
const ChangeAvatar = ({ closeComponent }) => {
	return (
		<>
			<WindowTemplateStyling style={{ transform: "translate(-50%, -100%)" }}>
				<Paragraph
					$fontSize="2rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					Change Avatar
				</Paragraph>
				<Paragraph
					$fontSize="1.125rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					There should be possibility to change picture.
				</Paragraph>
				<WrapperFlex $overflow="visible" $margin="1rem  0">
					<StyledBtn $width="45%" $margin="auto" onClick={closeComponent}>
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
		</>
	);
};
ChangeAvatar.propTypes = {
	closeComponent: PropTypes.func,
};
export default ChangeAvatar;
