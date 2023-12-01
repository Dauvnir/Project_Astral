import styled from 'styled-components';
import { Paragraph } from './Paragraph';
import { WrapperFlex } from './WrapperFlex';

const ResponsiveParagraph = styled(Paragraph)`
	font-size: clamp(1rem, 1vw + 1rem, 1.8rem);
`;
const JoinMsg = () => {
	return (
		<WrapperFlex
			$flexWrap='wrap'
			$gap='1.5rem'
			$margin='1.5rem 0 0 0 '>
			<ResponsiveParagraph
				$fontSize='1.125rem'
				$fontWeight='600'>
				Join to Astral Center for a chance to create your own library of your favorite books.
			</ResponsiveParagraph>
		</WrapperFlex>
	);
};

export default JoinMsg;
