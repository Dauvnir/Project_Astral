import { Paragraph } from "./Paragraph";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
const Logout = ({ closeComponent }) => {
	const logout = useLogout();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		closeComponent();
		navigate("/form/login");
	};
	return (
		<>
			<WindowTemplateStyling style={{ transform: "translate(-50%, -100%)" }}>
				<Paragraph
					$fontSize="2rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					Logout
				</Paragraph>
				<Paragraph
					$fontSize="1.125rem"
					$fontWeight="500"
					$margin="0 auto 1rem auto">
					Do you really want to logout from your library?
				</Paragraph>
				<WrapperFlex $overflow="visible" $margin="1rem  0">
					<StyledBtn $width="45%" $margin="auto" onClick={closeComponent}>
						<Paragraph $fontSize="1.5rem" $fontWeight="600">
							BACK
						</Paragraph>
					</StyledBtn>
					<StyledBtn $width="45%" $margin="auto" onClick={signOut}>
						<Paragraph $fontSize="1.5rem" $fontWeight="600">
							CONFIRM
						</Paragraph>
					</StyledBtn>
				</WrapperFlex>
			</WindowTemplateStyling>
		</>
	);
};
Logout.propTypes = {
	closeComponent: PropTypes.func,
};
export default Logout;
