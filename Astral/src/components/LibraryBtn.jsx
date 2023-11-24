import styled from 'styled-components';

const StyledBtn = styled.button`
	border-radius: 0.9375rem;
	background: rgba(29, 37, 53, 0.9);
	width: 14.75rem;
	height: 5.15rem;
	z-index: 2;
	position: relative;
	border: none;
	cursor: pointer;
	transition: background ease 0.5s;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
	}
`;

const StyledText = styled.p`
	color: #e5e9f1;
	text-align: center;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-family: Lato;
	font-size: 1.625rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	padding: 0.5rem;
	transition: color ease 0.5s;
	&:hover {
		color: rgba(29, 37, 53, 0.9);
		transition: color ease 0.5s;
	}
`;

const StyledWrapperBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 5.15rem;
	margin-top: 3rem;
`;

const LibraryBtn = () => {
	return (
		<StyledWrapperBtn>
			<StyledBtn>
				<StyledText>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</StyledWrapperBtn>
	);
};

export default LibraryBtn;
