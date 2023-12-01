import styled from 'styled-components';

export const Paragraph = styled.p`
	color: #d9d9d9;
	text-align: ${(props) => props.$textAlign || 'center'};
	font-family: Lato;
	font-size: ${(props) => props.$fontSize || '16px'};
	font-style: normal;
	font-weight: ${(props) => props.$fontWeight || '500'};
	line-height: normal;
	z-index: 2;
`;
