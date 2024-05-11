import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import BackButton from "./BackButton";
import { StyledBtn } from "./Btn";
import { Paragraph } from "./Paragraph";
import { WrapperFlex } from "./WrapperFlex";
import PropTypes from "prop-types";

const ChangeWindowLogout = ({ closeHandler }) => {
	const logout = useLogout();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		navigate("/form/login");
	};
	return (
		<>
			<WrapperFlex $overflow="visible" $margin="1rem  0">
				<BackButton closeHandler={closeHandler} />
				<StyledBtn $width="45%" $margin="auto" onClick={signOut}>
					<Paragraph $fontSize="1.5rem" $fontWeight="600">
						CONFIRM
					</Paragraph>
				</StyledBtn>
			</WrapperFlex>
		</>
	);
};
ChangeWindowLogout.propTypes = {
	closeHandler: PropTypes.func.isRequired,
};
export default ChangeWindowLogout;
