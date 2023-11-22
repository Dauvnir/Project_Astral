import {StyledIndicatorArrow} from './styled_components/Indicator/StyledIndicatorArrow';
import {StyledIndicatorWrapper} from './styled_components/Indicator/StyledIndicatorWrapper';
import {StyledLearnMore} from './styled_components/Indicator/StyledLearnMore';

export const Indicator = () => {
	return (
		<StyledIndicatorWrapper>
			<StyledLearnMore>Learn More</StyledLearnMore>
			<StyledIndicatorArrow></StyledIndicatorArrow>
		</StyledIndicatorWrapper>
	);
};
