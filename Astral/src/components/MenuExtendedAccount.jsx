import styled from 'styled-components';
import { MenuExtendedStyling } from './MenuExtendedStyling';
import { LineBreak } from './LineBreak';

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
const MenuExtendedAccount = ($heightMenu) => {
	const { $heightMenu: height } = $heightMenu;
	return (
		<>
			<MenuExtendedStyling $height={height} style={{ transition: 'all .3s ease' }}>
				<UlList>
					<LiElement>
						<Span>Change Password</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement>
						<Span>Change Email</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement>
						<Span>Change Nickname</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement>
						<Span>Change Avatar</Span>
					</LiElement>
					<ExtendedLineBreak></ExtendedLineBreak>
					<LiElement style={{ paddingBottom: '2rem' }}>
						<Span>Delete Account</Span>
					</LiElement>
				</UlList>
			</MenuExtendedStyling>
		</>
	);
};

export default MenuExtendedAccount;
