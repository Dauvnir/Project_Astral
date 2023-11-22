import styled, {keyframes} from 'styled-components';
const slider = keyframes`
	to{
		transform: translateX(calc(-50% - 0.25rem))
		
	}	
`;

export const StyledImgCarouselElements = styled.ul`
	display: flex;
	z-index: 2;
	align-items: flex-start;
	white-space: nowrap;
	height: auto;
	gap: 0.5rem;
	margin-bottom: 1rem;
	animation: ${slider} 40s linear infinite reverse; // variable for reverse can be created
	width: max-content;
	pointer-events: none;
	&:hover {
		animation-play-state: paused, running;
	}
`;
//${[(props) => props.distance]}rem 	/*
