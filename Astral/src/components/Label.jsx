import styled from 'styled-components';

export const Label = styled.label`
	color: #e5e9f1;
	text-align: ${(props) => props.$textAlign || 'center'};
	width: ${(props) => props.$width || 'auto'};
	padding-left: ${(props) => props.$paddingLeft || '0'};
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: ${(props) => props.$cursor || 'pointer'};
	@media (min-width: 410px) {
		font-size: 1.125rem;
	}
`;
