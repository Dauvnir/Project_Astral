import styled from 'styled-components';
import { LineBreak } from './LineBreak';
import { MenuExtendedStyling } from './MenuExtendedStyling';

const UlList = styled.ul`
	text-align: left;
	width: 100%;
	height: 100%;
	text-decoration: none;
`;
const LiElement = styled.li`
	padding: 1rem;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const Span = styled.span`
	color: #e5e9f1;
	text-align: center;
	font-family: Inter;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	@media (min-width: 360px) {
		font-size: 1rem;
	}
	@media (min-width: 550px) {
		font-size: 1.625rem;
		font-weight: 400;
	}
`;
const ExtendedLineBreak = styled(LineBreak)`
	margin: 0;
`;
const MenuExtended = ($heightMenu) => {
	const { $heightMenu: height } = $heightMenu;
	return (
		<MenuExtendedStyling $height={height} style={{ transition: 'height .5s ease' }}>
			<UlList>
				<LiElement>
					<Span>Home</Span>
				</LiElement>
				<ExtendedLineBreak />
				<LiElement>
					<Span>Notifications</Span>
				</LiElement>
				<ExtendedLineBreak />
				<LiElement>
					<Span>Report bug</Span>
				</LiElement>
				<ExtendedLineBreak />
				<LiElement>
					<Span>About us</Span>
				</LiElement>
				<ExtendedLineBreak />
				<LiElement style={{ paddingBottom: '2rem' }}>
					<Span>Log Out</Span>
				</LiElement>
			</UlList>
		</MenuExtendedStyling>
	);
};

export default MenuExtended;
