import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { Paragraph } from '../components/Paragraph';
import { WrapperFlex } from '../components/WrapperFlex';
import { StyledBtn } from '../components/Btn';
import { StyledText } from '../components/StyledTextForBtn';
import { LineBreak } from '../components/LineBreak';
import { StyledInput } from '../components/StyledInput';
import { StyledForm } from '../components/StyledForm';
import { Label } from '../components/Label';
import styled from 'styled-components';

const RadioButton = styled.input`
	width: 1.125rem;
	height: 1.125rem;
	cursor: pointer;
	margin-right: 0.5rem;
	accent-color: #1d2535;
	outline: 0px;
`;
const MediaWrapperFlex = styled(WrapperFlex)`
	gap: 1rem;
	justify-content: space-evenly;
	@media (min-width: 410px) {
		gap: 2rem;
	}
`;
const SignUpPage = () => {
	return (
		<>
			<BackgroundWrapper
				style={{
					width: 'clamp(20rem, 85% + 1rem, 35rem)',
					margin: '0 0 1rem 0',
					paddingInline: 'max(2rem, 3vw + 1rem)',
					backdropFilter: 'blur(1px)',
				}}>
				<Paragraph $fontWeight='600' $fontSize='2rem'>
					Registration
				</Paragraph>
				<LineBreak />
				<StyledForm id='form2' method='post' action=''>
					<StyledInput
						pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
						type='email'
						required
						placeholder='E-mail'
						style={{ margin: '0.5rem 0 2rem 0' }}
					/>
					<StyledInput
						type='text'
						required
						placeholder='Username'
						style={{ margin: '0rem 0 2rem 0' }}
					/>
					<StyledInput
						title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
						pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
						type='password'
						required
						placeholder='Password'
						style={{ marginBottom: '0.5rem' }}
					/>
					<LineBreak />
					<MediaWrapperFlex>
						<span style={{ whiteSpace: 'nowrap' }}>
							<RadioButton type='radio' id='male' name='gender' value='male' />
							<Label htmlFor='male'>Male</Label>
						</span>
						<span style={{ whiteSpace: 'nowrap' }}>
							<RadioButton type='radio' id='female' name='gender' value='female' />
							<Label htmlFor='female'>Female</Label>
						</span>
						<span style={{ whiteSpace: 'nowrap' }}>
							<RadioButton type='radio' id='other' name='gender' value='other' />
							<Label htmlFor='other'>Other</Label>
						</span>
					</MediaWrapperFlex>
				</StyledForm>
				<LineBreak />
				<StyledBtn form='form2' type='submit' value='Submit' $width='65%'>
					<StyledText>SUBMIT</StyledText>
				</StyledBtn>
			</BackgroundWrapper>
		</>
	);
};

export default SignUpPage;
