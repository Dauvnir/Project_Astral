import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import {
	BsSortAlphaDown,
	BsSortAlphaDownAlt,
	BsSortNumericDown,
	BsSortNumericDownAlt,
} from "react-icons/bs";
import { ImBooks } from "react-icons/im";

const Title = styled.p`
	text-align: left;
	font-size: clamp(2rem, 2vw + 1rem, 5rem);
	font-weight: 600;
	font-family: Lato;
	color: #d9d9d9;
	font-style: normal;
	line-height: normal;
	white-space: nowrap;
	overflow: visible;
	z-index: 2;
	width: 100%;
	height: 40%;
	@media (min-width: 600px) {
		width: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}
`;

const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: 100vw;
	position: relative;
	z-index: 4;
	padding: 0.5rem 1rem 1rem 1rem;
	margin-top: 3rem;
	height: 8rem;
	flex-direction: column;
	gap: 0.5rem;
	@media (min-width: 600px) {
		flex-direction: row;
		height: 6rem;
		padding: 1rem;
	}
`;
const StyledInput = styled.input`
	height: 100%;
	width: 100%;
	background: none;
	border: none;
	border-bottom: 1px solid #afbfd5;
	caret-color: #d9d9d9;
	outline: none;
	font-size: 1.25rem;
	color: #d9d9d9;
`;

const SearchBar = styled.div`
	display: flex;
	justify-content: left;
	align-items: flex-start;
	width: 75%;
	height: 90%;
`;
const Icon = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 20%;
	box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.56);
	color: #d9d9d9;
	background-color: rgba(29, 37, 53, 1);
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease-in-out 0.3s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color ease-in-out 0.3s;
		}
	}
	@media (min-width: 600px) {
		height: 3rem;
	}
`;
const IconWrap = styled.div`
	height: 50%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	gap: 1rem;
	@media (min-width: 420px) {
		width: 25rem;
		align-self: flex-end;
	}
	@media (min-width: 600px) {
		height: 100%;
		align-self: center;
	}
`;
const AllBooksComponent = ({
	sortMethodHandler,
	sortInputHandler,
	scanlationHandler,
}) => {
	const [titleSort, setTitleSort] = useState(true);
	const [numberSort, setNumberSort] = useState(true);
	const [searchBar, setSearchBar] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [debouncedInputValue, setDebouncedInputValue] = useState("");
	const setMethodHandler = (sortType) => {
		sortMethodHandler(sortType);
	};
	const inputValueHandler = (e) => {
		setInputValue(e.target.value);
	};

	const titleSortHandle = () => {
		setTitleSort((prev) => !prev);
		setNumberSort(true);
		scanlationHandler(false);
		if (titleSort) {
			setMethodHandler("nameAZ");
		} else {
			setMethodHandler("nameZA");
		}
	};
	const numberSortHandle = () => {
		setNumberSort((prev) => !prev);
		setTitleSort(true);
		scanlationHandler(false);
		if (numberSort) {
			setMethodHandler("chapter19");
		} else {
			setMethodHandler("chapter91");
		}
	};
	const searchBarHandle = () => {
		setSearchBar((prev) => !prev);
		sortInputHandler("");
		setDebouncedInputValue("");
		setTitleSort(true);
		setNumberSort(true);
		scanlationHandler(false);
		if (!searchBar) {
			setMethodHandler("default");
		}
	};

	const scanlationListHandle = () => {
		scanlationHandler((prev) => !prev);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedInputValue(inputValue);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [inputValue]);

	useEffect(() => {
		sortInputHandler(debouncedInputValue);
	}, [sortInputHandler, debouncedInputValue]);

	return (
		<BookWrapper>
			<Title>Books</Title>
			<IconWrap>
				<Icon onClick={searchBarHandle}>
					<IoSearchSharp
						style={{ width: "100%", height: "100%", padding: "0.25rem" }}
					/>
				</Icon>
				{searchBar ? (
					<>
						<Icon onClick={titleSortHandle}>
							{titleSort ? (
								<BsSortAlphaDown
									style={{ width: "100%", height: "100%", padding: "0.25rem" }}
								/>
							) : (
								<BsSortAlphaDownAlt
									style={{ width: "100%", height: "100%", padding: "0.25rem" }}
								/>
							)}
						</Icon>
						<Icon onClick={numberSortHandle}>
							{numberSort ? (
								<BsSortNumericDown
									style={{ width: "100%", height: "100%", padding: "0.25rem" }}
								/>
							) : (
								<BsSortNumericDownAlt
									style={{ width: "100%", height: "100%", padding: "0.25rem" }}
								/>
							)}
						</Icon>
						<Icon onClick={scanlationListHandle}>
							<ImBooks
								style={{ width: "100%", height: "100%", padding: "0.25rem" }}
							/>
						</Icon>
					</>
				) : (
					<SearchBar>
						<StyledInput
							type="text"
							placeholder="Search book by title"
							onInput={(e) => inputValueHandler(e)}
						/>
					</SearchBar>
				)}
			</IconWrap>
		</BookWrapper>
	);
};

AllBooksComponent.propTypes = {
	sortMethodHandler: PropTypes.func.isRequired,
	sortInputHandler: PropTypes.func.isRequired,
	scanlationHandler: PropTypes.func.isRequired,
};

export default AllBooksComponent;
