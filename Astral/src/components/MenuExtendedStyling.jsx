import styled from 'styled-components';

export const MenuExtendedStyling = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 5;
	width: clamp(12rem, calc(100% - 2rem), 35rem);
	height: ${(props) => props.$height || '0'}rem;
	left: 50%;
	bottom: 2rem;
	transform: translateX(-50%);
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	overflow: hidden;
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);
	opacity: ${(props) => (props.$height > 0 ? 1 : 0)};
	/* transition: opacity 0.5s linear; */
	@media (min-width: 550px) {
		height: ${(props) => props.$height || '0'}rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
`;
