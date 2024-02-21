import styled from 'styled-components';
import { BackgroundWrapper } from './BackgroundWrapper';
import { Paragraph } from './Paragraph';
import { WrapperFlex } from './WrapperFlex';
import { StyledBtn } from './Btn';
import { StyledText } from './StyledTextForBtn';
import { StyledForm } from '../components/StyledForm';
import { useState } from 'react';
const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border-radius: 5px;
	font-weight: 600;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
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
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	padding: 0.5rem;
	border-radius: 5px;
	font-weight: 600;
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
`;
const WrapDivForm = styled.div`
	width: 100%;
`;
const ExtendedParagraph = styled(Paragraph)`
	text-align: left;
	padding-bottom: 0.5rem;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
`;
const SubmitMessageBg = styled.div`
	display: flex;
	place-content: center;
	flex-direction: column;
	position: absolute;
	width: 70%;
	height: auto;
	z-index: 3;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.56);
	padding: 1rem;
`;
const SubmitMessage = () => {
	return (
		<>
			<SubmitMessageBg>
				<Paragraph
					$fontSize='1.5rem'
					$fontWeight='800'
					$textAlign='center'
					style={{ width: '100%', marginBottom: '2rem' }}>
					Thank you for sending us a message!
				</Paragraph>
				<ExtendedParagraph style={{ textAlign: 'center' }}>
					We will try to answer as fast as we can.
				</ExtendedParagraph>
			</SubmitMessageBg>
			;
		</>
	);
};

const Form = () => {
	const [showMessage, setShowMessage] = useState(false);
	const showMessageHandler = (event) => {
		event.preventDefault();
		setShowMessage(true);
	};
	return (
		<BackgroundWrapper>
			<div style={{ filter: showMessage && 'blur(2px)', pointerEvents: showMessage && 'none' }}>
				<Paragraph
					$fontSize='2rem'
					$fontWeight='600'
					$textAlign='center'
					style={{ width: '100%', marginBottom: '1rem' }}>
					Get in touch with us.
				</Paragraph>
				<StyledForm id='form' method='post' action='' onSubmit={showMessageHandler}>
					<WrapperFlex $flexWrap='wrap' $gap='1rem' $overflow='visible'>
						<WrapDivForm>
							<ExtendedParagraph>Your e-mail address.</ExtendedParagraph>
							<StyledInput
								pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
								required
								type='e-mail'
								placeholder='E-mail'></StyledInput>
						</WrapDivForm>
						<WrapDivForm>
							<ExtendedParagraph>You want to talk about..</ExtendedParagraph>
							<StyledInput required placeholder='Topic'></StyledInput>
						</WrapDivForm>
						<WrapDivForm>
							<ExtendedParagraph>Your message.</ExtendedParagraph>
							<StyledTextarea
								required
								placeholder='I want to say that I very like eating tacos....'></StyledTextarea>
						</WrapDivForm>
					</WrapperFlex>
				</StyledForm>
				<StyledBtn form='form' type='submit' value='Submit' style={{ marginTop: '2rem' }}>
					<StyledText style={{ padding: '1.5rem 0rem' }}>SUBMIT</StyledText>
				</StyledBtn>
			</div>
			{showMessage && <SubmitMessage className='Submit' style={{ filter: 'blur(0px)' }} />}
		</BackgroundWrapper>
	);
};

export default Form;
