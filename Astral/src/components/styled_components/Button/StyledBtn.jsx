import styled from 'styled-components';

export const StyledBtn = styled.button`
	border-radius: 0.9375rem;
	background: rgba(29, 37, 53, 0.9);
	width: 14.75rem;
	height: 5.15rem;
	z-index: 2;
	position: relative;
	border: none;
	cursor: pointer;
	transition: background ease 0.5s;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
	}
`;
