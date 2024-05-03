import { Link } from "react-router-dom";
import { BackgroundWrapper } from "./BackgroundWrapper";
import { StyledBtn } from "./Btn";
import { LineBreak } from "./LineBreak";
import { Paragraph } from "./Paragraph";
import { StyledText } from "./StyledTextForBtn";
import { WrapperFlex } from "./WrapperFlex";

const RegistrationSuccess = () => {
	return (
		<WrapperFlex $height="85%">
			<BackgroundWrapper>
				<Paragraph $fontSize="1.5rem" $fontWeight="600">
					Congratulations!
				</Paragraph>
				<LineBreak />
				<Paragraph $fontSize="1.125rem" $fontWeight="500">
					Your account has been successfully created. Please check your mailbox,
					you are going to receive an email with confirmation link.
				</Paragraph>
				<LineBreak />
				<Link to="/login/logIn">
					<StyledBtn>
						<StyledText>Sign In</StyledText>
					</StyledBtn>
				</Link>
			</BackgroundWrapper>
		</WrapperFlex>
	);
};

export default RegistrationSuccess;
