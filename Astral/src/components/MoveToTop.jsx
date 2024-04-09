import styled from "styled-components";

const ArrowBtn = styled.svg`
	position: absolute;
	cursor: pointer;
	overflow: visible;
	width: 40px;
	height: 40px;
	fill: none;
	&:hover {
		transition: all ease 0.5s;
		:is(circle) {
			fill: rgba(217, 217, 217, 0.9);
			transition: fill ease 0.5s;
		}
		:is(path) {
			stroke: rgba(29, 37, 53, 0.9);
			transition: stroke ease 0.5s;
		}
	}
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
	display: block;
	position: fixed;
	height: 40px;
	width: 40px;
	right: 0.25rem;
	bottom: 7rem;
	z-index: 4;
	@media (min-width: 680px) {
		bottom: 3rem;
	}
`;
const MoveToTop = () => {
	const ScrollToTop = () => {
		const anchor = document.getElementById("top");
		anchor.href = "#top";
		anchor.click();
	};
	return (
		<BtnWrapper onClick={() => ScrollToTop()}>
			<ArrowBtn viewBox="0 0 40 40">
				<circle cx="20" cy="20" r="19.5" />
				<path d="M10 24L20 14L30 24" />
			</ArrowBtn>
		</BtnWrapper>
	);
};

export default MoveToTop;
