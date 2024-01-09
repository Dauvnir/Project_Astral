import { MdSort } from 'react-icons/md';
import styled from 'styled-components';

const SortStyled = styled(MdSort)`
	color: rgba(217, 217, 217, 0.9);
	width: 90%;
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
		transition: background linear 0.4s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.4s;
		}
	}
`;
const SortBtn = () => {
	return (
		<StyledDiv>
			<SortStyled></SortStyled>
		</StyledDiv>
	);
};

export default SortBtn;
