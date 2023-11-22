import {SlArrowDown} from 'react-icons/sl';
import styled, {keyframes} from 'styled-components';

const arrowAnimation = keyframes`
    0%, 100% {
        transform: translateY(0px);
      }
    50% {
        transform: translateY(-10px);
      }
`;

export const StyledIndicatorArrow = styled(SlArrowDown)`
	color: #d9d9d9;
	width: 2rem;
	height: auto;
	margin-top: 0.5rem;
	animation: ${arrowAnimation} 2.2s linear infinite;
`;
