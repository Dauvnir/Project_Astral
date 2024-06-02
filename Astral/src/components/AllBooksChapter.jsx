import AllBooksComponent from "./AllBooksComponent";
import ChapterList from "./ChapterList";
import WrapperGrid from "./WrapperGrid";
import { LineBreak } from "./LineBreak";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { database } from "../api/DatabaseLocal";
const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: 100vw;
	position: relative;
	z-index: 3;
	padding-block: 1rem;
	margin-top: 3rem;
	flex-direction: column;
`;
const Pagination = styled.div`
	width: 100%;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	position: relative;
	z-index: 3;
	gap: 1rem;
	margin-bottom: 8rem;
`;

const Btn = styled.button`
	height: 2.5rem;
	width: 6rem;
	border-radius: 10px;
	border: none;
	font-family: "Lato";
	font-weight: 600;
	color: #d9d9d9;
	background-color: rgba(29, 37, 53, 0.8);
	padding: 0.25rem;
	text-align: center;
	cursor: pointer;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.56);
	&:hover {
		background: rgba(217, 217, 217, 1);
		transition: background ease 0.5s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
	transition: all ease 0.5s;
`;
const AllBooksChapter = () => {
	const [sortMethod, setSortMethod] = useState("default");
	const sortMethodHandler = (method) => {
		setIndexValue(1);
		setSortMethod(method);
	};

	const [inputValue, setInputValue] = useState(null);
	const sortInputHandler = (value) => {
		setInputValue(value);
	};

	const [indexValue, setIndexValue] = useState(1);
	const indexValueHandler = (index) => {
		const anchor = document.getElementById("top");
		anchor.href = "#top";
		anchor.click();
		setIndexValue(index);
	};

	const [totalAmount, setTotalAmount] = useState(1);
	useEffect(() => {
		const amount = async () => {
			const amountValue = await database.table("manhwas").count();
			setTotalAmount(amountValue);
		};
		amount();
	}, []);

	return (
		<>
			<span></span>
			<AllBooksComponent
				sortMethodHandler={sortMethodHandler}
				sortInputHandler={sortInputHandler}
			/>
			<LineBreak style={{ margin: "0 0 0 0", width: "100vw" }}></LineBreak>
			<BookWrapper style={{ marginTop: "0rem", height: "auto" }}>
				<WrapperGrid>
					<ChapterList
						sortMethod={sortMethod}
						inputValue={inputValue}
						indexValue={indexValue}
					/>
				</WrapperGrid>
				<Pagination>
					<Btn
						onClick={() => indexValueHandler((prev) => prev - 1)}
						disabled={indexValue === 1}>
						<span>Previous page</span>
					</Btn>
					<Btn style={{ width: "2rem" }}>
						<span>{indexValue}</span>
					</Btn>
					<Btn
						onClick={() => indexValueHandler((prev) => prev + 1)}
						disabled={indexValue * 50 >= totalAmount}>
						<span>Next page</span>
					</Btn>
				</Pagination>
			</BookWrapper>
		</>
	);
};

export default AllBooksChapter;
