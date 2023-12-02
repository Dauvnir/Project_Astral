import styled from 'styled-components';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { Paragraph } from '../components/Paragraph';
import { WrapperFlex } from '../components/WrapperFlex';
import { StyledBtn } from '../components/Btn';
import { StyledText } from '../components/StyledTextForBtn';

const Break = styled.hr`
	background-color: #afbfd5;
	position: relative;
	z-index: 2;
	width: 100%;
	height: 4px;
	margin-block: 1.125rem;
`;
const StyledForm = styled.form`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
`;
const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border-radius: 5px;
	font-weight: 500;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
	padding: 20px 10px;
	caret-color: black;
`;
const Checkbox = styled.input`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1rem;
	border-radius: 5px;
`;
const LoginForm = () => {
	return (
		<>
			<BackgroundWrapper
				style={{
					width: 'clamp(20rem, 85% + 1rem, 35rem)',
					margin: '0 0 1rem 0',
					paddingInline: 'max(2rem, 3vw + 1rem)',
					backdropFilter: 'blur(1px)',
				}}>
				<WrapperFlex $flexWrap='nowrap' $flexDirection='column'>
					<Paragraph $fontWeight='600' $fontSize='2rem'>
						Login
					</Paragraph>
					<Break />
					<StyledForm id='form1' method='post' action=''>
						<StyledInput
							pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
							type='email'
							required
							placeholder='E-mail'
							style={{ margin: '0.5rem 0 2rem 0' }}
						/>
						<StyledInput
							title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
							pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
							type='password'
							required
							placeholder='Password'
							style={{ marginBottom: '0.5rem' }}
						/>
						<Break />
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
						<Break />
						<Paragraph
							$fontSize='1.125rem'
							style={{
								paddingBottom: '1.5rem',
								textDecoration: 'underline #d9d9d9',
								cursor: 'pointer',
							}}>
							Forgot password?
						</Paragraph>
					</StyledForm>
					<StyledBtn form='form1' type='submit' value='Submit' $width='65%'>
						<StyledText>Submit</StyledText>
					</StyledBtn>
				</WrapperFlex>
			</BackgroundWrapper>
		</>
	);
};

export default LoginForm;
