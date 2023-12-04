import styled from 'styled-components';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { Paragraph } from '../components/Paragraph';
import { WrapperFlex } from '../components/WrapperFlex';
import { StyledBtn } from '../components/Btn';
import { StyledText } from '../components/StyledTextForBtn';
import { LineBreak } from '../components/LineBreak';
import { StyledInput } from '../components/StyledInput';
import { StyledForm } from '../components/StyledForm';
import { Link, useNavigate } from 'react-router-dom';

const Checkbox = styled.input`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1rem;
	border-radius: 5px;
	accent-color: #1d2535;
`;
const StyledLink = styled(Link)`
	color: #d9d9d9;
	transition: color 0.2s ease-in-out;
	&:hover {
		color: #afbfd5;
	}
`;
const LoginForm = () => {
	const navigate = useNavigate();
	return (
		<>
			<BackgroundWrapper
				style={{
					width: 'clamp(20rem, 85% + 1rem, 35rem)',
					margin: '0 0 1rem 0',
					paddingInline: 'max(2rem, 3vw + 1rem)',
					backdropFilter: 'blur(1px)',
					overflow: 'visible',
				}}>
				<WrapperFlex $flexWrap='nowrap' $flexDirection='column' style={{ overflow: 'visible' }}>
					<Paragraph $fontWeight='600' $fontSize='2rem'>
						Login
					</Paragraph>
					<LineBreak />
					<StyledForm id='form1' method='post' action=''>
						<StyledInput
							type='email'
							required
							placeholder='E-mail'
							style={{ margin: '0.5rem 0 2rem 0' }}
						/>
						<StyledInput
							type='password'
							required
							placeholder='Password'
							style={{ marginBottom: '0.5rem' }}
						/>
						<LineBreak />
						<WrapperFlex $justifyContent='left' style={{ marginBlock: '-0.5rem' }}>
							<Checkbox type='checkbox' id='Remember' placeholder='Password' value='True' />
							<label
								htmlFor='Remember'
								style={{
									color: '#E5E9F1',
									fontFamily: 'Lato',
									fontSize: '1.125rem',
									fontWeight: '500',
								}}>
								Remember me
							</label>
						</WrapperFlex>
						<LineBreak />
						<Paragraph
							$fontSize='1.125rem'
							style={{
								paddingBottom: '1.5rem',
								textDecoration: 'underline #d9d9d9',
								cursor: 'pointer',
							}}>
							<StyledLink onClick={navigate('forgottenPswd')}>Forgot password?</StyledLink>
						</Paragraph>
					</StyledForm>
					<StyledBtn form='form1' type='submit' value='Submit' $width='65%'>
						<StyledText>LOGIN</StyledText>
					</StyledBtn>
				</WrapperFlex>
			</BackgroundWrapper>
		</>
	);
};

export default LoginForm;
