import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	position: relative;
	z-index: 2;
	width: clamp(15rem, 85% + 1rem, 35rem);
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: ${(props) => props.$flexDirection || 'column'};
	margin: 1.5rem 0 3rem 0;
	padding: 2rem 1rem 2rem 1rem;
	border-radius: 40px;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
`;
