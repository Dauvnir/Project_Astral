import styled from 'styled-components';

export const WrapperFlex = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	overflow: ${(props) => props.overflow || 'hidden'};
	text-align: center;
	z-index: 2;
	gap: ${(props) => props.$gap || '0rem'};
	flex-wrap: ${(props) => props.$flexWrap || 'nowrap'};
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || '100%'};
`;
