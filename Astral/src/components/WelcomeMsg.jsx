import styled from 'styled-components';

const StyledWelcomeMsgWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	flex-wrap: wrap;
	gap: 1.5rem;
	margin-top: 1.5rem;
	overflow: hidden;
`;

const StyledWelcomeMsg = styled.p`
	color: #d9d9d9;
	text-align: center;
	font-family: Lato;
	font-size: 1.8rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	z-index: 2;
	margin: 0;
	width: 100%;
`;

const WelcomeMsg = () => {
	return (
		<StyledWelcomeMsgWrapper>
			<StyledWelcomeMsg>
				WELCOME TO ASTRAL CENTER,WHERE YOU CAN GRASP ALL OF YOUR STARS!
			</StyledWelcomeMsg>
		</StyledWelcomeMsgWrapper>
	);
};

export default WelcomeMsg;
