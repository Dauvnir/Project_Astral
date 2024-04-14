import { useState } from "react";
import styled from "styled-components";
import { GoListUnordered } from "react-icons/go";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";

const StyledDiv = styled.div`
	display: flex;
	position: relative;
	z-index: 5;
	justify-content: right;
	align-items: center;
	margin-right: 2rem;
	overflow: visible;
	width: 10%;
	height: auto;
	@media (max-width: 400px) {
		margin-right: 1rem;
	}
	@media (max-width: 519px) {
		width: auto;
	}
`;
const UlStyled = styled.ul`
	z-index: 5;
	list-style: none;
	height: ${(props) => (props.$toggleValue ? "12rem" : "0rem")};
	overflow: hidden;
	position: absolute;
	background: rgba(29, 37, 53, 1);
	white-space: nowrap;
	top: 100%;
	right: -2%;
	border-radius: 20px 0 20px 20px;
	transition: height 0.3s ease;
`;
const LiStyled = styled.li`
	display: flex;
	justify-content: center;
	text-align: center;
	width: 100%;
	border-bottom: 1px solid #afbfd5;
`;
const ButtonStyled = styled.button`
	color: rgba(217, 217, 217, 0.9);
	width: 100%;
	height: 100%;
	background: none;
	border: none;
	text-align: left;
	padding: 0.5rem;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
	}
`;
const SpanStyled = styled.span`
	color: #d9d9d9;
	font-family: Lato;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

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
	margin-left: 2rem;
	width: 25%;
	@media (max-width: 519px) {
		width: auto;
	}
`;
const SortStyled = styled(GoListUnordered)`
	color: #d9d9d9e6;
	width: 100%;
	height: auto;
	padding: 0.2rem;
`;
const SortBtn = styled.button`
	width: 56px;
	height: 56px;
	padding: 0.25rem;
	position: relative;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${(props) => (props.$toggleValue ? "10px 10px 0px 0px" : "10px 10px 10px 10px")};
	border: 1px solid #afbfd5;
	background: rgba(29, 37, 53, 1);
	cursor: pointer;
	transition: 0.5s ease all;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
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
	padding-block: 1rem;

	margin-top: 3rem;
	@media (max-width: 519px) {
		justify-content: space-between;
	}
`;
const StyledInput = styled.input`
	height: 2.5rem;
	width: clamp(10rem, 80%, 25rem);
	margin-right: 2rem;
	background: none;
	border: none;
	border-bottom: 1px solid #afbfd5;
	caret-color: #d9d9d9;
	outline: none;
	font-size: 1.25rem;
	color: #d9d9d9;
`;
const SearchSvg = styled(IoSearchOutline)`
	color: #d9d9d9;
	margin-left: -3rem;
	margin-bottom: -0.25rem;
	width: 1.25rem;
	height: 1.25rem;
	transition: opacity 0.2s ease;
`;
const SearchBar = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	margin-right: 1rem;
	width: 65%;
	@media (max-width: 519px) {
		display: none;
	}
`;
const AllBooksComponent = ({ sortMethodHandler, sortInputHandler }) => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	// eslint-disable-next-line no-unused-vars
	const [method, setMethod] = useState("default");
	const setMethodHandler = (msg) => {
		setMethod(msg);
		sortMethodHandler(msg);
		toggleHandler();
	};

	const [toggleValue, setToggleValue] = useState(false);
	const toggleHandler = () => {
		setToggleValue((prev) => !prev);
	};

	let sortBtnRef = useRef();
	let sortingListRef = useRef();
	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		let handler = (event) => {
			if (
				toggleValue &&
				!sortBtnRef.current.contains(event.target) &&
				!sortingListRef.current.contains(event.target)
			) {
				toggleHandler();
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, [toggleValue]);
	// eslint-disable-next-line no-unused-vars
	const [inputValue, setInputValue] = useState("");
	const inputValueHandler = (e) => {
		setInputValue(e.target.value);
	};

	const [debouncedInputValue, setDebouncedInputValue] = useState("");
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
			<SearchBar>
				<StyledInput
					type="text"
					placeholder="Search for a series"
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setIsInputFocused(false)}
					onInput={inputValueHandler}
				/>
				<SearchSvg style={{ opacity: isInputFocused ? 0 : 1 }} />
			</SearchBar>
			<StyledDiv>
				<SortBtn $toggleValue={toggleValue} onClick={() => toggleHandler()} ref={sortBtnRef}>
					<SortStyled></SortStyled>
				</SortBtn>
				<UlStyled $toggleValue={toggleValue} ref={sortingListRef}>
					<LiStyled>
						<ButtonStyled onClick={() => setMethodHandler("nameAZ")}>
							<SpanStyled>Sort by name A-Z</SpanStyled>
						</ButtonStyled>
					</LiStyled>
					<LiStyled>
						<ButtonStyled onClick={() => setMethodHandler("nameZA")}>
							<SpanStyled>Sort by name Z-A</SpanStyled>
						</ButtonStyled>
					</LiStyled>
					<LiStyled>
						<ButtonStyled onClick={() => setMethodHandler("scanlation")}>
							<SpanStyled>Sort by scanlations</SpanStyled>
						</ButtonStyled>
					</LiStyled>
					<LiStyled>
						<ButtonStyled onClick={() => setMethodHandler("chapter19")}>
							<SpanStyled>Sort by chapters 1-9</SpanStyled>
						</ButtonStyled>
					</LiStyled>
					<LiStyled style={{ borderBottom: "none" }}>
						<ButtonStyled onClick={() => setMethodHandler("chapter91")}>
							<SpanStyled>Sort by chapters 9-1</SpanStyled>
						</ButtonStyled>
					</LiStyled>
				</UlStyled>
			</StyledDiv>
		</BookWrapper>
	);
};

AllBooksComponent.propTypes = {
	sortMethodHandler: PropTypes.func.isRequired,
	sortInputHandler: PropTypes.func.isRequired,
};

export default AllBooksComponent;
