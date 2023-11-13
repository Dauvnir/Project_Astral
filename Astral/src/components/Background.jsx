import {Stars1} from './styled_components/StyledStars1';
import {Stars2} from './styled_components/StyledStars2';
import {Stars3} from './styled_components/StyledStars3';
import {Background} from './styled_components/StyledBackground';

const MainBackground = () => {
	return (
		<Background>
			<Stars1></Stars1>
			<Stars2></Stars2>
			<Stars3></Stars3>
		</Background>
	);
};

export default MainBackground;
