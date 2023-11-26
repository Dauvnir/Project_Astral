import styled from 'styled-components';
import {WrapperFlex} from './WrapperFlex';

const StyledBtn = styled.button`
	border-radius: 0.9375rem;
	background: rgba(29, 37, 53, 0.9);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
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
	color: #d9d9d9;
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

const LibraryBtn = () => {
	return (
		<WrapperFlex height={'5.15rem'} style={{marginTop: '3rem'}}>
			<StyledBtn>
				<StyledText>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</WrapperFlex>
	);
};

export default LibraryBtn;
