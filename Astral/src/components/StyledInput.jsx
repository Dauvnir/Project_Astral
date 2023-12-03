import styled from 'styled-components';

export const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border-radius: 5px;
	font-weight: 500;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
	padding: 20px 10px;
	caret-color: black;
`;
