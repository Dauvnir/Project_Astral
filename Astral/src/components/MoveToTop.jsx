import styled from "styled-components";

const ArrowBtn = styled.svg`
	position: absolute;
	z-index: 3;
	right: -10px;
	bottom: 80px;
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
	@media (min-width: 680px) {
		bottom: 20px;
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
		window.scrollTo({ top: 0, behavior: "smooth" });
		console.log("click");
	};
	return (
		<BtnWrapper>
			<ArrowBtn viewBox="0 0 40 40" onClick={() => ScrollToTop()}>
				<circle cx="20" cy="20" r="19.5" />
				<path d="M10 24L20 14L30 24" />
			</ArrowBtn>
		</BtnWrapper>
	);
};

export default MoveToTop;
