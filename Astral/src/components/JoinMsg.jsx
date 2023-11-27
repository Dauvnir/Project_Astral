import styled from 'styled-components';
import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';

const ResponsiveParagraph = styled(Paragraph)`
	@media only screen and (min-width: 550px) {
		font-size: 1.5rem;
	}
`;
const JoinMsg = () => {
	return (
		<WrapperFlex $flexWrap={'wrap'} $gap={'1.5rem'} style={{marginTop: '1.5rem'}}>
			<ResponsiveParagraph fontSize={'1.125rem'} fontWeight={'600'}>
				Join to Astral Center for a chance to create your own library of your favorite books.
			</ResponsiveParagraph>
		</WrapperFlex>
	);
};

export default JoinMsg;
