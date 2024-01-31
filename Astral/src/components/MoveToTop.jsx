import styled from 'styled-components';

const ArrowBtn = styled.svg`
	position: absolute;
	z-index: 3;
	right: -5px;
	bottom: 20px;
	cursor: pointer;
	overflow: visible;
	width: 40px;
	height: 40px;
	fill: none;
	circle {
		fill: #1d2535;
		filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.56));
	}
	path {
		stroke: #e5e9f1;
		stroke-width: 2;
	}
`;
const BtnWrapper = styled.div`
	display: flex;
	position: relative;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	background-color: rgba(29, 37, 53, 0.7);
`;
const MoveToTop = () => {
	const ScrollToTop = () => {
		document.body.scrollTo({ top: 0, behavior: 'smooth' });
		console.log('click');
	};
	return (
		<BtnWrapper>
			<ArrowBtn viewBox='0 0 40 40' onClick={ScrollToTop}>
				<circle cx='20' cy='20' r='19.5' />
				<path d='M10 24L20 14L30 24' />
			</ArrowBtn>
		</BtnWrapper>
	);
};

export default MoveToTop;
