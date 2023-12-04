import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { Paragraph } from '../components/Paragraph';
import { WrapperFlex } from '../components/WrapperFlex';
import { StyledBtn } from '../components/Btn';
import { StyledText } from '../components/StyledTextForBtn';
import { LineBreak } from '../components/LineBreak';
import { StyledInput } from '../components/StyledInput';
import { StyledForm } from '../components/StyledForm';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		navigate('/login/logIn/forgottenPswd/succes');
	};
	return (
		<>
			<BackgroundWrapper>
				<WrapperFlex $flexDirection='column' style={{ paddingInline: '1.5rem' }}>
					<Paragraph $fontSize='1.5rem' $fontWeight='600'>
						Did you forgotten your password ?
					</Paragraph>
					<LineBreak />
					<StyledForm onSubmit={handleSubmit}>
						<StyledInput
							placeholder='E-mail'
							required
							type='email'
							style={{ marginBottom: '1rem' }}
						/>
						<StyledInput placeholder='Username' required type='text' />
						<LineBreak />
						<StyledBtn type='submit' value='Submit' style={{ marginBottom: '1rem' }}>
							<StyledText>CONFIRM</StyledText>
						</StyledBtn>
					</StyledForm>
				</WrapperFlex>
			</BackgroundWrapper>
		</>
	);
};

export default ForgotPassword;
