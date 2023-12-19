import styled from 'styled-components';

const WrapperGrid = styled.div`
	display: grid;
	position: relative;
	z-index: 2;
	width: 100%;
	height: auto;
	grid-template-columns: repeat(3, 33.33%);
	grid-auto-flow: row;
	row-gap: 1rem;
	@media (min-width: 600px) {
		grid-template-columns: repeat(4, 25%);
	}
	@media (min-width: 850px) {
		grid-template-columns: repeat(5, 20%);
		row-gap: 2.5rem;
	}

	@media (min-width: 1100px) {
		grid-template-columns: repeat(6, calc(100% / 6));
	}
`;

export default WrapperGrid;
