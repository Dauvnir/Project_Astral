import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { LineBreak } from '../components/LineBreak';
import { Paragraph } from '../components/Paragraph';
import { StyledBtn } from '../components/Btn';
import { StyledText } from '../components/StyledTextForBtn';
import { Link } from 'react-router-dom';
import { WrapperFlex } from '../components/WrapperFlex';

const ResetPassword = () => {
	// const navigate = useNavigate();
	return (
		<WrapperFlex $height='85%'>
			<BackgroundWrapper>
				<Paragraph $fontSize='1.5rem' $fontWeight='600'>
					Succes!
				</Paragraph>
				<LineBreak />
				<Paragraph $fontSize='1.125rem' $fontWeight='500'>
					Your request to reset password were successful. The reset email should be in delivered to
					your mailbox. If you have trouble to find it, check spam folder.
				</Paragraph>
				<LineBreak />
				<Link to='/login/logIn'>
					<StyledBtn>
						<StyledText>CONFIRM</StyledText>
					</StyledBtn>
				</Link>
			</BackgroundWrapper>
		</WrapperFlex>
	);
};

export default ResetPassword;
