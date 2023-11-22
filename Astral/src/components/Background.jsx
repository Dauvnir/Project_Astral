import {Stars1} from './styled_components/Background/StyledStars1';
import {Stars2} from './styled_components/Background/StyledStars2';
import {Stars3} from './styled_components/Background/StyledStars3';
import {StyledBackground} from './styled_components/Background/StyledBackground';

const MainBackground = () => {
	return (
		<StyledBackground>
			<Stars1></Stars1>
			<Stars2></Stars2>
			<Stars3></Stars3>
		</StyledBackground>
	);
};

export default MainBackground;
