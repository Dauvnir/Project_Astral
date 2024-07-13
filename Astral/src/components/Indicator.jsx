import styled, { keyframes } from "styled-components";
import { SlArrowDown } from "react-icons/sl";
import { Paragraph } from "./Paragraph";
const arrowAnimation = keyframes`
    0%, 100% {
        transform: translateY(0px);
      }
    50% {
        transform: translateY(-10px);
      }
`;

const StyledIndicatorWrapper = styled.div`
	display: flex;
	position: relative;
	z-index: 2;
	width: 100%;
	height: clamp(5rem, 5vh + 1rem, 8rem);
	margin-top: 1.5rem;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;
	@media (min-width: 1000px) {
		visibility: hidden !important;
		height: 1rem;
	}
	@media (min-width: 414px) {
		margin-top: 2rem;
	}
`;
const StyledIndicatorArrow = styled(SlArrowDown)`
	color: #d9d9d9;
	width: 2rem;
	height: auto;
	margin-top: 0.5rem;
	animation: ${arrowAnimation} 2.2s linear infinite;
`;

const Indicator = () => {
	return (
		<StyledIndicatorWrapper>
			<Paragraph $fontSize={"1.5625rem"}>Learn More</Paragraph>
			<StyledIndicatorArrow></StyledIndicatorArrow>
		</StyledIndicatorWrapper>
	);
};

export default Indicator;
