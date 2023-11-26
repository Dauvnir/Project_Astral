import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';

const JoinMsg = () => {
	return (
		<WrapperFlex $flexWrap={'wrap'} $gap={'1.5rem'} style={{marginTop: '1.5rem'}}>
			<Paragraph fontSize={'1.125rem'} fontWeight={'600'}>
				Join to Astral Center for a chance to create your own library of your favorite books.
			</Paragraph>
		</WrapperFlex>
	);
};

export default JoinMsg;
