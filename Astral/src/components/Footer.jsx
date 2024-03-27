import styled from "styled-components";

const StyledFooter = styled.footer`
	position: relative;
	z-index: 2;
	width: calc(100vw + 2rem);
	margin-left: -1rem;
	height: auto;
	padding: 0.5rem 0.5rem;
	white-space: nowrap;
	background: rgba(29, 37, 53, 0.85);
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
`;
const Text = styled.span`
	text-align: left;
	font-size: 1rem;
	font-weight: 600;
	font-family: Lato;
	color: #d9d9d9;
	font-style: normal;
	line-height: normal;
	z-index: 2;
	margin-left: 1.5rem;
`;
const Footer = () => {
	return (
		<StyledFooter>
			<Text>© 2023 Dauvnir, buy me coffee</Text>
		</StyledFooter>
	);
};

export default Footer;
