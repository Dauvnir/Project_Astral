import styled from 'styled-components';
export const StyledWelcomeMsg = styled.p`
	color: #d9d9d9;
	text-align: center;
	font-family: Lato;
	font-size: min(${(props) => props.fontSize || '16px'});
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	z-index: 2;
	margin: 0;
	width: 100%;
`;
