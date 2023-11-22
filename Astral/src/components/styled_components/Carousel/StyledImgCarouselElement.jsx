import styled from 'styled-components';

export const StyledImgCarouselElement = styled.li`
	flex-shrink: 0;
	position: relative;
	list-style-type: none;
	width: 7rem;
	height: 11rem;
	transform: scale(0.9);
	pointer-events: auto;
	&:hover {
		transform: scale(1.1);
		z-index: 3;
		animation-play-state: paused, running;
	}
`;
