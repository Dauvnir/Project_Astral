import styled from 'styled-components';

export const WrapperFlex = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: ${(props) => props.$justifyContent || 'center'};
	overflow: ${(props) => props.$overflow || 'hidden'};
	text-align: center;
	z-index: 2;
	gap: ${(props) => props.$gap || '0rem'};
	flex-wrap: ${(props) => props.$flexWrap || 'nowrap'};
	height: ${(props) => props.$height || 'auto'};
	width: ${(props) => props.$width || '100%'};
	margin: ${(props) => props.$margin || '0rem'};
	flex-direction: ${(props) => props.$flexDirection || 'row'};
`;
