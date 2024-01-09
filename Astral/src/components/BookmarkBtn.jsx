import styled from 'styled-components';
import { FaBookBookmark } from 'react-icons/fa6';
const BookMarkStyled = styled(FaBookBookmark)`
	color: rgba(217, 217, 217, 0.9);
	width: 70%;
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

const BookmarkBtn = () => {
	return (
		<StyledDiv>
			<BookMarkStyled></BookMarkStyled>
		</StyledDiv>
	);
};
export default BookmarkBtn;
