import styled from 'styled-components';
import { StyledBtn } from './Btn';
import { Paragraph } from './Paragraph';
import { WrapperFlex } from './WrapperFlex';
import { StyledInput } from './StyledInput';
import { Label } from './Label';

const WindowTemplateStyling = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 3;
	width: clamp(15rem, 80%, 30rem);
	height: auto;
	margin: 0 auto;
	background-color: rgba(29, 37, 53, 1);
	left: 50%;
	top: 50%;
	transform: translate3D(-50%, -50%, 0);
	border-radius: 10%;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 10px 4px;
`;

const Input = styled(StyledInput)`
	margin: 1rem auto;
`;
const ChangeWindowTemplate = () => {
	return (
		<>
			<WindowTemplateStyling>
				<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
					CHANGE `asd`
				</Paragraph>
				<Label $textAlign='left' $width='100%' $cursor='default'>
					New Email
				</Label>
				<Input placeholder='Cokolwiek ?'></Input>
				<Label $textAlign='left' $width='100%' $cursor='default'>
					Confirm New Email
				</Label>
				<Input placeholder='Cokolwiek ?'></Input>
				<WrapperFlex $overflow='visible' $margin='1rem  0'>
					<StyledBtn $width='40%' $margin='0 1rem 0 auto'>
						<Paragraph $fontSize='1.5rem' $fontWeight='600'>
							BACK
						</Paragraph>
					</StyledBtn>
					<StyledBtn $width='40%' $margin='0 auto 0 1rem'>
						<Paragraph $fontSize='1.5rem' $fontWeight='600'>
							CONFIRM
						</Paragraph>
					</StyledBtn>
				</WrapperFlex>
			</WindowTemplateStyling>
		</>
	);
};

export default ChangeWindowTemplate;
