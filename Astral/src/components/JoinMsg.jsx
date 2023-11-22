import {StyledWelcomeMsg} from './styled_components/WelcomeMsg/StyledWelcomeMsg';
import {StyledWelcomeMsgWrapper} from './styled_components/WelcomeMsg/StyledWelcomeMsgWrapper';

const JoinMsg = () => {
	return (
		<StyledWelcomeMsgWrapper>
			<StyledWelcomeMsg fontSize="1.125rem">
				Join to Astral Center for a chance to create your own library of your favorite books.
			</StyledWelcomeMsg>
		</StyledWelcomeMsgWrapper>
	);
};

export default JoinMsg;
