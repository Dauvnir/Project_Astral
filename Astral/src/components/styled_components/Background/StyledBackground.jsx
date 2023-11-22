import styled from 'styled-components';
import {keyframes} from 'styled-components';

export const animStar = keyframes`
	0% {
		transform: translateY(0px);
	}
	100% {
		transform: translateY(-2000px);
    }
`;

export const StyledBackground = styled.div`
	height: 100%;
	width: 100%;
	background: radial-gradient(circle at bottom, #1b2735 0%, #090a0f 100%);
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
`;
