import styled from 'styled-components';
import {BackgroundWrapper} from './BackgroundWrapper';
import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';
import {StyledBtn} from './Btn';
import {StyledText} from './StyledTextForBtn';
const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border-radius: 5px;
	font-weight: 600;
	font-size: 1rem;
	padding: 0.5rem;
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
`;
const StyledTextarea = styled.textarea`
	width: 100%;
	height: 6rem;
	resize: none;
	box-sizing: border-box;
	font-size: 1rem;
	padding: 0.5rem;
	border-radius: 5px;
	font-weight: 600;
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
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
					<Paragraph $textAlign="left" style={{paddingBottom: '0.5rem'}}>
						Your e-mail address.
					</Paragraph>
					<StyledInput type="e-mail" placeholder="E-mail"></StyledInput>
				</div>
				<div style={{width: '100%'}}>
					<Paragraph $textAlign="left" style={{paddingBottom: '0.5rem'}}>
						You want to talk about..
					</Paragraph>
					<StyledInput placeholder="Topic"></StyledInput>
				</div>
				<div style={{width: '100%'}}>
					<Paragraph $textAlign="left" style={{paddingBottom: '0.5rem'}}>
						Your message.
					</Paragraph>
					<StyledTextarea placeholder="I want to say that I very like eating tacos...."></StyledTextarea>
				</div>
			</WrapperFlex>

			<StyledBtn style={{marginTop: '2rem'}}>
				<StyledText style={{padding: '1.5rem 0rem'}}>Submit</StyledText>
			</StyledBtn>
		</BackgroundWrapper>
	);
};

export default Form;
