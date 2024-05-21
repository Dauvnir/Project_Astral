import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import { StyledBtn } from "./Btn";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
const Logout = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};
	const logout = useLogout();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		navigate("/form/login");
	};
	return (
		<>
			{manageState ? (
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
						<StyledBtn $width="45%" $margin="auto" onClick={handler}>
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
			) : null}
		</>
	);
};
Logout.propTypes = {
	clearComponents: PropTypes.func,
};
export default Logout;
