import WrapperGrid from "./WrapperGrid";
import { LineBreak } from "./LineBreak";
import SearchBar from "./SearchBarMenuComponent";
import styled from "styled-components";

const WrapperAddBook = styled.div`
	display: none;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	position: absolute;
	background-color: rgba(29, 37, 53, 1);
	width: 95%;
	height: clamp(20rem, 65vh, 40rem);
	top: 17%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 5;
	overflow: visible;
	border-radius: 20px;
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);
`;
const MenuExtendedAddBook = () => {
	return (
		<WrapperAddBook>
			<div style={{ display: "flex", width: "100%", flexDirection: "column", minHeight: "5rem" }}>
				<SearchBar></SearchBar>
				<LineBreak></LineBreak>
			</div>
			<WrapperGrid
				style={{
					overflowY: "scroll",
					padding: "1rem 0 0.5rem 0",
					marginBottom: "1rem",
				}}></WrapperGrid>
		</WrapperAddBook>
	);
};

export default MenuExtendedAddBook;
