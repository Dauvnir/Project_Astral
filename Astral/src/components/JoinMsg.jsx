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
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	z-index: 2;
	margin: 0;
	width: 100%;
	@media (min-width: 600px) {
		font-size: 1.25rem;
	}
	@media (min-width: 800px) {
		font-size: 1.5rem;
	}
`;

const JoinMsg = () => {
	return (
		<StyledWelcomeMsgWrapper>
			<StyledWelcomeMsg>
				Join to Astral Center for a chance to create your own library of your favorite books.
			</StyledWelcomeMsg>
		</StyledWelcomeMsgWrapper>
	);
};

export default JoinMsg;
