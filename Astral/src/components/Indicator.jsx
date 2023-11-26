import styled, {keyframes} from 'styled-components';
import {SlArrowDown} from 'react-icons/sl';
import {useState, useEffect} from 'react';

const arrowAnimation = keyframes`
    0%, 100% {
        transform: translateY(0px);
      }
    50% {
        transform: translateY(-10px);
      }
`;
const StyledIndicatorWrapper = styled.div`
	visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
	display: flex;
	position: relative;
	z-index: 2;
	width: 100%;
	height: auto;
	margin-top: 3rem;
	margin-bottom: ${(props) => (props.$isVisible ? 0 : -3)}rem;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 0.5rem;
`;

const StyledLearnMore = styled.p`
	color: #d9d9d9;
	text-align: center;
	font-family: Lato;
	font-size: 1.5625rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const StyledIndicatorArrow = styled(SlArrowDown)`
	color: #d9d9d9;
	width: 2rem;
	height: auto;
	margin-top: 0.5rem;
	animation: ${arrowAnimation} 2.2s linear infinite;
`;

const Indicator = () => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', listenToScroll);
		return () => window.removeEventListener('scroll', listenToScroll);
	}, []);
	const listenToScroll = () => {
		const heightToHideFrom = 0;
		const winScroll = window.scrollY;

		setIsVisible(winScroll <= heightToHideFrom);
	};
	return (
		<StyledIndicatorWrapper $isVisible={isVisible}>
			<StyledLearnMore>Learn More</StyledLearnMore>
			<StyledIndicatorArrow></StyledIndicatorArrow>
		</StyledIndicatorWrapper>
	);
};

export default Indicator;
