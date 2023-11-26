import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';

const WelcomeMsg = () => {
	return (
		<WrapperFlex $flexWrap={'wrap'} $gap={'1.5rem'}>
			<Paragraph fontSize={'1.8rem'} fontWeight={'600'}>
				WELCOME TO ASTRAL CENTER,WHERE YOU CAN GRASP ALL OF YOUR STARS!
			</Paragraph>
		</WrapperFlex>
	);
};

export default WelcomeMsg;
