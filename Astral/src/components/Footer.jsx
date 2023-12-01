import styled from 'styled-components';
import { Paragraph } from './Paragraph';

const StyledFooter = styled.footer`
	position: relative;
	z-index: 2;
	width: calc(100% + 2rem);
	margin-left: -1rem;
	height: auto;
	padding: 0.5rem 0.5rem;
	white-space: nowrap;
	background: rgba(29, 37, 53, 0.85);
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
`;

const Footer = () => {
	return (
		<StyledFooter>
			<Paragraph
				$textAlign='left'
				$fontWeight='400'
				style={{ width: '65%' }}>
				© 2023 Dauvnir, buy me coffee
			</Paragraph>
		</StyledFooter>
	);
};

export default Footer;
