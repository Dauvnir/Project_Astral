import { FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const LockStyled = styled(FaLock)`
	color: rgba(217, 217, 217, 0.9);
	width: 60%;
	height: auto;
`;

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #afbfd5;
	border-radius: 10px;
	width: 56px;
	height: 56px;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
	}
`;
const LockBtn = () => {
	return (
		<StyledDiv>
			<LockStyled></LockStyled>
		</StyledDiv>
	);
};

export default LockBtn;
