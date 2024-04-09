import styled from "styled-components";

const WrapperGrid = styled.div`
	display: grid;
	position: relative;
	z-index: 2;
	width: 100%;
	grid-template-columns: repeat(2, 50%);
	grid-auto-flow: row;
	row-gap: 2.5rem;
	padding-top: 2rem;
	padding-bottom: 5rem;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	@media (min-width: 450px) {
		grid-template-columns: repeat(3, 33.33%);
	}
	@media (min-width: 600px) {
		grid-template-columns: repeat(4, 25%);
	}
	@media (min-width: 850px) {
		grid-template-columns: repeat(5, 20%);
		row-gap: 4rem;
	}

	@media (min-width: 1100px) {
		grid-template-columns: repeat(6, calc(100% / 6));
	}
	@media (min-width: 1300px) {
		grid-template-columns: repeat(7, calc(100% / 7));
	}
	@media (min-width: 1500px) {
		grid-template-columns: repeat(8, calc(100% / 8));
	}
	@media (min-width: 1700px) {
		grid-template-columns: repeat(9, calc(100% / 9));
	}
	@media (min-width: 1900px) {
		grid-template-columns: repeat(10, calc(100% / 10));
	}
`;

export default WrapperGrid;
