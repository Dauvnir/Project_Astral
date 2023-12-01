import styled from 'styled-components';
import { Paragraph } from './Paragraph';
import { WrapperFlex } from './WrapperFlex';
const ResponsiveParagraph = styled(Paragraph)`
	font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const WelcomeMsg = () => {
	return (
		<WrapperFlex
			$flexWrap='wrap'
			$gap='1.5rem'>
			<ResponsiveParagraph
				$fontSize='1.8rem'
				$fontWeight='600'>
				WELCOME TO ASTRAL CENTER,WHERE YOU CAN GRASP ALL OF YOUR STARS!
			</ResponsiveParagraph>
		</WrapperFlex>
	);
};

export default WelcomeMsg;
