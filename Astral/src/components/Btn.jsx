import styled from 'styled-components';

export const StyledBtn = styled.button`
	border-radius: 0.9375rem;
	background: rgba(29, 37, 53, 0.9);
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
	width: ${(props) => props.$width || '14.75rem'};
	height: 5.15rem;
	margin: ${(props) => props.$margin || '0rem'};
	z-index: 2;
	position: relative;
	border: none;
	cursor: pointer;
	transition: background ease 0.5s;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(p) {
			color: rgba(29, 37, 53, 0.9);
			transition: color ease 0.5s;
		}
	}
`;
