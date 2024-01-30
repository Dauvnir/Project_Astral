import styled from 'styled-components';

export const SortList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: clamp(12rem, 25vw, 16rem);
	height: ${(props) => props.$height || '0'}rem;
	z-index: 3;
	border-radius: 20px 0 20px 20px;
	right: 36.3%;
	top: 100%;
	background: rgba(29, 37, 53, 1);
	overflow: hidden;
	box-shadow: ${(props) => (props.$height === 0 ? 'none' : '0px 0px 10px 4px rgba(0, 0, 0, 0.56)')};
	opacity: ${(props) => (props.$height > 0 ? 1 : 0)};
	transition: all ease 0.3s;
`;
