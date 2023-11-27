import styled from 'styled-components';
import {BackgroundWrapper} from './BackgroundWrapper';
import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';
import {StyledBtn} from './Btn';
import {StyledText} from './StyledTextForBtn';
const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	color: #afbfd5;
	border-radius: 5px;
	font-weight: 600;
`;
const Form = () => {
	return (
		<BackgroundWrapper>
			<Paragraph
				fontSize="1.5rem"
				fontWeight="600"
				$textAlign="left"
				style={{width: '100%', marginBottom: '1rem'}}>
				Get in touch with us.
			</Paragraph>
			<WrapperFlex $flexWrap="wrap" $gap="1rem" style={{overflow: 'visible'}}>
				<div style={{width: '100%'}}>
					<Paragraph $textAlign="left">Your e-mail address.</Paragraph>
					<StyledInput placeholder="E-mail"></StyledInput>
				</div>
				<div style={{width: '100%'}}>
					<Paragraph $textAlign="left">You want to talk about..</Paragraph>
					<StyledInput placeholder="Topic"></StyledInput>
				</div>
				<div style={{width: '100%'}}>
					<Paragraph $textAlign="left">Your message.</Paragraph>
					<StyledInput
						placeholder="I want to say that I very like tacos..."
						style={{height: '6rem'}}></StyledInput>
				</div>
			</WrapperFlex>

			<StyledBtn style={{marginTop: '2rem'}}>
				<StyledText>Submit</StyledText>
			</StyledBtn>
		</BackgroundWrapper>
	);
};

export default Form;
