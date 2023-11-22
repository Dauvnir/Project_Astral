import {StyledWelcomeMsg} from './styled_components/WelcomeMsg/StyledWelcomeMsg';
import {StyledWelcomeMsgWrapper} from './styled_components/WelcomeMsg/StyledWelcomeMsgWrapper';

const WelcomeMsg = () => {
	return (
		<StyledWelcomeMsgWrapper>
			<StyledWelcomeMsg fontSize="26px">
				WELCOME TO ASTRAL CENTER,WHERE YOU CAN GRASP ALL OF YOUR STARS!
			</StyledWelcomeMsg>
		</StyledWelcomeMsgWrapper>
	);
};

export default WelcomeMsg;
