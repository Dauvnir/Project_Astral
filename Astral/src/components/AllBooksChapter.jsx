import AllBooksComponent from "./AllBooksComponent";
import ChapterList from "./ChapterList";
import WrapperGrid from "./WrapperGrid";
import { LineBreak } from "./LineBreak";
import styled from "styled-components";
import { useState } from "react";

const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: calc(100% + 2rem);
	position: relative;
	z-index: 3;
	padding-block: 1rem;
	margin-left: -1rem;
	margin-top: 3rem;
`;

const AllBooksChapter = () => {
	const [sortMethod, setSortMethod] = useState("default");

	const sortMethodHandler = (method) => {
		setSortMethod(method);
	};

	const [inputValue, setInputValue] = useState("default");

	const sortInputHandler = (value) => {
		setInputValue(value);
	};

	console.log(inputValue);

	return (
		<>
			<AllBooksComponent
				sortMethodHandler={sortMethodHandler}
				sortInputHandler={sortInputHandler}
			/>
			<LineBreak style={{ margin: "0 0 0 -1rem", width: "calc(100% + 2rem)" }}></LineBreak>
			<BookWrapper style={{ marginTop: "0rem", height: "auto" }}>
				<WrapperGrid style={{ paddingInline: "1rem" }}>
					<ChapterList sortMethod={sortMethod} inputValue={inputValue} />
				</WrapperGrid>
			</BookWrapper>
		</>
	);
};

export default AllBooksChapter;
